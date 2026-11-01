import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '@Root/next-i18next.config';
import InfoArticle, { InfoSection } from '@Components/InfoArticle';
import PageHead from '@Components/PageHead';
import TypeLinkGrid from '@Components/TypeLinkGrid';
import { COLOR_TYPES } from '@Constant/colorTypes';
import ROUTE_PATH from '@Constant/routePath';

function GuidePage() {
  const { t } = useTranslation(['guide', 'common']);

  const rawSections = t('guide.sections', {
    ns: 'guide',
    returnObjects: true,
  }) as InfoSection[];

  // "<타입 이름>: 설명" 형식의 항목은 해당 타입 상세 페이지로 연결한다.
  const typeByName = new Map(
    COLOR_TYPES.map((type) => [t(`${type}.name`, { ns: 'common' }), type])
  );
  const sections = (Array.isArray(rawSections) ? rawSections : []).map(
    (section) => ({
      ...section,
      itemLinks: section.items?.map((item) => {
        const type = typeByName.get(item.split(':')[0].trim());
        return type ? `${ROUTE_PATH.types}/${type}` : undefined;
      }),
    })
  );

  return (
    <>
      <PageHead
        title={t('meta.guideTitle', { ns: 'common' })}
        description={t('meta.guideDescription', { ns: 'common' })}
        path={ROUTE_PATH.guide}
      />
      <InfoArticle
        title={t('guide.title', { ns: 'guide' })}
        intro={t('guide.intro', { ns: 'guide' })}
        sections={sections}
      >
        <TypeLinkGrid title={t('guidePage.typeListTitle', { ns: 'common' })} />
      </InfoArticle>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? 'en',
        ['common', 'guide'],
        nextI18NextConfig
      )),
    },
  };
};

export default GuidePage;
