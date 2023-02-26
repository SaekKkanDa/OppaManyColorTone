import { ThemeProvider } from 'styled-components';
import AppRouter from './Router';
import GlobalStyle from '@Styles/GlobalStyle';
import theme from '@Styles/theme';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
