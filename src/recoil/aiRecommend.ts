import { atom } from 'recoil';

import type { AiRecommendResponse } from '@Utils/aiRecommend/schema';

const KEY_PREFIX = 'aiRecommend';

export type AiRecommendCacheEntry = {
  recommendedType: AiRecommendResponse['recommendedType'];
  reasoning: string;
  confidence: number;
  source: AiRecommendResponse['source'];
};

export const aiRecommendCacheState = atom<Record<number, AiRecommendCacheEntry>>({
  key: `${KEY_PREFIX}_cache`,
  default: {},
});

export const aiRecommendSessionIdState = atom<string>({
  key: `${KEY_PREFIX}_sessionId`,
  default: '',
});

export const aiRecommendUsageRemainingState = atom<number | null>({
  key: `${KEY_PREFIX}_usageRemaining`,
  default: null,
});
