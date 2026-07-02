import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import type { ChoiceColorDataType } from '@Data/choiceColorData';
import Guidance from '../Guidance';

import * as S from './style';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { onboardingElState } from '@Pages/choice-color/choiceColor.atom';
import { useEffect, useRef } from 'react';
import { isNotNil } from '@Base/utils/check';

import AiRecommendButton from '@Components/AiRecommend';
import { aiRecommendCacheState } from '@Recoil/aiRecommend';

interface BasicStageProps {
  userImg: string;
  stageNum: number;
  MAX_STAGE_NUM: number;
  basicColorOptions: ChoiceColorDataType[];
  selectedColor: string;
  onBasicClick: (selectedChip: ChoiceColorDataType) => void;
}

function BasicStage({
  userImg,
  stageNum,
  MAX_STAGE_NUM,
  basicColorOptions,
  selectedColor,
  onBasicClick,
}: BasicStageProps) {
  const { t } = useTranslation('common');

  // HJ TODO: 더 좋은 방법이 있을 것 같음...
  const colorBoxElRef = useRef<HTMLDivElement>(null);
  const setOnboardingEl = useSetRecoilState(onboardingElState);

  useEffect(() => {
    const colorBoxEl = colorBoxElRef.current;
    if (isNotNil(colorBoxEl)) setOnboardingEl(colorBoxEl);
  }, [setOnboardingEl]);

  const aiRecommendCache = useRecoilValue(aiRecommendCacheState);
  const recommendedType = aiRecommendCache[stageNum]?.recommendedType;

  return (
    <>
      <S.StatusWrapper>
        <S.StatusBox>
          <S.StatusBar width={`${(stageNum + 1) * (100 / MAX_STAGE_NUM)}%`} />
        </S.StatusBox>
        <S.StatusContent>
          {stageNum + 1}/{MAX_STAGE_NUM} {t('statusContent')}
        </S.StatusContent>
      </S.StatusWrapper>

      <Guidance />

      <S.ColorBox ref={colorBoxElRef}>
        {basicColorOptions.map((item) => (
          <S.Color
            key={item.id}
            color={item.color}
            isSelected={item.color === selectedColor}
            isRecommended={item.type === recommendedType}
            onClick={() => onBasicClick(item)}
          >
            <Image src={userImg} alt="사용자 이미지" width={100} height={100} />
          </S.Color>
        ))}
      </S.ColorBox>

      <AiRecommendButton
        stageNum={stageNum}
        userImg={userImg}
        options={basicColorOptions}
      />
    </>
  );
}

export default BasicStage;
