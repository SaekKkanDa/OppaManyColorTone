import { createGlobalStyle } from 'styled-components';
import ResetStyle from './ResetStyle';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  ${ResetStyle}

  * {
    box-sizing: border-box;
  }
	
  body {
    background-color: ${theme.gray[100]};
    color: ${theme.gray[900]};
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
  }
`;

export default GlobalStyle;
