import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import getBonusColorOptions from '@Utils/getBonusColorOptions';
import ROUTE_PATH from '@Constant/routePath';
import LoadingIndicator from '@Components/LoadingIndicator';
import Guidance from '../Guidance';
import type { Type } from '@Data/color';
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
  const navigate = useNavigate();

  const bonusColorOptions = bonusColorTypes
    ? getBonusColorOptions(bonusColorTypes)
    : null;

  const onBonusClick = (type: Type) => {
    navigate({
      pathname: ROUTE_PATH.result,
      search: createSearchParams({ colorType: type }).toString(),
    });
  };

  return bonusColorTypes ? (
    <>
      <$BonusStatusBox />
      <$BonusStatusContent>마지막 단계</$BonusStatusContent>

      <Guidance />

      <$BonusColorBox>
        {bonusColorOptions?.map(({ type, colors }, index) => (
          <$BonusColor
            key={type + index}
            colors={colors}
            onClick={() => onBonusClick(type)}
          >
            <img src={userImg} alt="사용자 이미지" />
          </$BonusColor>
        ))}
      </$BonusColorBox>
    </>
  ) : (
    <LoadingIndicator />
  );
}

export default BonusStage;
