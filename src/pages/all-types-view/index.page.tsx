import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@Root/next-i18next.config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import color from '@Data/color';
import resultColorData from '@Data/resultColorData';
import theme from '@Styles/theme';
import Tag from '@Components/Tag';
import * as S from './style';

const defaultLabelStyle = {
  fontSize: '4px',
  fontFamily: "'Noto Sans KR', sans-serif",
};

const DEFAULT_SELECTED_INDEX = color.findIndex(
  ({ type }) => type === 'springbright'
);

const AllTypesView = () => {
  const { t } = useTranslation('common');

  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    DEFAULT_SELECTED_INDEX
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>(
    undefined
  );

  const router = useRouter();

  const colorType = selectedIndex !== undefined && color[selectedIndex].type;

  return (
    <S.Wrapper>
      <S.BackButton onClick={() => router.back()}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </S.BackButton>

      <S.Title>
        <S.SubTitle>{t('allTypeView_1')}</S.SubTitle>
        {t('allTypeView_2')}
      </S.Title>

      <S.PieChart
        data={color.map(({ type }, index) => {
          return {
            title: t(`${type}.name`),
            color:
              hoveredIndex === index || selectedIndex === index
                ? color[index].textColor
                : theme.gray[50],
            value: 1,
          };
        })}
        label={({ dataEntry }) => dataEntry.title}
        labelStyle={(index) => ({
          ...defaultLabelStyle,
          fill:
            hoveredIndex === index || selectedIndex === index
              ? 'white'
              : color[index].textColor,
          fontWeight: '500',
          whiteSpace: 'pre-line',
          pointerEvents: 'none',
        })}
        labelPosition={80}
        startAngle={-90}
        radius={45}
        segmentsStyle={{ transition: 'stroke 0.3s', cursor: 'pointer' }}
        segmentsShift={(index) => (index === selectedIndex ? 5 : 1)}
        onClick={(_, index) => {
          setSelectedIndex((prevSelected) =>
            index === prevSelected ? undefined : index
          );
        }}
        onMouseOver={(_, index) => {
          setHoveredIndex(index);
        }}
        onMouseOut={() => {
          setHoveredIndex(undefined);
        }}
      />

      {colorType ? (
        <S.ColorTypeWrapper>
          <S.ColorTypeTitle color={color[selectedIndex].textColor}>
            {t(`${colorType}.name`)}
          </S.ColorTypeTitle>

          <Tag colorType={colorType} tags={resultColorData[colorType].tags} />

          <S.CelebrityCard borderColor={color[selectedIndex].textColor}>
            <S.CelebrityImage
              src={resultColorData[colorType].celebrities[0].imageURL}
              alt={t(`${colorType}.celebrities.0`)}
              width={96}
              height={96}
            />
            <S.CelebrityName>
              {t(`${colorType}.celebrities.0`)}
            </S.CelebrityName>
          </S.CelebrityCard>

          <S.PaletteGrid>
            {resultColorData[colorType].gridColors.map(
              (backgroundColor, index) => (
                <S.PaletteGridItem
                  key={selectedIndex + backgroundColor + index}
                  backgroundColor={backgroundColor}
                />
              )
            )}
          </S.PaletteGrid>
        </S.ColorTypeWrapper>
      ) : (
        <S.Description>{t('clickType')}</S.Description>
      )}
    </S.Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18NextConfig)),
    },
  };
};

export default AllTypesView;
