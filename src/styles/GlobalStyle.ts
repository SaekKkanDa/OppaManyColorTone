import localFont from 'next/font/local';
import { Noto_Sans_KR } from 'next/font/google';
import { createGlobalStyle } from 'styled-components';
import ResetStyle from './resetStyle';
import theme from './theme';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

const jalnan = localFont({
  src: [
    {
      path: '../../public/fonts/JalnanOTF00.woff',
      weight: 'normal',
    },
  ],
});

const GlobalStyle = createGlobalStyle`
  ${ResetStyle}

  :root {
    --font-jalnan: ${jalnan.style.fontFamily};
    --viewport-max-width: 400px;
  }

  * {
    box-sizing: border-box;
  }

  html {
    font-family: ${notoSansKr.style.fontFamily};
  }
	
  body {
    background-color: ${theme.gray[100]};
    color: ${theme.gray[900]};
    font-size: 16px;
  }

  div#__next > div > div {
    min-height: 100dvh;
  }

  h1, h2, h3, h4, h5, h6, button {
    font-family: var(--font-jalnan);
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
