import OpenAI from 'openai';

import { SYSTEM_PROMPT, buildUserText } from './prompt';
import {
  aiOpenaiResponseSchema,
  type AiOpenaiResponse,
  type AiRecommendOption,
} from './schema';

const MODEL_IDS = {
  mini: 'gpt-4o-mini-2024-07-18',
  full: 'gpt-4o-2024-08-06',
} as const;

export type ModelKey = keyof typeof MODEL_IDS;

export const CONFIDENCE_THRESHOLD = 0.7;
const MAX_TOKENS = 200;
const TEMPERATURE = 0.3;

let cachedClient: OpenAI | null = null;

function getClient(): OpenAI {
  if (cachedClient) return cachedClient;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new AiRecommendServiceError(
      'AI_UNAVAILABLE',
      'OPENAI_API_KEY is not configured',
    );
  }
  cachedClient = new OpenAI({ apiKey });
  return cachedClient;
}

export class AiRecommendServiceError extends Error {
  constructor(
    public readonly code:
      | 'AI_UNAVAILABLE'
      | 'INVALID_AI_RESPONSE'
      | 'NO_FACE_DETECTED',
    message: string,
  ) {
    super(message);
    this.name = 'AiRecommendServiceError';
  }
}

async function callModel(
  modelKey: ModelKey,
  dataUri: string,
  options: AiRecommendOption[],
): Promise<AiOpenaiResponse> {
  const client = getClient();
  let completion;
  try {
    completion = await client.chat.completions.create({
      model: MODEL_IDS[modelKey],
      response_format: { type: 'json_object' },
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: dataUri, detail: 'low' } },
            { type: 'text', text: buildUserText(options) },
          ],
        },
      ],
    });
  } catch (err) {
    throw new AiRecommendServiceError(
      'AI_UNAVAILABLE',
      err instanceof Error ? err.message : 'OpenAI call failed',
    );
  }

  const raw = completion.choices[0]?.message?.content;
  if (!raw) {
    throw new AiRecommendServiceError(
      'INVALID_AI_RESPONSE',
      'empty response from model',
    );
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new AiRecommendServiceError(
      'INVALID_AI_RESPONSE',
      'model returned non-JSON content',
    );
  }

  const parsed = aiOpenaiResponseSchema.safeParse(json);
  if (!parsed.success) {
    throw new AiRecommendServiceError(
      'INVALID_AI_RESPONSE',
      `schema mismatch: ${parsed.error.issues.map((i) => i.message).join('; ')}`,
    );
  }

  const optionTypes = new Set(options.map((o) => o.type));
  if (
    parsed.data.recommendedType !== 'NONE' &&
    !optionTypes.has(parsed.data.recommendedType)
  ) {
    throw new AiRecommendServiceError(
      'INVALID_AI_RESPONSE',
      `recommendedType "${parsed.data.recommendedType}" is not among provided options`,
    );
  }

  return parsed.data;
}

export type HybridResult = {
  recommendedType: ColorType;
  reasoning: string;
  confidence: number;
  source: ModelKey;
  fallbackAttempted: boolean;
};

export async function getRecommendation(
  dataUri: string,
  options: AiRecommendOption[],
): Promise<HybridResult> {
  const miniResult = await callModel('mini', dataUri, options);

  if (miniResult.recommendedType === 'NONE') {
    throw new AiRecommendServiceError(
      'NO_FACE_DETECTED',
      'no clear face detected in the image',
    );
  }

  if (miniResult.confidence >= CONFIDENCE_THRESHOLD) {
    return {
      recommendedType: miniResult.recommendedType,
      reasoning: miniResult.reasoning,
      confidence: miniResult.confidence,
      source: 'mini',
      fallbackAttempted: false,
    };
  }

  try {
    const fullResult = await callModel('full', dataUri, options);
    if (fullResult.recommendedType === 'NONE') {
      throw new AiRecommendServiceError(
        'NO_FACE_DETECTED',
        'no clear face detected in the image (fallback)',
      );
    }
    return {
      recommendedType: fullResult.recommendedType,
      reasoning: fullResult.reasoning,
      confidence: fullResult.confidence,
      source: 'full',
      fallbackAttempted: true,
    };
  } catch (err) {
    if (
      err instanceof AiRecommendServiceError &&
      err.code === 'NO_FACE_DETECTED'
    ) {
      throw err;
    }
    return {
      recommendedType: miniResult.recommendedType,
      reasoning: miniResult.reasoning,
      confidence: miniResult.confidence,
      source: 'mini',
      fallbackAttempted: true,
    };
  }
}
