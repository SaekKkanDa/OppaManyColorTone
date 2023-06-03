import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import MobileLayout from '@Components/Layout/MobileLayout';
import GlobalStyle from '@Styles/GlobalStyle';
import theme from '@Styles/theme';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>오빠 톤 많아? 퍼스널 컬러 자가진단</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9551977219354865"
          crossOrigin="anonymous"
        />
      </Head>

      <RecoilRoot>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <MobileLayout>
            <Component {...pageProps} />
          </MobileLayout>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
