import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import SiteFooter from '@Components/SiteFooter';
import { flexCustom, layout } from '@Styles/theme';

interface ColorProps {
  $color: string;
}

export const Wrapper = styled.div`
  ${layout}
  ${flexCustom('column', 'stretch', 'flex-start')}
  row-gap: 2rem;
  color: ${({ theme }) => theme.gray[800]};
  font-size: ${({ theme }) => theme.font.size.md};
  line-height: 1.7;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

export const Breadcrumb = styled.nav`
  ${flexCustom('row', 'center', 'flex-start')}
  column-gap: 0.375rem;
  color: ${({ theme }) => theme.gray[500]};
  font-size: ${({ theme }) => theme.font.size.sm};

  a {
    color: inherit;
    text-decoration: underline;
  }
`;

export const Header = styled.header`
  ${flexCustom('column', 'center', 'flex-start')}
  row-gap: 0.25rem;
  text-align: center;
`;

export const Title = styled.h1<ColorProps>`
  color: ${({ $color }) => $color};
  font-size: ${({ theme }) => theme.font.size['2xl']};
  line-height: 1.3;
`;

export const Summary = styled.p`
  color: ${({ theme }) => theme.gray[600]};
`;

export const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  width: 100%;
`;

export const PaletteGridItem = styled.div.attrs<ColorProps>(({ $color }) => ({
  style: { backgroundColor: $color },
}))<ColorProps>`
  aspect-ratio: 16/9;
`;

export const Section = styled.section`
  ${flexCustom('column', 'stretch', 'flex-start')}
  row-gap: 0.75rem;
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.gray[900]};
  font-size: ${({ theme }) => theme.font.size.lg};
  line-height: 1.4;
`;

export const Paragraph = styled.p``;

export const List = styled.ul`
  ${flexCustom('column', 'stretch', 'flex-start')}
  row-gap: 0.5rem;
  padding-left: 1.25rem;
  list-style: disc;
`;

export const Swatches = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 6px;
  width: 100%;
`;

export const Swatch = styled.div.attrs<ColorProps>(({ $color }) => ({
  style: { backgroundColor: $color },
}))<ColorProps>`
  aspect-ratio: 1/1;
  border-radius: 50%;
`;

export const Celebrities = styled.div`
  ${flexCustom('row', 'flex-start', 'space-around')}
`;

export const Celebrity = styled.figure`
  ${flexCustom('column', 'center', 'flex-start')}
  row-gap: 0.5rem;
  color: ${({ theme }) => theme.gray[600]};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: 500;
  text-align: center;
`;

export const CelebrityImage = styled(Image)`
  width: 92px;
  height: 92px;
`;

export const RelatedList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

export const RelatedLink = styled(Link)`
  ${flexCustom('column', 'flex-start', 'flex-start')}
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.gray[200]};
  border-radius: 0.75rem;
  color: inherit;
  text-decoration: none;
`;

export const RelatedLabel = styled.span`
  color: ${({ theme }) => theme.gray[500]};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

export const RelatedName = styled.span<ColorProps>`
  color: ${({ $color }) => $color};
  font-weight: 700;
`;

export const Cta = styled.section`
  ${flexCustom('column', 'center', 'flex-start')}
  row-gap: 1rem;
  padding: 2rem 0;
  border-top: 1px solid ${({ theme }) => theme.gray[200]};
  border-bottom: 1px solid ${({ theme }) => theme.gray[200]};
`;

export const CtaButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 1rem 0;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.gray[800]};
  color: ${({ theme }) => theme.white};
  font-family: var(--font-moyamoya); /* <a> 라서 위 제목과 같은 글꼴을 직접 지정 */
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  text-decoration: none;

  &:active {
    background-color: ${({ theme }) => theme.gray[900]};
  }
`;

export const SubLink = styled(Link)`
  color: ${({ theme }) => theme.gray[600]};
  font-size: ${({ theme }) => theme.font.size.sm};
  text-decoration: underline;
`;

export const Footer = styled(SiteFooter)`
  margin-top: auto;
`;
