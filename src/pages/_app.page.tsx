import Head from 'next/head';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import Script from 'next/script';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { useLoading } from '@Hooks/useLoading';
import LoadingIndicator from '@Components/LoadingIndicator';
import MobileLayout from '@Components/Layout/MobileLayout';
import GlobalStyle from '@Styles/GlobalStyle';
import theme from '@Styles/theme';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { LoadingProvider } from '@Components/Contexts/LoadingContext';

import i18nextConfig from '../../next-i18next.config';

config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => {
  const isLoading = useLoading();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* 기본값. 각 페이지의 PageHead 가 같은 key 로 덮어쓴다. */}
        <title key="title">리트머스 페이스 - 퍼스널 컬러 자가진단 테스트</title>
        <meta
          key="og:title"
          property="og:title"
          content="리트머스 페이스 - 퍼스널 컬러 자가진단"
        />
        <meta
          key="description"
          name="description"
          content="퍼스널 컬러 자가진단 온라인 무료 테스트. 내 퍼스널 컬러는 뭘까? 한 번쯤 궁금한 적 있지 않나요? 하지만 퍼스널 컬러 진단 받으러 가려면 비싸고... 귀찮죠. 내 사진 한 장으로 직접! 비용 없이 빠르고 간편하게! 나의 퍼스널 컬러를 찾아보아요."
        />
        <meta
          key="og:description"
          property="og:description"
          content="퍼스널 컬러 자가진단 온라인 무료 테스트. 내 퍼스널 컬러는 뭘까? 한 번쯤 궁금한 적 있지 않나요? 하지만 퍼스널 컬러 진단 받으러 가려면 비싸고... 귀찮죠. 내 사진 한 장으로 직접! 비용 없이 빠르고 간편하게! 나의 퍼스널 컬러를 찾아보아요."
        />
      </Head>

      {/* Google Adsense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9551977219354865"
        crossOrigin="anonymous"
      />

      {/* Google Analytics 4 + Google Tag */}
      <GoogleAnalytics gaId="G-MSP07W6675" />

      {/* Google Tag Manager */}
      <GoogleTagManager gtmId="GTM-59DR9LFK" />

      <RecoilRoot>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <LoadingProvider>
            <MobileLayout>
              {isLoading ? <LoadingIndicator /> : <Component {...pageProps} />}
            </MobileLayout>
          </LoadingProvider>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default appWithTranslation(App, i18nextConfig);
