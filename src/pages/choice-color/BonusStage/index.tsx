import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRecoilValue } from 'recoil';
import getBonusColorOptions from '@Utils/getBonusColorOptions';
import ROUTE_PATH from '@Constant/routePath';
import LoadingIndicator from '@Components/LoadingIndicator';
import Guidance from '../Guidance';

import AiRecommendButton from '@Components/AiRecommend';
import { getSeasonToneByType } from '@Utils/aiRecommend/typeMeta';
import { aiRecommendCacheState } from '@Recoil/aiRecommend';

import * as S from './style';

const BONUS_STAGE_NUM = 9;

interface BonusStageProps {
  userImg: string;
  bonusColorTypes: string[] | null;
  selectedColor: string;
}

function BonusStage({
  userImg,
  bonusColorTypes,
  selectedColor,
}: BonusStageProps) {
  const router = useRouter();
  const searchParams = router.query as Record<string, string>;

  const { t } = useTranslation('common');

  const bonusColorOptions = bonusColorTypes
    ? getBonusColorOptions(bonusColorTypes)
    : null;

  const aiRecommendCache = useRecoilValue(aiRecommendCacheState);
  const recommendedType = aiRecommendCache[BONUS_STAGE_NUM]?.recommendedType;

  const onBonusClick = (type: ColorType) => {
    const params = new URLSearchParams(searchParams);
    params.set('colorType', type);
    router.push(`${ROUTE_PATH.result}?${params}`);
  };

  return bonusColorTypes ? (
    <>
      <S.StatusWrapper>
        <S.BonusStatusBox />
        <S.BonusStatusContent>{t('bonusStatus')}</S.BonusStatusContent>
      </S.StatusWrapper>

      <Guidance />

      <S.BonusColorBox>
        {bonusColorOptions?.map(({ type, colors }, index) => (
          <S.BonusColor
            key={type + index}
            colors={colors}
            isSelected={colors.includes(selectedColor)}
            isRecommended={type === recommendedType}
            onClick={() => onBonusClick(type)}
          >
            <Image src={userImg} alt="사용자 이미지" width={100} height={100} />
          </S.BonusColor>
        ))}
      </S.BonusColorBox>

      {bonusColorOptions ? (
        <AiRecommendButton
          stageNum={BONUS_STAGE_NUM}
          userImg={userImg}
          options={bonusColorOptions.map(({ type, colors }) => {
            const { season, tone } = getSeasonToneByType(type);
            return {
              type,
              color: colors[0],
              name: type,
              season,
              tone,
            };
          })}
        />
      ) : null}
    </>
  ) : (
    <LoadingIndicator />
  );
}

export default BonusStage;
