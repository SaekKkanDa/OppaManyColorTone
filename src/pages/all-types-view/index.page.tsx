import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import color from '@Data/color';
import resultColorData from '@Data/resultColorData';
import theme from '@Styles/theme';
import Tag from '@Components/Tag';
import * as S from './style';

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
    <S.Wrapper>
      <S.BackButton onClick={() => router.back()}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </S.BackButton>

      <S.Title>
        <S.SubTitle>
          <FormattedMessage id="allTypeView_1" />
        </S.SubTitle>
        <FormattedMessage id="allTypeView_2" />
      </S.Title>

      <S.PieChart
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
          <S.ColorTypeTitle color={color[selectedIndex].textColor}>
            <FormattedMessage id={`${colorType}.name`} />
          </S.ColorTypeTitle>
          {/* <S.TagWrapper>
            {resultColorData[colorType].tags.map(
              ({ keyword, backgroundColor, textColor }) => (
                <S.Tag
                  key={keyword}
                  backgroundColor={backgroundColor}
                  textColor={textColor}
                >
                  {`#${keyword}`}
                </S.Tag>
              )
            )}
          </S.TagWrapper> */}
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
        </>
      ) : (
        <S.Description>
          <FormattedMessage id="clickType" />
        </S.Description>
      )}
    </S.Wrapper>
  );
};

export default AllTypesView;
