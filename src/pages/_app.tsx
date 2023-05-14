import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { ErrorBoundary } from '@sentry/react';
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
      </Head>

      <ErrorBoundary>
        <RecoilRoot>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <MobileLayout>
              <Component {...pageProps} />
            </MobileLayout>
          </ThemeProvider>
        </RecoilRoot>
      </ErrorBoundary>
    </>
  );
};

export default App;
