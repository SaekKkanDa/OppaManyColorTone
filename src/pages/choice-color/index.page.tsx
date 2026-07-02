import { useState, useMemo, useEffect } from 'react';
import useSelectBonusColorTypes from '@Hooks/useSelectBonusColorTypes';
import choiceColorData, { ChoiceColorDataType } from '@Data/choiceColorData';
import BasicStage from './BasicStage';
import BonusStage from './BonusStage';
import * as S from './style';
import useCropImg from '@Hooks/useCropImg';
import shuffle from '@Utils/shuffle';
import { useSearchParams } from 'next/navigation';
import { isEmpty, isNil, isNotNil } from '@Base/utils/check';
import omctDb from '@Utils/omctDb';
import LoadingIndicator from '@Components/LoadingIndicator';
import { useRecoilState } from 'recoil';
import { CropImage } from '@Recoil/app';
import { withLoadingRouter } from '@Components/WithLoadingRouter/withLoadingRouter';
import { OnboardingPage } from '@Pages/choice-color/subpages/onboadring.subpage';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@Root/next-i18next.config';

const Page = () => {
  const searchParams = useSearchParams();
  const imageName = searchParams.get('imageName');
  const [isLoading, setIsLoading] = useState(
    isNotNil(imageName) && !isEmpty(imageName)
  );
  const [, setCropImg] = useRecoilState(CropImage);

  useEffect(() => {
    if (isNil(imageName) || isEmpty(imageName)) return;

    omctDb
      .getPersonalImageUrl(imageName)
      .then(async (data) => {
        setCropImg(data);
      })
      .catch()
      .finally(() => {
        setIsLoading(false);
      });
  }, [imageName, setCropImg]);

  if (isLoading) return <LoadingIndicator />;

  return <ChoiceColor />;
};

function ChoiceColor() {
  const [selectedTypes, setSelectedTypes] = useState<ColorType[]>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [stageNum, setStageNum] = useState(0);
  const [isClickable, setIsClickable] = useState(true);

  const selectedTypesLength = selectedTypes.length;
  const MAX_STAGE_NUM = choiceColorData.length;

  const basicColorOptions = useMemo(() => {
    if (stageNum < MAX_STAGE_NUM) {
      return shuffle(choiceColorData[stageNum]);
    }
    return choiceColorData[stageNum];
  }, [MAX_STAGE_NUM, stageNum]);

  const bonusColorTypes = useSelectBonusColorTypes(
    selectedTypes,
    MAX_STAGE_NUM
  );

  const userImg = useCropImg();

  const onBasicClick = (selectedChip: ChoiceColorDataType) => {
    if (!(stageNum < MAX_STAGE_NUM) || !isClickable) return;

    setIsClickable(false);
    setSelectedTypes((prev) => [...prev, selectedChip.type]);
    setSelectedColor(selectedChip.color);
  };

  useEffect(() => {
    if (selectedColor) {
      const timeout = setTimeout(() => {
        setStageNum((prev) => prev + 1);
        setSelectedColor('');
        setIsClickable(true);
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [stageNum, selectedColor]);

  return (
    <S.Wrapper>
      {selectedTypesLength < MAX_STAGE_NUM ? (
        <BasicStage
          userImg={userImg}
          stageNum={stageNum}
          MAX_STAGE_NUM={MAX_STAGE_NUM}
          basicColorOptions={basicColorOptions}
          selectedColor={selectedColor}
          onBasicClick={onBasicClick}
        />
      ) : (
        <BonusStage
          userImg={userImg}
          bonusColorTypes={bonusColorTypes}
          selectedColor={selectedColor}
        />
      )}
      <OnboardingPage />
    </S.Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18NextConfig)),
    },
  };
};

export default withLoadingRouter(Page);
