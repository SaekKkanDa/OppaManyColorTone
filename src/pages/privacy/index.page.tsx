import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '@Root/next-i18next.config';
import InfoArticle, { InfoSection } from '@Components/InfoArticle';
import PageHead from '@Components/PageHead';
import ROUTE_PATH from '@Constant/routePath';

function PrivacyPage() {
  const { t } = useTranslation(['legal', 'common']);

  const sections = t('privacy.sections', {
    ns: 'legal',
    returnObjects: true,
  }) as InfoSection[];

  return (
    <>
      <PageHead
        title={t('meta.privacyTitle', { ns: 'common' })}
        description={t('meta.privacyDescription', { ns: 'common' })}
        path={ROUTE_PATH.privacy}
      />
      <InfoArticle
        title={t('privacy.title', { ns: 'legal' })}
        intro={t('privacy.intro', { ns: 'legal' })}
        sections={Array.isArray(sections) ? sections : []}
        meta={t('privacy.effectiveDate', { ns: 'legal' })}
      />
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

export default PrivacyPage;
