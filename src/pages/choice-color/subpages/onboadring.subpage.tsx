import { Backdrop } from '@Base/components/Backdrop';
import { isNil } from '@Base/utils/check';
import {
  onboardingAiButtonElState,
  onboardingElState,
  onboardingState,
} from '@Pages/choice-color/choiceColor.atom';
import { Tooltip } from '@Pages/choice-color/subpages/tooltip.subpage';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

export const OnboardingPage = () => {
  const [isOnboarding, setIsOnboarding] = useRecoilState(onboardingState);
  const onBoardingEl = useRecoilValue(onboardingElState);
  const aiButtonEl = useRecoilValue(onboardingAiButtonElState);
  const [step, setStep] = useState<'cards' | 'ai'>('cards');

  useEffect(() => {
    // 확인 버튼을 포함해 화면 어디를 눌러도 다음 단계로 넘어간다
    const advance = () => {
      if (step === 'cards' && aiButtonEl) setStep('ai');
      else setIsOnboarding(false);
    };
    document.body.addEventListener('click', advance);
    return () => {
      document.body.removeEventListener('click', advance);
    };
  }, [step, aiButtonEl, setIsOnboarding]);

  if (isNil(onBoardingEl)) return <></>;

  // HJ TODO: z-index enum으로 관리
  onBoardingEl.style.zIndex = isOnboarding && step === 'cards' ? '20' : 'unset';
  if (aiButtonEl) {
    const isAiStep = isOnboarding && step === 'ai';
    aiButtonEl.style.zIndex = isAiStep ? '20' : 'unset';
    // 안내 중에는 강조만 하고 버튼은 눌리지 않게 한다
    aiButtonEl.style.pointerEvents = isAiStep ? 'none' : 'auto';
  }

  if (!isOnboarding) return <></>;

  const { width, height } = onBoardingEl.getBoundingClientRect();

  return (
    <>
      {createPortal(<Backdrop />, document.body)}
      {step === 'cards' &&
        createPortal(
          <SContainer style={{ width: width + 8, height: height + 8 }}>
            <Tooltip messageKey="onboarding1" />
          </SContainer>,
          onBoardingEl
        )}
      {/* AI 추천을 쓸 수 없으면 버튼이 없어서 이 단계 없이 끝난다 */}
      {step === 'ai' &&
        aiButtonEl &&
        createPortal(
          <SAiButtonHighlight>
            <Tooltip messageKey="onboarding2" />
          </SAiButtonHighlight>,
          aiButtonEl
        )}
    </>
  );
};

//#region sub components
//#endregion

//#region logics
//#endregion

//#region styled components
const SContainer = styled.div`
  position: absolute;
  border-radius: 8px;
  border: 4px solid ${({ theme }) => theme.gray[100]};
  transform: translate(-4px, -4px);
`;

/** 버튼 뒤에 깔린다. 글자가 어두운 배경에 묻히지 않도록 안쪽도 밝게 채운다 */
const SAiButtonHighlight = styled.div`
  position: absolute;
  inset: -4px;
  z-index: -1;
  border-radius: 12px;
  border: 4px solid ${({ theme }) => theme.gray[100]};
  background: ${({ theme }) => theme.gray[100]};
  pointer-events: auto; /* 부모의 none 을 풀어 말풍선의 확인 버튼은 눌리게 한다 */
`;
//#endregion
