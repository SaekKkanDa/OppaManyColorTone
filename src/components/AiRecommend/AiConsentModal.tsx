import { useTranslation } from 'next-i18next';

import Snackbar from '@Components/Snackbar';

import * as S from './consentStyle';

interface AiConsentModalProps {
  isOpen: boolean;
  onAgree: () => void;
  onDisagree: () => void;
}

function AiConsentModal({ isOpen, onAgree, onDisagree }: AiConsentModalProps) {
  const { t } = useTranslation('common');

  return (
    <Snackbar isOpen={isOpen} onClose={onDisagree}>
      <S.ConsentWrapper>
        <h1>{t('aiRecommend.consent.title')}</h1>
        <ul>
          <li>{t('aiRecommend.consent.purpose')}</li>
          <li>{t('aiRecommend.consent.data')}</li>
          <li>{t('aiRecommend.consent.destination')}</li>
          <li>{t('aiRecommend.consent.retention')}</li>
        </ul>
        <p>{t('aiRecommend.consent.openaiPolicy')}</p>
        <p>{t('aiRecommend.consent.guide')}</p>
      </S.ConsentWrapper>
      <S.ButtonRow>
        <S.SecondaryButton type="button" onClick={onDisagree}>
          {t('disagree')}
        </S.SecondaryButton>
        <S.PrimaryButton type="button" onClick={onAgree}>
          {t('agree')}
        </S.PrimaryButton>
      </S.ButtonRow>
    </Snackbar>
  );
}

export default AiConsentModal;
