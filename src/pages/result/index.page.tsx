import React, { useRef, useMemo, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';

import ROUTE_PATH from '@Constant/routePath';
import resultColorData, {
  Celeb,
  ColorResult,
  Tag,
} from '@Data/resultColorData';
import { CropImage } from '@Recoil/app';

import ColorImgSpinner from '@Components/Spinner/ColorImgSpinner';

import * as S from './style';
import curiousEmoji from 'public/images/logo/curious-emoji-3d.png';
import ColorTransition, {
  ColorTransitionInstance,
} from '@Components/Transition/ColorTransition';
import RestartButton from '@Components/Button/RestartButton';
import LoadingIndicator from '@Components/LoadingIndicator';
import ShareSubPage from './ShareSubPage';
import useScrollTop from '@Hooks/useScrollTop';
import PaletteSubPage from './PaletteSubpage';
import {
  globalBgColorAtom,
  globalTextColorAtom,
} from '@Recoil/globalStyleStore';
import { invertColor } from '@Utils/colorExtension';

import { FormattedMessage } from 'react-intl';

// HJ TODO: 로직과 렌더링 관심 분리
function ResultPage(): JSX.Element {
  const [colorType, setColorType] = useState<ColorType | undefined>(undefined);
  const [isError, setIsError] = useState(false);

  useScrollTop();

  const router = useRouter();
  const { query } = router;

  const resultContainerRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<ColorTransitionInstance>(null);

  const userImg = useUserImg();

  // HJ TODO: 로직 분리
  const [, setBgColor] = useRecoilState(globalBgColorAtom);
  const [, setTextColor] = useRecoilState(globalTextColorAtom);

  useEffect(() => {
    if (!router.isReady) return;

    const { colorType } = router.query;

    if (
      typeof colorType === 'string' &&
      colorType &&
      Object.keys(resultColorData).includes(colorType)
    ) {
      setColorType(colorType as ColorType);
      return;
    }

    setIsError(true);
  }, [router.isReady, router.query]);

  useEffect(() => {
    return () => {
      setBgColor('inherit');
      setTextColor('inherit');
    };
  }, [setBgColor, setTextColor]);

  if (isError) {
    return (
      <S.LoadingWrapper>
        <S.Title>
          <FormattedMessage id="errorMsg" />
        </S.Title>
        <ColorImgSpinner />
        <RestartButton />
      </S.LoadingWrapper>
    );
  }

  if (!colorType) {
    return <LoadingIndicator />;
  }

  // HJ TODO: selector로 뺼 수 있음
  const {
    name,
    textColor,
    gridColors,
    tags,
    celebrities,
    secondaryType,
    worstType,
  } = resultColorData[colorType];

  const [secondaryColor, worstColor] = [
    { ...resultColorData[secondaryType], title: '이것도 좋아요' },
    { ...resultColorData[worstType], title: '이건 피하세요' },
  ];

  const onClickAnotherResult = (type: ColorType) => {
    const params = new URLSearchParams(query.toString());
    params.set('colorType', type);
    router.push(`${ROUTE_PATH.result}?${params}`);
  };

  // HJ TODO: 하드 코딩 제거
  const onClickPalette = (color: string) => {
    transitionRef.current?.play(color);
    setTimeout(() => {
      setBgColor(color);
      setTextColor(invertColor(color, true));
    }, 1000);
  };

  return (
    <>
      <S.Wrapper>
        <S.ResultContainer ref={resultContainerRef}>
          <TitleContent colorType={colorType} textColor={textColor} />

          <PaletteSubPage
            imgSrc={userImg}
            colors={gridColors}
            onClick={onClickPalette}
          />

          <TagContent colorType={colorType} tags={tags} />

          <DescriptionContent colorType={colorType} />

          <CelebritiesContent
            textColor={textColor}
            colorType={colorType}
            celebrities={celebrities}
            colorTypeName={name}
          />

          <LikeOrDislikeContent
            colors={[secondaryColor, worstColor]}
            onClick={onClickAnotherResult}
          />
        </S.ResultContainer>

        <ShareSubPage
          resultContainerRef={resultContainerRef}
          colorType={colorType}
        />

        <ColorTransition ref={transitionRef} />
      </S.Wrapper>
    </>
  );
}

// HJ TODO: loading이 필요한 훅의 경우 컨벤션 설정
function useUserImg() {
  const cropImg = useRecoilValue(CropImage);
  const userImg = useMemo(() => {
    if (!cropImg) return curiousEmoji.src;

    return cropImg;
  }, [cropImg]);

  return userImg;
}

// HJ TODO: 파일 분리 + store 사용 + 렌더 기능만 하는 컴포넌트의 경우 컨벤션?
interface TitleContentProps {
  colorType: ColorType;
  textColor: string;
}

function TitleContent({ colorType, textColor }: TitleContentProps) {
  return (
    <S.Title>
      <S.TitleBold color={textColor}>
        <FormattedMessage id={`${colorType}.name`} />
      </S.TitleBold>
    </S.Title>
  );
}

interface TagContentProps {
  tags: Tag[];
  colorType: ColorType;
}

function TagContent({ tags, colorType }: TagContentProps) {
  return (
    <S.TagWrapper>
      {tags.map(({ backgroundColor, textColor }, index: number) => (
        <S.Tag
          key={index}
          backgroundColor={backgroundColor}
          textColor={textColor}
        >
          <FormattedMessage id={`${colorType}.keyword.${index}`} />
        </S.Tag>
      ))}
    </S.TagWrapper>
  );
}

interface DescriptionContentProps {
  colorType: ColorType;
}

function DescriptionContent({ colorType }: DescriptionContentProps) {
  return (
    <S.Description>
      {[1, 2, 3, 4, 5].map((index) => (
        <li key={index}>
          <FormattedMessage id={`${colorType}.descriptions.${index - 1}`} />
        </li>
      ))}
    </S.Description>
  );
}

interface CelebritesContentProps {
  textColor: string;
  colorTypeName: string;
  celebrities: Celeb[];
  colorType: ColorType;
}

function CelebritiesContent({
  textColor,
  colorTypeName,
  celebrities,
  colorType,
}: CelebritesContentProps) {
  return (
    <S.SubDescriptionTitle>
      <S.SubDescriptionTitleBold color={textColor}>
        {colorTypeName}
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
  );
}

interface LikeorDisLikeSubPageProps {
  colors: (ColorResult & { title: string })[];
  onClick: (type: ColorType) => void; // HJ TODO: click event @types 에 동록
}

function LikeOrDislikeContent({ colors, onClick }: LikeorDisLikeSubPageProps) {
  return (
    <>
      {colors.map(({ title, type, name, textColor, bestColors }) => (
        <S.ColorMatchButton key={name} onClick={() => onClick(type)}>
          <S.ColorMatchTitle>
            {title}
            <S.SubDescriptionTitleBold color={textColor}>
              {name}
            </S.SubDescriptionTitleBold>
          </S.ColorMatchTitle>
          <S.ColorMatchGrid>
            {bestColors.map((color, idx) => (
              <S.ColorMatchGridItem key={color + idx} backgroundColor={color} />
            ))}
          </S.ColorMatchGrid>
        </S.ColorMatchButton>
      ))}
    </>
  );
}

export default ResultPage;
