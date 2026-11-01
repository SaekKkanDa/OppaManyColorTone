import { readFile } from 'fs/promises';
import path from 'path';

import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '@Root/next-i18next.config';
import resultColorData, { Color } from '@Data/resultColorData';
import PageHead from '@Components/PageHead';
import Tag from '@Components/Tag';
import { COLOR_TYPES, getSeason, isColorType } from '@Constant/colorTypes';
import ROUTE_PATH from '@Constant/routePath';

import * as S from './style';

interface TypePageProps {
  colorType: ColorType;
  content: TypeContent;
}

interface TypeContent {
  summary: string;
  overview: string[];
  features: string[];
  bestColors: string[];
  avoidColors: string[];
  makeup: string[];
  fashion: string[];
  hairAndAccessories: string[];
  compare: string;
}

function TypePage({ colorType, content }: TypePageProps) {
  const { t } = useTranslation('common');

  const data = resultColorData[colorType];
  const typeName = t(`${colorType}.name`);
  const season = getSeason(colorType);

  const relatedTypes: { labelKey: string; type: ColorType }[] = [
    { labelKey: 'typePage.secondaryType', type: data.secondaryType },
    { labelKey: 'typePage.worstType', type: data.worstType },
  ];

  return (
    <S.Wrapper>
      <PageHead
        title={t('meta.typeTitle', { typeName })}
        description={content.summary}
        path={`${ROUTE_PATH.types}/${colorType}`}
      />

      <S.Breadcrumb aria-label="breadcrumb">
        <Link href={ROUTE_PATH.guide}>{t('typePage.breadcrumbGuide')}</Link>
        <span aria-hidden>›</span>
        <span>{t(`season.${season}`)}</span>
      </S.Breadcrumb>

      <S.Header>
        <S.Title $color={data.textColor}>{typeName}</S.Title>
        <Tag tags={data.tags} colorType={colorType} />
        <S.Summary>{content.summary}</S.Summary>
      </S.Header>

      <S.PaletteGrid>
        {data.gridColors.map((color, index) => (
          <S.PaletteGridItem key={color + index} $color={color} />
        ))}
      </S.PaletteGrid>

      <S.Section>
        {content.overview.map((paragraph) => (
          <S.Paragraph key={paragraph}>{paragraph}</S.Paragraph>
        ))}
      </S.Section>

      <TextListSection
        title={t('typePage.features')}
        items={content.features}
      />

      <S.Section>
        <S.SectionTitle>{t('typePage.bestColors')}</S.SectionTitle>
        <Swatches colors={data.bestColors} />
        <S.List>
          {content.bestColors.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{t('typePage.avoidColors')}</S.SectionTitle>
        <Swatches colors={data.worstColors} />
        <S.List>
          {content.avoidColors.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </S.List>
      </S.Section>

      <TextListSection title={t('typePage.makeup')} items={content.makeup} />
      <TextListSection title={t('typePage.fashion')} items={content.fashion} />
      <TextListSection
        title={t('typePage.hairAndAccessories')}
        items={content.hairAndAccessories}
      />

      <S.Section>
        <S.SectionTitle>{t('typePage.celebrities')}</S.SectionTitle>
        <S.Celebrities>
          {data.celebrities.map(({ name, imageURL }, index) => (
            <S.Celebrity key={name}>
              <S.CelebrityImage
                src={imageURL}
                alt={t(`${colorType}.celebrities.${index}`)}
                width={92}
                height={92}
              />
              <span>{t(`${colorType}.celebrities.${index}`)}</span>
            </S.Celebrity>
          ))}
        </S.Celebrities>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{t('typePage.compare')}</S.SectionTitle>
        <S.Paragraph>{content.compare}</S.Paragraph>
        <S.RelatedList>
          {relatedTypes.map(({ labelKey, type }) => (
            <li key={type}>
              <S.RelatedLink href={`${ROUTE_PATH.types}/${type}`}>
                <S.RelatedLabel>{t(labelKey)}</S.RelatedLabel>
                <S.RelatedName $color={resultColorData[type].textColor}>
                  {t(`${type}.name`)}
                </S.RelatedName>
              </S.RelatedLink>
            </li>
          ))}
        </S.RelatedList>
      </S.Section>

      <S.Cta>
        <S.SectionTitle>{t('typePage.ctaTitle')}</S.SectionTitle>
        <S.CtaButton href={ROUTE_PATH.imageUpload}>
          {t('typePage.ctaButton')}
        </S.CtaButton>
        <S.SubLink href={ROUTE_PATH.allTypesView}>
          {t('typePage.allTypes')}
        </S.SubLink>
      </S.Cta>

      <S.Footer />
    </S.Wrapper>
  );
}

function TextListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <S.Section>
      <S.SectionTitle>{title}</S.SectionTitle>
      <S.List>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </S.List>
    </S.Section>
  );
}

function Swatches({ colors }: { colors: Color[] }) {
  return (
    <S.Swatches>
      {colors.map((color, index) => (
        <S.Swatch key={color + index} $color={color} />
      ))}
    </S.Swatches>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['en'] }) => {
  return {
    paths: locales.flatMap((locale) =>
      COLOR_TYPES.map((type) => ({ params: { type }, locale }))
    ),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TypePageProps> = async ({
  params,
  locale,
}) => {
  const type = params?.type;
  if (!isColorType(type)) {
    return { notFound: true };
  }

  // types 네임스페이스는 12타입 전체라 크므로, 이 페이지의 타입 본문만 props 로 넘긴다.
  const lang = locale ?? 'en';
  const typesJson = await readFile(
    path.join(process.cwd(), 'public/locales', lang, 'types.json'),
    'utf8'
  );
  const content = (JSON.parse(typesJson) as Record<ColorType, TypeContent>)[
    type
  ];

  return {
    props: {
      colorType: type,
      content,
      ...(await serverSideTranslations(lang, ['common'], nextI18NextConfig)),
    },
  };
};

export default TypePage;
