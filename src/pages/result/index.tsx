import React, { useRef, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faShare, faDownload } from '@fortawesome/free-solid-svg-icons';

import useKakaoShare from '@Hooks/useKakaoShare';

import { updateClipboard } from '@Utils/clipboard';
import { webShare } from '@Utils/share';
import { captureElement, downloadImage } from '@Utils/capture';
import { isChrome, isKakao, isOSX } from '@Utils/userAgent';
import CustomError, { CustomErrorConstructor } from '@Utils/customError';

import { OmctErrorNo } from '@Constant/errorKeyValue';
import ROUTE_PATH from '@Constant/routePath';
import resultColorData, { ColorType } from '@Data/resultColorData';

import ColorImgSpinner from '@Components/Spinner/ColorImgSpinner';

import kakaoIcon from 'public/images/icon/kakaoIcon.png';

import { BorderedButton } from '@Styles/theme';
import {
  $LoadingWrapper,
  $Title,
  $TitleBold,
  $Wrapper,
  $ResultContainer,
  $ColorGrid,
  $ColorGridItem,
  $TagWrapper,
  $Tag,
  $Description,
  $ColorMatchButton,
  $ColorMatchGrid,
  $ColorMatchGridItem,
  $ColorMatchTitle,
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
  $SubDescriptionTitle,
  $SubDescriptionTitleBold,
} from './style';

function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const resultContainerRef = useRef<HTMLDivElement>(null);

  const colorType = useMemo(() => {
    if (!searchParams) return null;

    // HJ TODO: type check
    const colorType = searchParams.get('colorType') as ColorType;

    if (!colorType) return null;

    return colorType;
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [colorType]);

  if (colorType === null) {
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
    tags,
    descriptions,
    celebrities,
    secondaryType,
    worstType,
  } = resultColorData[colorType];

  const [secondaryColor, worstColor] = [
    { ...resultColorData[secondaryType], title: '이것도 좋아요' },
    { ...resultColorData[worstType], title: '이건 피하세요' },
  ];

  const onClickAnotherResult = (type: ColorType) => {
    const params = new URLSearchParams(searchParams);
    params.set('colorType', type);
    router.push(`${ROUTE_PATH.result}?${params}`);
  };

  return (
    <$Wrapper>
      <$ResultContainer ref={resultContainerRef}>
        <$Title>
          당신의 퍼스널 컬러는
          <$TitleBold color={textColor}>{name}</$TitleBold>
        </$Title>

        <$ColorGrid>
          {/* HJ TODO: idx 제거 */}
          {gridColors.map((color, idx) => (
            <$ColorGridItem key={color + idx} backgroundColor={color} />
          ))}
        </$ColorGrid>

        <$TagWrapper>
          {tags.map(({ keyword, backgroundColor, textColor }) => (
            <$Tag
              key={keyword}
              backgroundColor={backgroundColor}
              textColor={textColor}
            >
              {`#${keyword}`}
            </$Tag>
          ))}
        </$TagWrapper>

        <$Description>
          {descriptions.map((description, index) => (
            <li key={description + index}>{description}</li>
          ))}
        </$Description>

        {/* <$SubDescriptionTitle>
          <$SubDescriptionTitleBold color={textColor}>
            {name}
          </$SubDescriptionTitleBold>{' '}
          스타일링 추천
          <$StylingWrapper>
            <StyleMan colors={stylingColor}></StyleMan>
          </$StylingWrapper>
        </$SubDescriptionTitle> */}

        <$SubDescriptionTitle>
          <$SubDescriptionTitleBold color={textColor}>
            {name}
          </$SubDescriptionTitleBold>{' '}
          대표 연예인
          <$CelebritiesWrapper>
            {celebrities.map(({ name, imageURL }, idx) => {
              return (
                <$CelebrityWrapper key={name + idx}>
                  <$Styling
                    key={name}
                    src={imageURL}
                    alt="연예인"
                    width={92}
                    height={92}
                  />
                  <$CelebrityName>{name}</$CelebrityName>
                </$CelebrityWrapper>
              );
            })}
          </$CelebritiesWrapper>
        </$SubDescriptionTitle>

        {[secondaryColor, worstColor].map(
          ({ title, type, name, textColor, bestColors }) => (
            <$ColorMatchButton
              key={name}
              onClick={() => onClickAnotherResult(type)}
            >
              <$ColorMatchTitle>
                {title}
                <$SubDescriptionTitleBold color={textColor}>
                  {name}
                </$SubDescriptionTitleBold>
              </$ColorMatchTitle>
              <$ColorMatchGrid>
                {bestColors.map((color, idx) => (
                  <$ColorMatchGridItem
                    key={color + idx}
                    backgroundColor={color}
                  />
                ))}
              </$ColorMatchGrid>
            </$ColorMatchButton>
          )
        )}
      </$ResultContainer>

      <MenuSubPage
        resultContainerRef={resultContainerRef}
        colorType={colorType}
      />
    </$Wrapper>
  );
}

interface MenuSubPageProps {
  resultContainerRef: React.RefObject<HTMLDivElement>;
  colorType: string;
}

function MenuSubPage({ resultContainerRef, colorType }: MenuSubPageProps) {
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

    const wrapper = resultContainerRef.current;
    if (!wrapper) return;

    const imgName = `${colorType}-result.png`;
    const img = await captureElement(wrapper, imgName);
    downloadImage(img, imgName);
  };

  const handleLinkCopyClick = async () => {
    if (kakaoAlert()) return;

    try {
      await updateClipboard(location.href);
      // HJ TODO: 커스텀 alert 등록
      alert('링크가 복사되었습니다.');
    } catch (err) {
      console.error(err);
      alert('클립보드 복사에 실패했습니다');
      throw new ShareError({ errorNo: OmctErrorNo.SHARE_CLIPBOARD_COPY_ERROR });
    }
  };

  const handleKakaoShare = () => {
    if (isLoading) {
      alert('로딩 중입니다. 다시 시도해주세요. :)');
    } else {
      kakaoShare();
    }
  };

  const handleShare = async () => {
    if (kakaoAlert()) return;

    if (isChrome() && isOSX()) {
      alert(
        'macOS 환경의 크롬 브라우저에서는 지원하지 않는 기능입니다.\n다른 브라우저에서 실행해 주세요. 🥰'
      );
    } else {
      await webShare();
    }
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
            <$MenuItemImg
              src={kakaoIcon}
              alt="카카오톡 공유 버튼"
              width={48}
              height={48}
            />
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
  return (
    <$RestartButtonWrapper>
      <Link href={ROUTE_PATH.landing}>
        <BorderedButton>처음으로</BorderedButton>
      </Link>
    </$RestartButtonWrapper>
  );
}

class ShareError extends CustomError {
  constructor(props: CustomErrorConstructor) {
    super(props);
    this.name = 'ShareError';
  }
}

export default ResultPage;
