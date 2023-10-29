import { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import resultColorData from '@Data/resultColorData';

import RestartButton from '@Pages/result/RestartButton';
import useScrollTop from '@Hooks/useScrollTop';

import ColorChipSpinner from '@Components/ColorChipSpinner';
import LoadingIndicator from '@Components/LoadingIndicator';
import Tag from '@Components/Tag';
import AlertModal from '@Components/AlertModal';

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
  const resultContainerRef = useRef<HTMLDivElement>(null);

  // hooks
  useScrollTop();
  useClearPageTheme();

  const { data: colorType, status, error } = useLateColorType();
  const onClickAnotherResult = useNavigateByColorType();

  // alert modal
  const [alertMessage, setAlertMessage] = useState('');

  // conditional rendering
  if (status === 'loading') {
    return <LoadingIndicator />;
  }

  if (status === 'error' || colorType === null) {
    console.error(error);
    return (
      <S.LoadingWrapper>
        <S.Title>
          <FormattedMessage id="errorMsg" />
        </S.Title>
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
      <S.ResultContainer ref={resultContainerRef}>
        <S.Title>
          <S.TitleBold color={textColor}>
            <FormattedMessage id={`${colorType}.name`} />
          </S.TitleBold>
        </S.Title>

        <PaletteSubPage colors={gridColors} />

        <Tag tags={tags} colorType={colorType} />

        <S.Description>
          {[0, 1, 2, 3, 4].map((index, number) => (
            <li key={index}>
              <FormattedMessage id={`${colorType}.descriptions.${number}`} />
            </li>
          ))}
        </S.Description>

        <S.SubDescriptionTitle>
          <S.SubDescriptionTitleBold color={textColor}>
            <FormattedMessage id={`${colorType}.name`} />
          </S.SubDescriptionTitleBold>{' '}
          <FormattedMessage id="celebrities" />
          <S.CelebritiesWrapper>
            {celebrities.map(({ name, imageURL }, idx) => {
              return (
                <S.CelebrityWrapper key={name + idx}>
                  <S.Styling
                    key={name}
                    src={imageURL}
                    alt="연예인"
                    width={92}
                    height={92}
                  />
                  <S.CelebrityName>
                    <FormattedMessage id={`${colorType}.celebrities.${idx}`} />
                  </S.CelebrityName>
                </S.CelebrityWrapper>
              );
            })}
          </S.CelebritiesWrapper>
        </S.SubDescriptionTitle>

        {[secondaryColor, worstColor].map(
          ({ title, type, name, textColor, bestColors }) => (
            <S.ColorMatchButton
              key={name}
              onClick={() => onClickAnotherResult(type)}
            >
              <S.ColorMatchTitle>
                <FormattedMessage id={`${title}Title`} />
                <S.SubDescriptionTitleBold color={textColor}>
                  <FormattedMessage id={`${colorType}.${title}`} />
                </S.SubDescriptionTitleBold>
              </S.ColorMatchTitle>
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
      {alertMessage && (
        <AlertModal
          isOpen={!!alertMessage}
          handleClose={() => setAlertMessage('')}
        >
          <FormattedMessage id={alertMessage} />
        </AlertModal>
      )}
      <ShareSubPage
        resultContainerRef={resultContainerRef}
        colorType={colorType}
        setAlertMessage={setAlertMessage}
      />
    </S.Wrapper>
  );
}

export default ResultPage;
