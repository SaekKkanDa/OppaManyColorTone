import Head from 'next/head';
import { useRouter } from 'next/router';

import { SITE_URL } from '@Constant/site';

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
  const { locale, defaultLocale } = useRouter();

  const localePrefix = locale && locale !== defaultLocale ? `/${locale}` : '';
  const url =
    path === undefined
      ? undefined
      : `${SITE_URL}${localePrefix}${path === '/' ? '' : path}`;

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="og:title" property="og:title" content={title} />
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
      {noindex && <meta key="robots" name="robots" content="noindex" />}
    </Head>
  );
}

export default PageHead;
