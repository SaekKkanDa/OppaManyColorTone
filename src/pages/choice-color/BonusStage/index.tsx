import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import getBonusColorOptions from '@Utils/getBonusColorOptions';
import ROUTE_PATH from '@Constant/routePath';
import LoadingIndicator from '@Components/LoadingIndicator';
import Guidance from '../Guidance';
import { FormattedMessage } from 'react-intl';

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
  const router = useRouter();
  const searchParams = router.query as Record<string, string>;

  const bonusColorOptions = bonusColorTypes
    ? getBonusColorOptions(bonusColorTypes)
    : null;

  const onBonusClick = (type: ColorType) => {
    const params = new URLSearchParams(searchParams);
    params.set('colorType', type);
    router.push(`${ROUTE_PATH.result}?${params}`);
  };

  return bonusColorTypes ? (
    <>
      <$BonusStatusBox />
      <$BonusStatusContent>
        <FormattedMessage id="bonusStatus" />
      </$BonusStatusContent>

      <Guidance />

      <$BonusColorBox>
        {bonusColorOptions?.map(({ type, colors }, index) => (
          <$BonusColor
            key={type + index}
            colors={colors}
            onClick={() => onBonusClick(type)}
          >
            <Image src={userImg} alt="사용자 이미지" width={100} height={100} />
          </$BonusColor>
        ))}
      </$BonusColorBox>
    </>
  ) : (
    <LoadingIndicator />
  );
}

export default BonusStage;
