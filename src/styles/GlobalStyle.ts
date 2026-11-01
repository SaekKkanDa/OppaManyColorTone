import localFont from 'next/font/local';
import { createGlobalStyle } from 'styled-components';
import ResetStyle from './resetStyle';
import theme from './theme';

const moyamoya = localFont({
  src: '../../public/fonts/Cafe24Moyamoya-Face-v1.0.woff2',
});

const GlobalStyle = createGlobalStyle`
  ${ResetStyle}

  :root {
    --font-pretendard: "Pretendard Variable";
    --font-moyamoya: ${moyamoya.style.fontFamily};
    --viewport-max-width: 430px;
  }

  * {
    box-sizing: border-box;
  }

  html {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }
	
  body {
    background-color: ${theme.gray[100]};
    color: ${theme.gray[900]};
    font-size: 16px;
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6, button {
    font-family: var(--font-moyamoya);
  }

  button {
    cursor: pointer;
    line-height: 1;
  }
`;

export default GlobalStyle;
