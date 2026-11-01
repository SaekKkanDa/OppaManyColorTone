'use client';

import { useEffect, useRef, useState } from 'react';
import { type GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@Root/next-i18next.config';
import { useSetRecoilState } from 'recoil';
import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faChevronDown,
  faShareNodes,
  faSwatchbook,
} from '@fortawesome/free-solid-svg-icons';
import { useIntersectionObserver } from '@Base/hooks/useIntersectionObserver';
import { useCountUp } from '@Base/hooks/useCountUp';
import { CropImage } from '@Recoil/app';
import omctDb from '@Utils/omctDb';
import { canWebShare, webShare } from '@Utils/share';
import { copyUrl } from '@Utils/clipboard';
import ROUTE_PATH from '@Constant/routePath';
import * as S from './style';
import PageHead from '@Components/PageHead';
import SilentErrorBoundary from '@Components/SilentErrorBoundary';
import { cLocales } from '@Constant/locales';
import { withDefault } from '@Base/utils/dataExtension';
import { getNumberOfUsersForSsr } from '@Utils/numberOfUsers.server';

interface HomeProps {
  /** 서버에서 읽은 진단 참여자 수. 읽지 못하면 null 이고 브라우저에서 불러온다. */
  initialNumberOfUsers: number | null;
}

export default function Home({ initialNumberOfUsers }: HomeProps) {
  const [numberOfUsers, setNumberOfUsers] = useState(initialNumberOfUsers ?? 0);
  const [isInViewBottom, setIsInViewBottom] = useState(false);
  const [isRunningStartTransition, setIsRunningStartTransition] =
    useState(false);
  const router = useRouter();
  const bottomPageRef = useRef<HTMLDivElement>(null);

  const setUserImg = useSetRecoilState(CropImage);

  const { t, i18n } = useTranslation('common');
  const currentLocale = i18n.language;
  const introParagraphs = t('homeIntro.paragraphs', {
    returnObjects: true,
  }) as string[];

  const { ref: topRef } = useIntersectionObserver(
    (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) setIsInViewBottom(false);
    }
  );
  const { ref: bottomRef } = useIntersectionObserver(
    (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) setIsInViewBottom(entry.isIntersecting);
    }
  );

  const COUNT_UP_DURATION = 2000;
  const userCount = useCountUp(
    numberOfUsers,
    COUNT_UP_DURATION,
    isInViewBottom
  );

  useEffect(() => {
    if (window !== undefined) document.body.style.backgroundColor = S.bgColor;

    return () => {
      if (window !== undefined) document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    if (initialNumberOfUsers !== null) return;

    const getNumberOfUsers = async () => {
      setNumberOfUsers(await omctDb.getNumberOfUsers());
    };

    getNumberOfUsers();
  }, [initialNumberOfUsers]);

  useEffect(() => {
    setUserImg('');
  }, [setUserImg]);

  const handleClickStart = () => {
    setIsRunningStartTransition(true);
  };

  const onStartTransitionEnd = () => {
    router.push(ROUTE_PATH.imageUpload);
  };

  const handleScroll = () => {
    const target = isInViewBottom ? topRef.current : bottomPageRef.current;
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewAllType = () => {
    router.push(ROUTE_PATH.allTypesView);
  };

  const handleShare = async () => {
    if (canWebShare) return await webShare();
    const messageId = await copyUrl(location.href);
    alert(t(`${messageId}`));
  };

  const handleToggleLanguage = () => {
    router.push(router.pathname, router.asPath, {
      locale: currentLocale === cLocales.en ? cLocales.ko : cLocales.en,
    });
  };

  const onLoadSpline = (app: Application) => {
    app.setZoom(0.15);
    app.setBackgroundColor(S.bgColor);
  };

  return (
    <S.PageWrapper>
      <PageHead
        title={t('meta.homeTitle')}
        description={t('meta.homeDescription')}
        path={ROUTE_PATH.landing}
      />
      <S.IntroTop>
        <S.TitleWrapper>
          <S.Title>{t('landingSubTitle')}</S.Title>
        </S.TitleWrapper>

        <S.IntroContent>
          <S.IntroTitle>{t('homeIntro.title')}</S.IntroTitle>
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </S.IntroContent>
      </S.IntroTop>

      <S.TopPage>
        <S.TopSentinel ref={topRef} aria-hidden />
        <S.LanguageButton onClick={handleToggleLanguage}>
          {withDefault(
            { [cLocales.ko]: 'ENG', [cLocales.en]: '한국어' }[currentLocale],
            '한국어'
          )}
        </S.LanguageButton>

        {/* WebGL 을 쓸 수 없는 환경에서는 3D 장면만 빠지고 페이지는 그대로 동작한다 */}
        <SilentErrorBoundary>
          <Spline
            scene="https://prod.spline.design/hZ8jGzxERn1B-4De/scene.splinecode"
            style={{
              width: '100%',
              height: '100%',
            }}
            onLoad={onLoadSpline}
          />
        </SilentErrorBoundary>

        <S.ScrollButton $isInViewBottom={isInViewBottom} onClick={handleScroll}>
          <FontAwesomeIcon icon={faChevronDown} />
        </S.ScrollButton>
      </S.TopPage>

      <S.BottomPage ref={bottomPageRef}>
        <S.UserCountMessage ref={bottomRef} $isInViewBottom={isInViewBottom}>
          {t('userCount_1')}
          <S.UserCountWrapper>
            {/* 화면에 보이기 전(서버 HTML 포함)에는 실제 숫자, 보이면 0부터 카운트업 */}
            <S.UserCount>
              {(isInViewBottom ? userCount : numberOfUsers).toLocaleString()}
            </S.UserCount>
            {t('userCount_2')}
          </S.UserCountWrapper>
          {t('userCount_3')}
        </S.UserCountMessage>

        <S.StartButton
          $isRunningStartTransition={isRunningStartTransition}
          onClick={handleClickStart}
        >
          {t('startButton')}
        </S.StartButton>
        <S.StartTransition
          $isRunningStartTransition={isRunningStartTransition}
          onTransitionEnd={onStartTransitionEnd}
        />

        <S.MiniButtonWrapper $isInViewBottom={isInViewBottom}>
          <S.MiniButton onClick={handleShare}>
            <FontAwesomeIcon icon={faShareNodes} />
            {t('shareButton')}
          </S.MiniButton>
          <S.MiniButton onClick={handleViewAllType}>
            <FontAwesomeIcon icon={faSwatchbook} />
            {t('viewAllTypesButton')}
          </S.MiniButton>
          <S.MiniButton as={Link} href={ROUTE_PATH.guide}>
            <FontAwesomeIcon icon={faBookOpen} />
            {t('guideButton')}
          </S.MiniButton>
        </S.MiniButtonWrapper>

        <S.Footer tone="dark" />
      </S.BottomPage>
    </S.PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  locale,
}) => {
  return {
    props: {
      initialNumberOfUsers: await getNumberOfUsersForSsr(),
      ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18NextConfig)),
    },
  };
};
