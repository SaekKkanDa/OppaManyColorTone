import { z } from 'zod';

export const COLOR_TYPES = [
  'springbright',
  'springwarm',
  'springlight',
  'summerlight',
  'summercool',
  'summermute',
  'autumnmute',
  'autumnwarm',
  'autumndeep',
  'winterdeep',
  'wintercool',
  'winterbright',
] as const satisfies readonly ColorType[];

export const colorTypeSchema = z.enum(COLOR_TYPES);

const HEX_COLOR_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const DATA_URI_REGEX = /^data:image\/(jpeg|jpg|png|webp);base64,/;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

const seasonSchema = z.enum(['spring', 'summer', 'autumn', 'winter']);
const toneSchema = z.enum(['warm', 'cool', 'bright', 'mute', 'light', 'deep']);

const optionSchema = z.object({
  type: colorTypeSchema,
  color: z.string().regex(HEX_COLOR_REGEX, 'must be a hex color like #ff6448'),
  name: z.string().max(60).optional(),
  season: seasonSchema,
  tone: toneSchema,
});

export const aiRecommendRequestSchema = z.object({
  imageBase64: z
    .string()
    .regex(DATA_URI_REGEX, 'must start with data:image/(jpeg|png|webp);base64,')
    .refine((v) => {
      const commaIdx = v.indexOf(',');
      if (commaIdx < 0) return false;
      const payloadLength = v.length - commaIdx - 1;
      const approxBytes = Math.ceil(payloadLength * 0.75);
      return approxBytes <= MAX_IMAGE_BYTES;
    }, `image payload exceeds ${MAX_IMAGE_BYTES} bytes after base64 decode`),
  stageNum: z.number().int().min(0).max(9),
  sessionId: z.string().uuid(),
  options: z.array(optionSchema).length(4),
});

export const aiOpenaiResponseSchema = z.object({
  recommendedType: z.union([colorTypeSchema, z.literal('NONE')]),
  reasoning: z.string().min(1).max(400),
  confidence: z.number().min(0).max(1),
});

export const aiRecommendResponseSchema = z.object({
  recommendedType: colorTypeSchema,
  reasoning: z.string().min(1).max(400),
  confidence: z.number().min(0).max(1),
  usageRemaining: z.number().int().min(0),
  source: z.enum(['mini', 'full']),
});

export const AI_RECOMMEND_ERROR_CODES = [
  'INVALID_INPUT',
  'RATE_LIMITED',
  'NO_FACE_DETECTED',
  'AI_UNAVAILABLE',
  'INTERNAL_ERROR',
] as const;

export const aiRecommendErrorSchema = z.object({
  error: z.enum(AI_RECOMMEND_ERROR_CODES),
  message: z.string(),
  retryAfterSeconds: z.number().int().min(0).optional(),
});

export type AiRecommendRequest = z.infer<typeof aiRecommendRequestSchema>;
export type AiRecommendResponse = z.infer<typeof aiRecommendResponseSchema>;
export type AiRecommendError = z.infer<typeof aiRecommendErrorSchema>;
export type AiRecommendOption = z.infer<typeof optionSchema>;
export type AiOpenaiResponse = z.infer<typeof aiOpenaiResponseSchema>;
export type AiRecommendErrorCode = (typeof AI_RECOMMEND_ERROR_CODES)[number];
