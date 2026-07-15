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
import Tag from '@Components/Tag';
import CompassChart from './CompassChart';
import * as S from './style';

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

  const handleSelect = (index: number) => {
    setSelectedIndex((prev) => (prev === index ? undefined : index));
  };

  return (
    <S.Wrapper>
      <S.BackButton onClick={() => router.back()}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </S.BackButton>

      <S.Title>
        <S.SubTitle>{t('allTypeView_1')}</S.SubTitle>
        {t('allTypeView_2')}
      </S.Title>

      <CompassChart
        selectedIndex={selectedIndex}
        hoveredIndex={hoveredIndex}
        onSelect={handleSelect}
        onHover={setHoveredIndex}
        celebrityIndex={0}
      />

      <CompassChart
        selectedIndex={selectedIndex}
        hoveredIndex={hoveredIndex}
        onSelect={handleSelect}
        onHover={setHoveredIndex}
        celebrityIndex={2}
      />

      {colorType ? (
        <S.ColorTypeWrapper>
          <S.ColorTypeTitle color={color[selectedIndex].textColor}>
            {t(`${colorType}.name`)}
          </S.ColorTypeTitle>

          <Tag colorType={colorType} tags={resultColorData[colorType].tags} />

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
