import type { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';

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
import { checkAndConsume, refund } from '@Utils/aiRecommend/rateLimiter';

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

/**
 * 처리된(catch 된) 서버 에러를 Sentry 로 보낸다.
 * Functions 인스턴스가 응답 후 멈출 수 있으므로 응답 전에 flush 한다.
 */
async function reportError(
  err: unknown,
  stage: 'rate_limiter' | 'refund' | 'recommendation'
): Promise<void> {
  Sentry.captureException(err, { tags: { api: 'ai-recommend', stage } });
  await Sentry.flush(2000).catch(() => undefined);
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
  const { imageBase64, sessionId, options, locale } = parsed.data;

  const ip = extractIp(req);

  let rate;
  try {
    rate = await checkAndConsume(sessionId, ip);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[ai-recommend] rate limiter failure', err);
    await reportError(err, 'rate_limiter');
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
    const recommendation = await getRecommendation(imageBase64, options, locale);
    const body: AiRecommendResponse = {
      recommendedType: recommendation.recommendedType,
      reasoning: recommendation.reasoning,
      confidence: recommendation.confidence,
      usageRemaining: rate.sessionRemaining,
      source: recommendation.source,
    };
    res.status(200).json(body);
  } catch (err) {
    // 유저에게 결과를 주지 못한 실패는 quota 를 되돌려줘서 재시도 시
    // 이중 차감되지 않도록 한다.
    await refund(sessionId, ip).catch((refundErr) => {
      // eslint-disable-next-line no-console
      console.error('[ai-recommend] refund failed', refundErr);
      return reportError(refundErr, 'refund');
    });
    if (err instanceof AiRecommendServiceError) {
      // 얼굴 미검출은 사용자 입력 문제라 Sentry 로 보내지 않는다.
      if (err.code === 'NO_FACE_DETECTED') {
        respondError(res, 'NO_FACE_DETECTED', err.message);
        return;
      }
      await reportError(err, 'recommendation');
      if (err.code === 'AI_UNAVAILABLE') {
        respondError(res, 'AI_UNAVAILABLE', err.message);
        return;
      }
      respondError(res, 'INTERNAL_ERROR', err.message);
      return;
    }
    // eslint-disable-next-line no-console
    console.error('[ai-recommend] unhandled error', err);
    await reportError(err, 'recommendation');
    respondError(res, 'INTERNAL_ERROR', 'unexpected server error');
  }
}
