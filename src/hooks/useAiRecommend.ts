import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
  aiRecommendCacheState,
  aiRecommendConsentState,
  aiRecommendSessionIdState,
  aiRecommendUsageRemainingState,
  type AiRecommendCacheEntry,
} from '@Recoil/aiRecommend';
import { resizeImageToDataUri } from '@Utils/imageResize';
import type {
  AiRecommendError,
  AiRecommendErrorCode,
  AiRecommendOption,
  AiRecommendResponse,
} from '@Utils/aiRecommend/schema';

export type AiRecommendStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error'
  | 'rateLimited'
  | 'disabled';

export type AiRecommendErrorState = {
  code: AiRecommendErrorCode;
  message: string;
  retryAfterSeconds?: number;
};

const ENDPOINT = '/api/ai-recommend';

function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function useAiRecommend(stageNum: number) {
  const enabled = process.env.NEXT_PUBLIC_ENABLE_AI_RECOMMEND === 'true';
  const { locale: routerLocale } = useRouter();
  const locale: 'ko' | 'en' = routerLocale === 'en' ? 'en' : 'ko';

  const [sessionId, setSessionId] = useRecoilState(aiRecommendSessionIdState);
  const [cache, setCache] = useRecoilState(aiRecommendCacheState);
  const setUsageRemaining = useSetRecoilState(aiRecommendUsageRemainingState);
  const usageRemaining = useRecoilValue(aiRecommendUsageRemainingState);
  const [consent, setConsent] = useRecoilState(aiRecommendConsentState);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);

  const [status, setStatus] = useState<AiRecommendStatus>(
    enabled ? 'idle' : 'disabled',
  );
  const [error, setError] = useState<AiRecommendErrorState | null>(null);

  useEffect(() => {
    if (enabled && !sessionId) {
      setSessionId(generateSessionId());
    }
  }, [enabled, sessionId, setSessionId]);

  const cached = useMemo<AiRecommendCacheEntry | null>(
    () => cache[stageNum] ?? null,
    [cache, stageNum],
  );

  useEffect(() => {
    if (cached && status === 'idle') {
      setStatus('success');
    }
  }, [cached, status]);

  const pendingArgsRef = useRef<{
    userImg: string;
    options: AiRecommendOption[];
  } | null>(null);

  const performRequest = useCallback(
    async (userImg: string, options: AiRecommendOption[]): Promise<void> => {
      setStatus('loading');
      setError(null);

      let resized: string;
      try {
        resized = await resizeImageToDataUri(userImg);
      } catch {
        setStatus('error');
        setError({ code: 'INTERNAL_ERROR', message: 'image resize failed' });
        return;
      }

      const activeSessionId = sessionId || generateSessionId();
      if (!sessionId) setSessionId(activeSessionId);

      let response: Response;
      try {
        response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: resized,
            stageNum,
            sessionId: activeSessionId,
            options,
            locale,
          }),
        });
      } catch {
        setStatus('error');
        setError({ code: 'AI_UNAVAILABLE', message: 'network error' });
        return;
      }

      if (response.ok) {
        const data: AiRecommendResponse = await response.json();
        setCache((prev) => ({
          ...prev,
          [stageNum]: {
            recommendedType: data.recommendedType,
            reasoning: data.reasoning,
            confidence: data.confidence,
            source: data.source,
          },
        }));
        setUsageRemaining(data.usageRemaining);
        setStatus('success');
        return;
      }

      const payload = (await response.json().catch(() => null)) as
        | AiRecommendError
        | null;
      const code: AiRecommendErrorCode = payload?.error ?? 'INTERNAL_ERROR';
      setError({
        code,
        message: payload?.message ?? 'unknown error',
        retryAfterSeconds: payload?.retryAfterSeconds,
      });
      setStatus(code === 'RATE_LIMITED' ? 'rateLimited' : 'error');
    },
    [locale, sessionId, setCache, setSessionId, setUsageRemaining, stageNum],
  );

  const request = useCallback(
    async (userImg: string, options: AiRecommendOption[]): Promise<void> => {
      if (!enabled) return;
      if (cache[stageNum]) {
        setStatus('success');
        return;
      }
      if (consent !== 'granted') {
        pendingArgsRef.current = { userImg, options };
        setIsConsentModalOpen(true);
        return;
      }
      await performRequest(userImg, options);
    },
    [cache, consent, enabled, performRequest, stageNum],
  );

  const agreeConsent = useCallback(async () => {
    setConsent('granted');
    setIsConsentModalOpen(false);
    const pending = pendingArgsRef.current;
    pendingArgsRef.current = null;
    if (pending) {
      await performRequest(pending.userImg, pending.options);
    }
  }, [performRequest, setConsent]);

  const denyConsent = useCallback(() => {
    setConsent('denied');
    setIsConsentModalOpen(false);
    pendingArgsRef.current = null;
  }, [setConsent]);

  const clearError = useCallback(() => {
    if (status === 'error') {
      setStatus(cached ? 'success' : 'idle');
      setError(null);
    }
  }, [cached, status]);

  return {
    enabled,
    status,
    error,
    cached,
    usageRemaining,
    request,
    clearError,
    consent,
    isConsentModalOpen,
    agreeConsent,
    denyConsent,
  };
}
