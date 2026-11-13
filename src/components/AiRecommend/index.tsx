import type { Ref } from 'react';
import { useTranslation } from 'next-i18next';

import { useAiRecommend } from '@Hooks/useAiRecommend';

import AiConsentModal from './AiConsentModal';
import * as S from './style';

export type AiRecommendChoice = {
  type: ColorType;
  color: string;
  name?: string;
  season: ColorSeason;
  tone: ColorTone;
};

interface AiRecommendButtonProps {
  stageNum: number;
  userImg: string;
  options: AiRecommendChoice[];
  privacyHref?: string;
  /** 온보딩에서 버튼을 강조할 때 쓰는 기준 요소 */
  buttonAnchorRef?: Ref<HTMLDivElement>;
}

function AiRecommendButton({
  stageNum,
  userImg,
  options,
  privacyHref,
  buttonAnchorRef,
}: AiRecommendButtonProps) {
  const { t } = useTranslation('common');
  const {
    enabled,
    status,
    error,
    cached,
    request,
    clearError,
    isConsentModalOpen,
    agreeConsent,
    denyConsent,
  } = useAiRecommend(stageNum);

  if (!enabled) return null;

  const handleRequest = () => {
    void request(
      userImg,
      options.map((o) => ({
        type: o.type,
        color: o.color,
        name: o.name,
        season: o.season,
        tone: o.tone,
      })),
    );
  };

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <S.Button type="button" isDisabled disabled>
          <S.Spinner aria-hidden />
          {t('aiRecommend.loading')}
        </S.Button>
      );
    }

    if (status === 'success' && cached) {
      return (
        <S.ResultBanner role="status">
          <S.ResultLabel>{t('aiRecommend.result.prefix')}</S.ResultLabel>
          <span>{cached.reasoning}</span>
        </S.ResultBanner>
      );
    }

    if (status === 'rateLimited') {
      return (
        <S.Button type="button" isDisabled disabled>
          {t('aiRecommend.error.rateLimited')}
        </S.Button>
      );
    }

    if (status === 'error' && error) {
      const message =
        error.code === 'NO_FACE_DETECTED'
          ? t('aiRecommend.error.noFace')
          : t('aiRecommend.error.generic');
      return (
        <div>
          <S.ErrorText>{message}</S.ErrorText>
          <S.RetryLink
            type="button"
            onClick={() => {
              clearError();
              handleRequest();
            }}
          >
            {t('aiRecommend.error.retry')}
          </S.RetryLink>
        </div>
      );
    }

    return (
      <S.ButtonAnchor ref={buttonAnchorRef}>
        <S.Button type="button" onClick={handleRequest}>
          {t('aiRecommend.button')}
        </S.Button>
      </S.ButtonAnchor>
    );
  };

  return (
    <S.Wrapper>
      {renderContent()}
      {privacyHref ? (
        <S.PrivacyLink href={privacyHref} target="_blank" rel="noreferrer">
          {t('aiRecommend.privacyLink')}
        </S.PrivacyLink>
      ) : null}
      <AiConsentModal
        isOpen={isConsentModalOpen}
        onAgree={() => {
          void agreeConsent();
        }}
        onDisagree={denyConsent}
      />
    </S.Wrapper>
  );
}

export default AiRecommendButton;
