import React, { useState, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { CropImage } from '../../recoil/app';
import useChoiceColor from '@Hooks/useChoiceColor';
import useRedirectNoImage from '@Hooks/useRedirectNoImage';
import omctDb from '@Utils/omctDb';
import choiceColorData from '@Data/choiceColorData';
import type { Type } from '@Data/color';
import BasicStage from './BasicStage';
import BonusStage from './BonusStage';
import { $Wrapper } from './style';

function ChoiceColor() {
  const [isOnBasicStage, setIsOnBasicStage] = useState(true);

  const [stageNum, setStageNum] = useState(0);
  const MAX_STAGE_NUM = choiceColorData.length - 1;

  const userImg = useRecoilValue(CropImage);
  useRedirectNoImage(userImg);

  const { setSelectedTypeCount, bonusColorTypes } =
    useChoiceColor(MAX_STAGE_NUM);

  const selectedColor = useMemo(() => choiceColorData[stageNum], [stageNum]);

  const handleNextClick = (type: Type) => {
    setStageNum((prev) => prev + 1);
    setSelectedTypeCount((prev) => ({ ...prev, [type]: prev[type] + 1 }));

    if (stageNum === MAX_STAGE_NUM) {
      setIsOnBasicStage(false);

      omctDb.addNumberOfUsers();
    }
  };

  return (
    <$Wrapper>
      {isOnBasicStage ? (
        <BasicStage
          userImg={userImg}
          stageNum={stageNum}
          choiceColorData={choiceColorData}
          selectedColor={selectedColor}
          handleNextClick={handleNextClick}
        />
      ) : (
        <BonusStage userImg={userImg} bonusColorTypes={bonusColorTypes} />
      )}
    </$Wrapper>
  );
}

export default ChoiceColor;
