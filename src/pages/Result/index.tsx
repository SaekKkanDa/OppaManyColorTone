import React, { useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faShare, faDownload } from '@fortawesome/free-solid-svg-icons';

import resultColorData, { ColorTone } from '@Data/resultColorData';
import { BorderedButton } from '@Styles/theme';

import { updateClipboard } from '@Utils/clipboard';
import { webShare } from '@Utils/share';
import { captureElement, downloadImage } from '@Utils/capture';
import { isKakao } from '@Utils/userAgent';

import useKakaoShare from '@Hooks/useKakaoShare';

import ColorImgSpinner from '@Components/Spinner/ColorImgSpinner';
import StyleMan from '@Components/svg/StyleMan';

import kakaoIcon from '../../assets/icon/kakaoIcon.png';

import {
  $LoadingWrapper,
  $Title,
  $TitleBold,
  $Wrapper,
  $ColorGrid,
  $ColorGridItem,
  $Description,
  $ColorMatchWrapper,
  $ColorMatchGrid,
  $ColorMatchGridItem,
  $ColorMatchTitle,
  $ColorMatchWorstGrid,
  $CelebritiesWrapper,
  $CelebrityName,
  $CelebrityWrapper,
  $KakaoShareButton,
  $MenuContainer,
  $MenuItemButton,
  $MenuItemImg,
  $MenuItemName,
  $MenuItemWrapper,
  $RestartButtonWrapper,
  $Styling,
  $StylingWrapper,
  $SubDescriptionTitle,
  $SubDescriptionTitleBold,
} from './style';

function ResultPage() {
  const [searchParams] = useSearchParams();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const colorTone = useMemo(() => {
    if (!searchParams) return null;

    // HJ TODO: type check
    const colorTone = searchParams.get('colorTone') as ColorTone;

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
    stylingColor,
    stylingURL,
    celebrities,
  } = resultColorData[colorTone];

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
          {/* <$Styling src={stylingURL} /> */}
          <StyleMan color={stylingColor}></StyleMan>
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

interface MenuSubPageProps {
  wrapperRef: React.RefObject<HTMLDivElement>;
}

function MenuSubPage({ wrapperRef }: MenuSubPageProps) {
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
            <$MenuItemImg src={kakaoIcon} />
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

export default ResultPage;
