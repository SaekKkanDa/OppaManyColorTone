import { useState, useMemo } from 'react';
import useSelectBonusColorTypes from '@Hooks/useSelectBonusColorTypes';
import choiceColorData from '@Data/choiceColorData';
import BasicStage from './BasicStage';
import BonusStage from './BonusStage';
import * as S from './style';
import { AdSense } from '@Components/AdSense';
import useCropImg from '@Hooks/useCropImg';

function ChoiceColor() {
  const [selectedTypes, setSelectedTypes] = useState<ColorType[]>([]);

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

  const userImg = useCropImg();

  const onBasicClick = (type: ColorType) => {
    setSelectedTypes((prev) => [...prev, type]);
  };

  return (
    <S.Wrapper>
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
      <AdSense data-ad-slot={'2551404503'} />
    </S.Wrapper>
  );
}

export default ChoiceColor;
