import { ThemeProvider } from 'styled-components';
import AppRouter from './Router';
import GlobalStyle from '@Styles/GlobalStyle';
import theme from '@Styles/theme';

function App() {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <AppRouter />
            </ThemeProvider>
        </>
    );
}

export default App;
