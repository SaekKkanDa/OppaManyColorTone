import { useRef } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@Root/next-i18next.config';

import { createConsecutiveNumbers } from '@Base/utils/arrExtension';
import useScrollTop from '@Base/hooks/useScrollTop';

import resultColorData from '@Data/resultColorData';
import RestartButton from '@Pages/result/RestartButton';
import ColorChipSpinner from '@Components/ColorChipSpinner';
import LoadingIndicator from '@Components/LoadingIndicator';
import Tag from '@Components/Tag';
import { AdSense } from '@Components/AdSense';

import ShareSubPage from './share.subPage';
import PaletteSubPage from './palette.subPage';
import {
  useClearPageTheme,
  useNavigateByColorType,
  useLateColorType,
} from './index.logic';
import * as S from './style';

// HJ TODO: 로직과 렌더링 관심 분리
function ResultPage(): JSX.Element {
  const { t } = useTranslation('common');

  const resultContainerRef = useRef<HTMLDivElement>(null);

  useScrollTop();
  useClearPageTheme();

  const { data: colorType, status, error } = useLateColorType();
  const navigateByColorType = useNavigateByColorType();

  // conditional rendering
  if (status === 'loading') {
    return <LoadingIndicator />;
  }

  if (status === 'error' || colorType === null) {
    console.error(error);
    return (
      <S.LoadingWrapper>
        <S.Title>{t('errorMsg')}</S.Title>
        <ColorChipSpinner />
        <RestartButton />
      </S.LoadingWrapper>
    );
  }

  // destructing data
  const { textColor, gridColors, tags, celebrities, secondaryType, worstType } =
    resultColorData[colorType];

  const [secondaryColor, worstColor] = [
    {
      ...resultColorData[secondaryType],
      title: 'secondaryType',
    },
    {
      ...resultColorData[worstType],
      title: 'worstType',
    },
  ];

  return (
    <S.Wrapper>
      <Head>
        <link
          rel="canonical"
          href="https://omct.web.app/result?colorType=springwarm"
        />
      </Head>

      <S.ResultContainer ref={resultContainerRef}>
        <S.MainWrapper>
          <S.Title color={textColor}>{t(`${colorType}.name`)}</S.Title>

          <PaletteSubPage colors={gridColors} />

          <Tag tags={tags} colorType={colorType} />
          <S.Description>
            {createConsecutiveNumbers(5).map((index, number) => (
              <li key={index}>{t(`${colorType}.descriptions.${number}`)}</li>
            ))}
          </S.Description>
        </S.MainWrapper>

        <S.SubDescriptionWrapper>
          <S.SubDescriptionTitle>
            <S.SubDescriptionTitleHighlighted color={textColor}>
              {t(`${colorType}.name`)}
            </S.SubDescriptionTitleHighlighted>
            {t('celebrities')}
          </S.SubDescriptionTitle>
          <S.CelebritiesWrapper>
            {celebrities.map(({ name, imageURL }, idx) => {
              return (
                <S.CelebrityWrapper key={name + idx}>
                  <S.CelebrityImage
                    key={name}
                    src={imageURL}
                    alt="연예인"
                    width={92}
                    height={92}
                  />
                  <S.CelebrityName>
                    {t(`${colorType}.celebrities.${idx}`)}
                  </S.CelebrityName>
                </S.CelebrityWrapper>
              );
            })}
          </S.CelebritiesWrapper>
        </S.SubDescriptionWrapper>

        {[secondaryColor, worstColor].map(
          ({ title, type, name, textColor, bestColors }) => (
            <S.ColorMatchButton
              key={name}
              onClick={() => navigateByColorType(type)}
            >
              <S.SubDescriptionTitle>
                {t(`${title}Title`)}
                <S.SubDescriptionTitleHighlighted color={textColor}>
                  {t(`${colorType}.${title}`)}
                </S.SubDescriptionTitleHighlighted>
              </S.SubDescriptionTitle>
              <S.ColorMatchGrid>
                {bestColors.map((color, idx) => (
                  <S.ColorMatchGridItem
                    key={color + idx}
                    backgroundColor={color}
                  />
                ))}
              </S.ColorMatchGrid>
            </S.ColorMatchButton>
          )
        )}
      </S.ResultContainer>
      <ShareSubPage
        resultContainerRef={resultContainerRef}
        colorType={colorType}
      />
      <AdSense data-ad-slot={'2551404503'} />
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

export default ResultPage;
