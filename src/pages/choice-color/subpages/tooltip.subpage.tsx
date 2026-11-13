import { BorderedButton, flexCustom } from '@Styles/theme';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// HJ TODO: base component로 구현
interface TooltipProps {
  messageKey: string;
}

export const Tooltip = ({ messageKey }: TooltipProps) => {
  const { t } = useTranslation();

  return (
    <STooltipContainer>
      <SParagraphy>{t(messageKey)}</SParagraphy>
      {/* 다음 단계로 넘어가는 건 OnboardingPage 의 body 클릭 처리가 맡는다 */}
      <SButton>{t('onboarding-confirm')}</SButton>
      <STooltipArrow />
    </STooltipContainer>
  );
};

//#region sub components
//#endregion

//#region logics
//#endregion

//#region styled components
const SButton = styled(BorderedButton)`
  width: auto;
  padding: 4px 8px;
  font-size: 16px;
`;

const STooltipContainer = styled.div`
  ${flexCustom('column', 'center', 'center')}
  gap: 8px;
  position: absolute;
  top: 0;
  left: 50%;
  width: max-content;
  max-width: calc(100vw - 3rem);
  background: ${({ theme }) => theme.gray[100]};
  transform: translate(-50%, calc(-100% - 20px));
  padding: 8px 12px;
  border-radius: 8px;
`;

const STooltipArrow = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: ${({ theme }) => theme.gray[100]};
  transform: translateY(50%) rotate(45deg);
  border-radius: 1px;
`;

const SParagraphy = styled.p`
  white-space: pre-wrap;
  line-height: 18px;
  font-size: 14px;
`;
//#endregion
