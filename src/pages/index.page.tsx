'use client';

import { useEffect, useState } from 'react';
import { type GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@Root/next-i18next.config';
import { useSetRecoilState } from 'recoil';
import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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
import { cLocales } from '@Constant/locales';
import { withDefault } from '@Base/utils/dataExtension';

export default function Home() {
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [isInViewBottom, setIsInViewBottom] = useState(false);
  const [isRunningStartTransition, setIsRunningStartTransition] =
    useState(false);
  const router = useRouter();

  const setUserImg = useSetRecoilState(CropImage);

  const { t, i18n } = useTranslation('common');
  const currentLocale = i18n.language;

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
    const getNumberOfUsers = async () => {
      setNumberOfUsers(await omctDb.getNumberOfUsers());
    };

    getNumberOfUsers();
  }, []);

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
    if (typeof window !== 'undefined')
      scrollTo({
        top: isInViewBottom ? 0 : document.body.scrollHeight,
        behavior: 'smooth',
      });
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
      <S.TopPage>
        <S.LanguageButton onClick={handleToggleLanguage}>
          {withDefault(
            { [cLocales.ko]: 'ENG', [cLocales.en]: '한국어' }[currentLocale],
            '한국어'
          )}
        </S.LanguageButton>

        <S.TitleWrapper ref={topRef}>
          <S.Title>{t('landingTitle')}</S.Title>
          <S.Subtitle>{t('landingSubTitle')}</S.Subtitle>
        </S.TitleWrapper>

        <Spline
          scene="https://prod.spline.design/hZ8jGzxERn1B-4De/scene.splinecode"
          style={{
            width: '100%',
            height: '100%',
          }}
          onLoad={onLoadSpline}
        />

        <S.ScrollButton $isInViewBottom={isInViewBottom} onClick={handleScroll}>
          <FontAwesomeIcon icon={faChevronDown} />
        </S.ScrollButton>
      </S.TopPage>

      <S.BottomPage>
        <S.UserCountMessage ref={bottomRef} $isInViewBottom={isInViewBottom}>
          {t('userCount_1')}
          <S.UserCountWrapper>
            <S.UserCount>{userCount.toLocaleString()}</S.UserCount>
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
        </S.MiniButtonWrapper>
      </S.BottomPage>
    </S.PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18NextConfig)),
    },
  };
};
