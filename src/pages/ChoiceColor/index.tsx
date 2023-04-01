import React, { useState, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { CropImage } from '../../recoil/app';
import useSelectBonusColorTypes from '@Hooks/useSelectBonusColorTypes';
import useRedirectNoImage from '@Hooks/useRedirectNoImage';
import choiceColorData from '@Data/choiceColorData';
import type { Type } from '@Data/color';
import BasicStage from './BasicStage';
import BonusStage from './BonusStage';
import { $Wrapper } from './style';

function ChoiceColor() {
  const [selectedTypes, setSelectedTypes] = useState<Type[]>([]);

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
  useRedirectNoImage(userImg);

  const onBasicClick = (type: Type) => {
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
