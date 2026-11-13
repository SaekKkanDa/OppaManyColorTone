import Head from 'next/head';
import { useRouter } from 'next/router';

import { SITE_NAME, SITE_URL } from '@Constant/site';

interface PageHeadProps {
  title: string;
  description?: string;
  /** 로케일 prefix 를 뺀 경로 (예: '/result?colorType=springbright'). 주면 canonical/og:url 을 만든다. */
  path?: string;
  /** 검색 색인에서 제외할 페이지 (사용자별 공유 링크, 진단 진행 화면 등) */
  noindex?: boolean;
}

/**
 * 페이지별 title / description / canonical 을 설정한다.
 * `_app` 의 기본값과 같은 `key` 를 써서 페이지 값이 기본값을 덮어쓴다.
 */
function PageHead({ title, description, path, noindex }: PageHeadProps) {
  const { locale, locales = [], defaultLocale } = useRouter();

  const toUrl = (targetLocale?: string) => {
    if (path === undefined) return undefined;
    const prefix =
      targetLocale && targetLocale !== defaultLocale ? `/${targetLocale}` : '';
    return `${SITE_URL}${prefix}${path === '/' ? '' : path}`;
  };
  const url = toUrl(locale);
  const siteName = SITE_NAME[locale ?? ''] ?? SITE_NAME.en;

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:site_name" property="og:site_name" content={siteName} />
      {description && (
        <>
          <meta key="description" name="description" content={description} />
          <meta
            key="og:description"
            property="og:description"
            content={description}
          />
        </>
      )}
      {url && (
        <>
          <link key="canonical" rel="canonical" href={url} />
          <meta key="og:url" property="og:url" content={url} />
        </>
      )}
      {/* 같은 페이지의 언어판을 알려서, 한국어 검색에 /ko 가 나오게 한다 */}
      {url &&
        !noindex &&
        [...locales, 'x-default'].map((hreflang) => (
          <link
            key={`alternate-${hreflang}`}
            rel="alternate"
            hrefLang={hreflang}
            href={toUrl(hreflang === 'x-default' ? defaultLocale : hreflang)}
          />
        ))}
      {noindex && <meta key="robots" name="robots" content="noindex" />}
    </Head>
  );
}

export default PageHead;
