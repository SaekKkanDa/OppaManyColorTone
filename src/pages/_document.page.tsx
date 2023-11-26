import Script from 'next/script';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="application-name"
            content="오빠 톤 많아? 퍼스널 컬러 자가진단"
          ></meta>
          <meta
            name="msapplication-tooltip"
            content="오빠 톤 많아? 퍼스널 컬러 자가진단"
          ></meta>
          <meta
            name="description"
            content="퍼스널 컬러 자가진단 온라인 무료 테스트. 내 퍼스널 컬러는 뭘까? 한 번쯤 궁금한 적 있지 않나요? 하지만 퍼스널 컬러 진단 받으러 가려면 비싸고... 귀찮죠. 내 사진 한 장으로 직접! 비용 없이 빠르고 간편하게! 나의 퍼스널 컬러를 찾아보아요."
          ></meta>
          <meta
            name="keywords"
            content="퍼스널컬러,퍼스널칼라,퍼스널컬러진단,퍼스널컬러자가진단,퍼스널 컬러,퍼스널 컬러 자가 진단,퍼스널 컬러 테스트,내 퍼스널 컬러,내 퍼스널 컬러 테스트,나의 퍼스널 컬러 찾기,k테스트 퍼스널컬러,personal color,웜톤,쿨톤,봄웜톤,여름쿨톤,가을웜톤,겨울쿨톤,warm,warm tone,cool,cool tone,베스트컬러,베스트칼라,워스트컬러,워스트칼라,톤그로,톤,컬러,칼라,winter personal color,spring personal color,summer personal color,겨울 퍼스널컬러"
          ></meta>

          {/* og tag */}
          <meta
            property="og:title"
            content="오빠 톤 많아? 퍼스널 컬러 자가진단"
          />
          <meta property="og:image" content="/preview/og-image.png" />
          <meta property="og:url" content="https://omct.web.app" />
          <meta
            property="og:description"
            content="퍼스널 컬러 자가진단 온라인 무료 테스트. 내 퍼스널 컬러는 뭘까? 한 번쯤 궁금한 적 있지 않나요? 하지만 퍼스널 컬러 진단 받으러 가려면 비싸고... 귀찮죠. 내 사진 한 장으로 직접! 비용 없이 빠르고 간편하게! 나의 퍼스널 컬러를 찾아보아요."
          />
          <meta property="og:type" content="website"></meta>

          {/* Google Search Console */}
          <meta
            name="google-site-verification"
            content="O9hSb_rmNoVKpxCcnYOFgmitTDoOSeDMM8XMZTtk5L4"
          />

          {/* Naver Search Advisor */}
          <meta
            name="naver-site-verification"
            content="4be41e9a6714ed8ff418f6bfaa1eb7fcb635871c"
          />

          {/* Google Adsense */}
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9551977219354865"
            crossOrigin="anonymous"
          />

          {/* favicon: icons created by Freepik - Flaticon */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
