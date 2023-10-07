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

export default class MyDcoument extends Document {
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
          {/* og tag */}
          <meta property="og:title" content="오빠 톤 많아?" />
          <meta property="og:image" content="/preview/og-image.png" />
          <meta property="og:url" content="https://omct.web.app" />
          <meta property="og:description" content="퍼스널 컬러 자가진단" />

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
