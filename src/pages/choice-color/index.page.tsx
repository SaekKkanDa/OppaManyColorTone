import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { CropImage } from '@Recoil/app';
import useSelectBonusColorTypes from '@Hooks/useSelectBonusColorTypes';
import choiceColorData from '@Data/choiceColorData';
import BasicStage from './BasicStage';
import BonusStage from './BonusStage';
import { $Wrapper } from './style';

function ChoiceColor() {
  const [selectedTypes, setSelectedTypes] = useState<ColorType[]>([]);

  const router = useRouter();

  const stageNum = selectedTypes.length;
  const MAX_STAGE_NUM = choiceColorData.length;

  const basicColorOptions = useMemo(
    () => choiceColorData[stageNum],
    [stageNum]
  );

  const bonusColorTypes = useSelectBonusColorTypes(
    selectedTypes,
    MAX_STAGE_NUM
  );

  const userImg = useRecoilValue(CropImage);

  // HJ TODO: fallback component 필요 ?
  useEffect(() => {
    if (!router) return;
    if (!userImg) {
      router.push('/no-image');
    }
  }, [router, userImg]);

  const onBasicClick = (type: ColorType) => {
    setSelectedTypes((prev) => [...prev, type]);
  };

  return (
    <$Wrapper>
      {stageNum < MAX_STAGE_NUM ? (
        <BasicStage
          userImg={userImg}
          stageNum={stageNum}
          MAX_STAGE_NUM={MAX_STAGE_NUM}
          basicColorOptions={basicColorOptions}
          onBasicClick={onBasicClick}
        />
      ) : (
        <BonusStage userImg={userImg} bonusColorTypes={bonusColorTypes} />
      )}
    </$Wrapper>
  );
}

export default ChoiceColor;
