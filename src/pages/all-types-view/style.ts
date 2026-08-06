import styled from 'styled-components';
import { flexCustom, layout } from '@Styles/theme';

type PaletteGridItemProps = {
  backgroundColor: string;
};

type TagStyleProps = {
  backgroundColor: string;
  textColor: string;
};

export const Wrapper = styled.div`
  ${layout}
  ${flexCustom('column', 'center', 'flex-start')}
`;

export const BackButton = styled.button`
  align-self: flex-start;
  margin: -0.75rem 0 0 -0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  color: ${({ theme }) => theme.gray[700]};
  cursor: pointer;
`;

export const SubTitle = styled.span`
  color: ${({ theme }) => theme.gray[300]};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.font.size['1.5xl']};
`;

export const TabList = styled.div`
  ${flexCustom('row', 'center', 'center')}
  gap: 0.5rem;
  margin-top: 1rem;
`;

type TabButtonProps = {
  $isActive: boolean;
};

export const TabButton = styled.button<TabButtonProps>`
  padding: 0.5rem 1.75rem;
  border-radius: 999px;
  border: 1px solid
    ${({ theme, $isActive }) => ($isActive ? theme.gray[800] : theme.gray[300])};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.gray[800] : 'transparent'};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.white : theme.gray[600]};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 500)};
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease,
    border-color 160ms ease;
`;

export const ColorTypeWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')}
  row-gap: 1rem;
  width: 100%;
`;

export const ColorTypeTitle = styled.h3`
  color: ${({ color }) => color};
  font-size: 1.4rem;
`;

export const TagWrapper = styled.div`
  ${flexCustom('row', 'center', 'center')}
  flex-wrap: wrap;
  column-gap: 4px;
  row-gap: 6px;
  padding: 20px 0;
`;

export const Tag = styled.span<TagStyleProps>`
  ${flexCustom('row', 'flex-start', 'flex-start')}
  padding: 0.5em;
  border-radius: 1em;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ theme, textColor }) =>
    ({ light: theme.white, dark: theme.gray[900] }[textColor])};
  font-size: 14px;
`;

export const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 2px;
  width: 100%;
`;

export const PaletteGridItem = styled.div.attrs<PaletteGridItemProps>(
  ({ backgroundColor }) => ({
    style: {
      backgroundColor,
    },
  })
)<PaletteGridItemProps>`
  aspect-ratio: 16/9;
`;

export const Description = styled.small`
  color: ${({ theme }) => theme.gray[500]};
  font-size: 14px;
`;
