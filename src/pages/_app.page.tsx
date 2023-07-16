import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { useLoading } from '@Hooks/useLoading';
import LoadingIndicator from '@Components/LoadingIndicator';
import MobileLayout from '@Components/Layout/MobileLayout';
import GlobalStyle from '@Styles/GlobalStyle';
import theme from '@Styles/theme';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => {
  const isLoading = useLoading();

  return (
    <>
      <Head>
        <title>오빠 톤 많아? 퍼스널 컬러 자가진단</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <RecoilRoot>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <MobileLayout>
            {isLoading ? <LoadingIndicator /> : <Component {...pageProps} />}
          </MobileLayout>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
