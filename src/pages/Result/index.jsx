import { useRef, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faShare, faDownload } from '@fortawesome/free-solid-svg-icons';

import { resultData } from '@Constant/resultData';
import { flexCustom, BorderedButton } from '@Styles/theme';

import { updateClipboard } from '@Utils/clipboard';
import { webShare } from '@Utils/share';
import { captureElement, downloadImage } from '@Utils/capture';
import { isKakao } from '@Utils/userAgent';

import useKakaoShare from '@Hooks/useKakaoShare';

import ColorImgSpinner from '@Components/Spinner/ColorImgSpinner';

function ResultPage() {
  const [searchParams] = useSearchParams();

  const colorTone = useMemo(() => {
    if (!searchParams) return null;

    const colorTone = searchParams.get('colorTone');

    if (!colorTone) return null;

    return colorTone;
  }, [searchParams]);

  if (colorTone === null) {
    return (
      <$LoadingWrapper>
        <$Title>예기치 못한 상황이 발생했습니다.</$Title>
        <ColorImgSpinner />
        <RestartButton />
      </$LoadingWrapper>
    );
  }

  const {
    name,
    textColor,
    gridColors,
    description,
    bestColors,
    worstColors,
    stylingURL,
    celebrities,
  } = resultData[colorTone];

  const wrapperRef = useRef();

  return (
    <$Wrapper ref={wrapperRef}>
      <$Title>
        당신은 <$TitleBold color={textColor}>{name}</$TitleBold> 입니다.
      </$Title>

      <$ColorGrid>
        {/* HJ TODO: idx 제거 */}
        {gridColors.map((color, idx) => (
          <$ColorGridItem key={color + idx} backgroundColor={color} />
        ))}
      </$ColorGrid>

      <$Description>{description}</$Description>

      <$ColorMatchWrapper>
        <$ColorMatchTitle>베스트 컬러</$ColorMatchTitle>
        <$ColorMatchGrid>
          {bestColors.map((color, idx) => (
            <$ColorMatchGridItem key={color + idx} backgroundColor={color} />
          ))}
        </$ColorMatchGrid>
        <$ColorMatchTitle>피해야 할 컬러</$ColorMatchTitle>
        <$ColorMatchWorstGrid>
          {worstColors.map((color, idx) => (
            <$ColorMatchGridItem key={color + idx} backgroundColor={color} />
          ))}
        </$ColorMatchWorstGrid>
      </$ColorMatchWrapper>

      <$SubDescriptionTitle>
        <$SubDescriptionTitleBold color={textColor}>
          {name}
        </$SubDescriptionTitleBold>{' '}
        스타일링 추천
        <$StylingWrapper>
          <$Styling src={stylingURL} />
        </$StylingWrapper>
      </$SubDescriptionTitle>

      <$SubDescriptionTitle>
        <$SubDescriptionTitleBold color={textColor}>
          {name}
        </$SubDescriptionTitleBold>{' '}
        대표 연예인
        <$CelebritiesWrapper>
          {celebrities.map(({ name, imageURL }, idx) => {
            return (
              <$CelebrityWrapper key={name + idx}>
                <$Styling key={name} src={imageURL} />
                <$CelebrityName>{name}</$CelebrityName>
              </$CelebrityWrapper>
            );
          })}
        </$CelebritiesWrapper>
      </$SubDescriptionTitle>

      <MenuSubPage wrapperRef={wrapperRef} />
    </$Wrapper>
  );
}

const $Wrapper = styled.div`
  ${flexCustom('column', 'inherit', 'flex-start')}
  box-sizing: border-box;
  max-width: 400px;
  margin: 0 auto;
  padding: 48px 32px 30px 36px;
`;

const $LoadingWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')}
  box-sizing: border-box;
  max-width: 400px;
  margin: 0 auto;
  padding: 48px 32px 30px 36px;
`;

const $Title = styled.h1`
  font-size: min(5.25vw, 21px);
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.022em;
`;

const $TitleBold = styled.span`
  font-size: min(8.75vw, 35px);
  color: ${(props) => props.color};
`;

const $ColorGrid = styled.div`
  margin: 24px auto 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 1px;

  width: 100%;
`;

const $ColorGridItem = styled.div`
  aspect-ratio: 16/9;
  background-color: ${(props) => props.backgroundColor};
`;

const $Description = styled.div`
  margin-top: 24px;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: justify;
`;

const $ColorMatchWrapper = styled.div`
  margin-top: 48px;
`;

const $ColorMatchTitle = styled.h2`
  font-weight: 700;
  font-size: min(5.25vw, 21px);
`;

const $ColorMatchGrid = styled.div`
  margin-top: 12px;
  margin-bottom: 36px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;

  width: 100%;
`;

const $ColorMatchGridItem = styled.div`
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
`;

const $ColorMatchWorstGrid = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 1fr;
  gap: 5px;
`;

const $SubDescriptionTitle = styled.h2`
  margin-top: 48px;
  font-size: min(5.25vw, 21px);
  font-weight: 700;
`;

const $SubDescriptionTitleBold = styled.span`
  color: ${(props) => props.color};
`;

const $Styling = styled.img`
  max-width: 100%;
`;

const $StylingWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')};
  margin: 12px auto 0;
  width: min(64.25vw, 257px);
`;

const $CelebritiesWrapper = styled.div`
  ${flexCustom('row', 'inherit', 'space-between')};
  margin-top: 20px;
`;

const $CelebrityWrapper = styled.div`
  ${flexCustom('column', 'inherit', 'inherit')};
`;

const $CelebrityName = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.gray[600]};
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  font-family: initial;
`;

function MenuSubPage({ wrapperRef }) {
  const { isLoading, kakaoShare } = useKakaoShare();

  // HJ TODO: 네이밍 이상함..
  const kakaoAlert = () => {
    const _isKakao = isKakao();

    if (_isKakao) {
      alert(
        '카카오 인앱 브라우저에서는 지원하지 않는 기능입니다.\n다른 브라우저에서 실행해 주세요.😋'
      );
    }

    return _isKakao;
  };

  const handleCapture = async () => {
    if (kakaoAlert()) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const img = await captureElement(wrapper, 'personal-color-result.png');
    downloadImage(img, 'personal-color-result.png');
  };

  const handleLinkCopyClick = async () => {
    if (kakaoAlert()) return;

    try {
      await updateClipboard(location.href);
      // HJ TODO: 커스텀 alert 등록
      alert('클립보드 복사에 성공했습니다.');
    } catch (err) {
      console.error(err);
      alert('클립보드 복사에 실패했습니다');
    }
  };

  const handleKakaoShare = () => {
    if (isLoading) {
      alert('로딩 중 입니다. 다시 시도해주세요 :)');
    } else {
      kakaoShare();
    }
  };

  const handleShare = async () => {
    if (kakaoAlert()) return;

    await webShare();
  };

  return (
    <>
      <$MenuContainer>
        <$MenuItemWrapper>
          <$MenuItemButton onClick={handleCapture}>
            <FontAwesomeIcon icon={faDownload} color={'white'} />
          </$MenuItemButton>
          <$MenuItemName>결과저장</$MenuItemName>
        </$MenuItemWrapper>

        <$MenuItemWrapper>
          <$MenuItemButton onClick={handleLinkCopyClick}>
            <FontAwesomeIcon icon={faLink} color={'white'} />
          </$MenuItemButton>
          <$MenuItemName>링크복사</$MenuItemName>
        </$MenuItemWrapper>

        <$MenuItemWrapper>
          <$KakaoShareButton onClick={handleKakaoShare}>
            <$MenuItemImg src="/kakaoIcon.png" />
          </$KakaoShareButton>
          <$MenuItemName>카카오톡</$MenuItemName>
        </$MenuItemWrapper>

        <$MenuItemWrapper>
          <$MenuItemButton onClick={handleShare}>
            <FontAwesomeIcon icon={faShare} color={'white'} />
          </$MenuItemButton>
          <$MenuItemName>공유하기</$MenuItemName>
        </$MenuItemWrapper>
      </$MenuContainer>
      <RestartButton />
    </>
  );
}

function RestartButton() {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate('/');
  };

  return (
    <$RestartButtonWrapper>
      <BorderedButton onClick={handleRestart}>처음으로</BorderedButton>
    </$RestartButtonWrapper>
  );
}

const $MenuContainer = styled.div`
  ${flexCustom('row', 'inherit', 'space-around')}
  margin-top: 72px;
`;

const $MenuItemWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')}
`;

const $MenuItemButton = styled.button`
  ${flexCustom('column', 'center', 'center')}
  border-radius: 50%;
  background-color: #27272a;
  padding: 10px;
  width: 48px;
  height: 48px;
  aspect-ratio: 1/1;
  font-size: 48px;
  cursor: pointer;

  svg {
    width: 100%;
  }
`;

const $KakaoShareButton = styled.button`
  ${flexCustom('column', 'center', 'center')}
  border-radius: 50%;
  width: 48px;
  height: 48px;
  aspect-ratio: 1/1;
  cursor: pointer;
`;

const $MenuItemImg = styled.img`
  max-width: 100%;
`;

const $MenuItemName = styled.div`
  margin-top: 4px;
  text-align: center;
  font-size: 12px;
`;

const $RestartButtonWrapper = styled.div`
  margin-top: 29px;
`;

export default ResultPage;
