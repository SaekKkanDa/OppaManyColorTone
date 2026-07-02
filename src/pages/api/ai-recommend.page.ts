import type { NextApiRequest, NextApiResponse } from 'next';

import {
  AiRecommendServiceError,
  getRecommendation,
} from '@Utils/aiRecommend/openaiClient';
import {
  aiRecommendRequestSchema,
  type AiRecommendError,
  type AiRecommendErrorCode,
  type AiRecommendResponse,
} from '@Utils/aiRecommend/schema';
import { checkAndConsume } from '@Utils/aiRecommend/rateLimiter';

export const config = {
  api: {
    bodyParser: { sizeLimit: '5mb' },
  },
};

const ERROR_HTTP_STATUS: Record<AiRecommendErrorCode, number> = {
  INVALID_INPUT: 400,
  NO_FACE_DETECTED: 422,
  RATE_LIMITED: 429,
  AI_UNAVAILABLE: 502,
  INTERNAL_ERROR: 500,
};

function respondError(
  res: NextApiResponse,
  code: AiRecommendErrorCode,
  message: string,
  retryAfterSeconds?: number
): void {
  const body: AiRecommendError = {
    error: code,
    message,
    ...(retryAfterSeconds !== undefined ? { retryAfterSeconds } : {}),
  };
  if (retryAfterSeconds !== undefined) {
    res.setHeader('Retry-After', String(retryAfterSeconds));
  }
  res.status(ERROR_HTTP_STATUS[code]).json(body);
}

function extractIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    const first = forwarded.split(',')[0];
    if (first) return first.trim();
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    const first = forwarded[0].split(',')[0];
    if (first) return first.trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string') return realIp;
  return req.socket.remoteAddress ?? 'unknown';
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (process.env.NEXT_PUBLIC_ENABLE_AI_RECOMMEND !== 'true') {
    res.status(404).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    respondError(res, 'INVALID_INPUT', 'Only POST is supported');
    return;
  }

  const parsed = aiRecommendRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    respondError(
      res,
      'INVALID_INPUT',
      parsed.error.issues.map((i) => i.message).join('; ')
    );
    return;
  }
  const { imageBase64, sessionId, options } = parsed.data;

  const ip = extractIp(req);

  let rate;
  try {
    rate = await checkAndConsume(sessionId, ip);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[ai-recommend] rate limiter failure', err);
    respondError(res, 'INTERNAL_ERROR', 'rate limiter unavailable');
    return;
  }

  if (!rate.ok) {
    respondError(
      res,
      'RATE_LIMITED',
      rate.scope === 'session'
        ? 'session request limit reached'
        : 'daily IP request limit reached',
      rate.retryAfterSeconds
    );
    return;
  }

  try {
    const recommendation = await getRecommendation(imageBase64, options);
    const body: AiRecommendResponse = {
      recommendedType: recommendation.recommendedType,
      reasoning: recommendation.reasoning,
      confidence: recommendation.confidence,
      usageRemaining: rate.sessionRemaining,
      source: recommendation.source,
    };
    res.status(200).json(body);
  } catch (err) {
    if (err instanceof AiRecommendServiceError) {
      // eslint-disable-next-line no-console
      console.error('[ai-recommend] service error', err.code, err.message);
      if (err.code === 'NO_FACE_DETECTED') {
        respondError(res, 'NO_FACE_DETECTED', err.message);
        return;
      }
      if (err.code === 'AI_UNAVAILABLE') {
        respondError(res, 'AI_UNAVAILABLE', err.message);
        return;
      }
      respondError(res, 'INTERNAL_ERROR', err.message);
      return;
    }
    // eslint-disable-next-line no-console
    console.error('[ai-recommend] unhandled error', err);
    respondError(res, 'INTERNAL_ERROR', 'unexpected server error');
  }
}
