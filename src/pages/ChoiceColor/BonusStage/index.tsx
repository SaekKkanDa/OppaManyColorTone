import React from 'react';
import getBonusColorOptions from '@Utils/getBonusColorOptions';
import Guidance from '../Guidance';
import {
  $BonusStatusBox,
  $BonusStatusContent,
  $BonusColorBox,
  $BonusColor,
} from './style';

interface BonusStageProps {
  userImg: string;
  bonusColorTypes: string[] | null;
}

function BonusStage({ userImg, bonusColorTypes }: BonusStageProps) {
  const bonusColorOptions = bonusColorTypes
    ? getBonusColorOptions(bonusColorTypes)
    : null;

  return bonusColorTypes ? (
    <>
      <$BonusStatusBox />
      <$BonusStatusContent>마지막 단계</$BonusStatusContent>

      <Guidance />

      <$BonusColorBox>
        {bonusColorOptions?.map(({ colors }, index) => (
          <$BonusColor key={index} colors={colors}>
            <img src={userImg} alt="사용자 이미지" />
          </$BonusColor>
        ))}
      </$BonusColorBox>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default BonusStage;
