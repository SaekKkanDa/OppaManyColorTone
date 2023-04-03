import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppRouter from './Router';
import GlobalStyle from '@Styles/GlobalStyle';
import theme from '@Styles/theme';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from '@Components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <>
      <ErrorBoundary>
        <RecoilRoot>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <AppRouter />
          </ThemeProvider>
        </RecoilRoot>
      </ErrorBoundary>
    </>
  );
}

export default App;
