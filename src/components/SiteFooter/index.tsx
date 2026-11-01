import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

import ROUTE_PATH from '@Constant/routePath';
import { CONTACT_EMAIL, OPERATOR_NAME } from '@Constant/site';
import theme from '@Styles/theme';

type FooterTone = 'light' | 'dark' | 'inherit';

interface SiteFooterProps {
  /** light: 밝은 배경, dark: 어두운 배경, inherit: 페이지 글자색을 따름 (배경색이 바뀌는 결과 페이지) */
  tone?: FooterTone;
  className?: string;
}

/** 서비스 소개 · 개인정보처리방침 · 문의 링크 */
function SiteFooter({ tone = 'light', className }: SiteFooterProps) {
  const { t } = useTranslation('common');

  return (
    <Footer $tone={tone} className={className}>
      <Links>
        <Link href={ROUTE_PATH.about}>{t('footer.about')}</Link>
        <Divider aria-hidden>·</Divider>
        <Link href={ROUTE_PATH.privacy}>{t('footer.privacy')}</Link>
        <Divider aria-hidden>·</Divider>
        <a href={`mailto:${CONTACT_EMAIL}`}>{t('footer.contact')}</a>
      </Links>
      <Copyright>© {OPERATOR_NAME}</Copyright>
    </Footer>
  );
}

export default SiteFooter;

const FOOTER_COLOR = {
  light: theme.gray[500],
  dark: theme.gray[200],
  inherit: 'inherit',
} as const;

const Footer = styled.footer<{ $tone: FooterTone }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.25rem;
  width: 100%;
  color: ${({ $tone }) => FOOTER_COLOR[$tone]};
  opacity: ${({ $tone }) => ($tone === 'inherit' ? 0.7 : 1)};
  font-size: ${({ theme }) => theme.font.size.xs};

  a {
    color: inherit;
  }
`;

const Links = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 0.5rem;
`;

const Divider = styled.span``;

const Copyright = styled.p``;
