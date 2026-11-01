import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '@Root/next-i18next.config';
import InfoArticle, { InfoSection } from '@Components/InfoArticle';
import PageHead from '@Components/PageHead';
import ROUTE_PATH from '@Constant/routePath';

function AboutPage() {
  const { t } = useTranslation(['legal', 'common']);

  const sections = t('about.sections', {
    ns: 'legal',
    returnObjects: true,
  }) as InfoSection[];

  return (
    <>
      <PageHead
        title={t('meta.aboutTitle', { ns: 'common' })}
        description={t('meta.aboutDescription', { ns: 'common' })}
        path={ROUTE_PATH.about}
      />
      <InfoArticle
        title={t('about.title', { ns: 'legal' })}
        intro={t('about.intro', { ns: 'legal' })}
        sections={Array.isArray(sections) ? sections : []}
      >
        <p>
          <Link href={ROUTE_PATH.guide}>
            {t('homeIntro.guideLink', { ns: 'common' })}
          </Link>
        </p>
      </InfoArticle>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? 'en',
        ['common', 'legal'],
        nextI18NextConfig
      )),
    },
  };
};

export default AboutPage;
