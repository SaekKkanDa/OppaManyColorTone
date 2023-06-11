import React, { useRef, useMemo } from 'react';

import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import ROUTE_PATH from '@Constant/routePath';
import resultColorData, {
  Celeb,
  ColorResult,
  ColorType,
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
import ShareSubPage from './ShareSubPage';
import useScrollTop from '@Hooks/useScrollTop';
import PaletteSubPage from './PaletteSubpage';

// HJ TODO: 로직과 렌더링 관심 분리
function ResultPage(): JSX.Element {
  useScrollTop();

  const router = useRouter();
  const searchParams = router.query as Record<string, string>;
  const colorType = searchParams['colorType'] as ColorType;

  const resultContainerRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<ColorTransitionInstance>(null);

  const userImg = useUserImg();

  // NOTE: SSR이 아닌 환경에서는 prerendering 동안 empty object
  // https://nextjs.org/docs/pages/api-reference/functions/use-router#router-object
  if (!colorType) {
    return (
      <S.LoadingWrapper>
        <S.Title>예기치 못한 상황이 발생했습니다.</S.Title>
        <ColorImgSpinner />
        <RestartButton />
      </S.LoadingWrapper>
    );
  }

  // HJ TODO: selector로 뺼 수 있음
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

  const onClickPalette = (color: string) => {
    transitionRef.current?.play(color);
  };

  return (
    <>
      <S.Wrapper>
        <S.ResultContainer ref={resultContainerRef}>
          <TitleContent textColor={textColor} colorTypeName={name} />

          <PaletteSubPage
            imgSrc={userImg}
            colors={gridColors}
            onClick={onClickPalette}
          />

          <TagContent tags={tags} />

          <DescriptionContent descriptions={descriptions} />

          <CelebritesContent
            textColor={textColor}
            colorTypeName={name}
            celebrities={celebrities}
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
  textColor: string;
  colorTypeName: string;
}

function TitleContent({ textColor, colorTypeName }: TitleContentProps) {
  return (
    <S.Title>
      당신의 퍼스널 컬러는
      <S.TitleBold color={textColor}>{colorTypeName}</S.TitleBold>
    </S.Title>
  );
}

interface TagContentProps {
  tags: Tag[];
}

function TagContent({ tags }: TagContentProps) {
  return (
    <S.TagWrapper>
      {tags.map(({ keyword, backgroundColor, textColor }) => (
        <S.Tag
          key={keyword}
          backgroundColor={backgroundColor}
          textColor={textColor}
        >
          {`#${keyword}`}
        </S.Tag>
      ))}
    </S.TagWrapper>
  );
}

interface DescriptionContentProps {
  descriptions: string[];
}

function DescriptionContent({ descriptions }: DescriptionContentProps) {
  return (
    <S.Description>
      {descriptions.map((description, index) => (
        <li key={description + index}>{description}</li>
      ))}
    </S.Description>
  );
}

interface CelebritesContentProps {
  textColor: string;
  colorTypeName: string;
  celebrities: Celeb[];
}

function CelebritesContent({
  textColor,
  colorTypeName,
  celebrities,
}: CelebritesContentProps) {
  return (
    <S.SubDescriptionTitle>
      <S.SubDescriptionTitleBold color={textColor}>
        {colorTypeName}
      </S.SubDescriptionTitleBold>{' '}
      대표 연예인
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
              <S.CelebrityName>{name}</S.CelebrityName>
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
