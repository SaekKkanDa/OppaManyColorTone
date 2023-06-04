import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import color from '@Data/color';
import resultColorData from '@Data/resultColorData';
import theme from '@Styles/theme';
import {
  $Wrapper,
  $BackButton,
  $SubTitle,
  $Title,
  $Description,
  $PieChart,
  $ColorTypeTitle,
  $TagWrapper,
  $Tag,
  $PaletteGrid,
  $PaletteGridItem,
} from './style';

const defaultLabelStyle = {
  fontSize: '4px',
  fontFamily: "'Noto Sans KR', sans-serif",
};

const AllTypesView = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>(
    undefined
  );

  const router = useRouter();

  const colorType = selectedIndex !== undefined && color[selectedIndex].type;

  return (
    <$Wrapper>
      <$BackButton onClick={() => router.back()}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </$BackButton>

      <$Title>
        <$SubTitle>한 눈에 보는 </$SubTitle>퍼스널 컬러
      </$Title>

      <$PieChart
        data={color.map(({ name }, index) => ({
          title: name.replace(' ', ''),
          color:
            hoveredIndex === index || selectedIndex === index
              ? color[index].textColor
              : theme.gray[50],
          value: 1,
        }))}
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
        <>
          <$ColorTypeTitle color={color[selectedIndex].textColor}>
            {color[selectedIndex].name}
          </$ColorTypeTitle>

          <$TagWrapper>
            {resultColorData[colorType].tags.map(
              ({ keyword, backgroundColor, textColor }) => (
                <$Tag
                  key={keyword}
                  backgroundColor={backgroundColor}
                  textColor={textColor}
                >
                  {`#${keyword}`}
                </$Tag>
              )
            )}
          </$TagWrapper>

          <$PaletteGrid>
            {resultColorData[colorType].gridColors.map(
              (backgroundColor, index) => (
                <$PaletteGridItem
                  key={selectedIndex + backgroundColor + index}
                  backgroundColor={backgroundColor}
                />
              )
            )}
          </$PaletteGrid>
        </>
      ) : (
        <$Description>컬러 유형을 클릭해 보세요!</$Description>
      )}
    </$Wrapper>
  );
};

export default AllTypesView;
