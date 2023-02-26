import { createGlobalStyle } from 'styled-components';
import ResetStyle from './ResetStyle';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  ${ResetStyle}

  @font-face {
    font-family: 'yg-jalnan';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'yg-jalnan';
  }
	
  body {
    background-color: ${theme.gray[100]};
    color: ${theme.gray[900]};
    font-size: 16px;
  }
`;

export default GlobalStyle;
