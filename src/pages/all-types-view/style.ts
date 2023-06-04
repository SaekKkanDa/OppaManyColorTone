import styled from 'styled-components';
import { flexCustom } from '@Styles/theme';
import { PieChart } from 'react-minimal-pie-chart';

type PaletteGridItemProps = {
  backgroundColor: string;
};

type TagStyleProps = {
  backgroundColor: string;
  textColor: string;
};

export const $Wrapper = styled.div`
  ${flexCustom('column', 'center', 'flex-start')}
  width: 100%;
  max-width: 400px;
  height: 100%;
  padding: 32px;
  margin: 0 auto;
`;

export const $BackButton = styled.button`
  align-self: flex-start;
  margin: -8px 0 0 -8px;
  font-size: 20px;
  cursor: pointer;
`;

export const $SubTitle = styled.span`
  color: ${({ theme }) => theme.gray[300]};
`;

export const $Title = styled.h1`
  padding-top: 16px;
  font-size: 1.6rem;
`;

export const $PieChart = styled(PieChart)`
  max-height: calc(400px - 32px * 2);
  margin: 32px 0;
`;

export const $ColorTypeTitle = styled.h3`
  color: ${({ color }) => color};
  font-size: 1.4rem;
`;

export const $TagWrapper = styled.div`
  ${flexCustom('row', 'center', 'center')}
  flex-wrap: wrap;
  column-gap: 4px;
  row-gap: 6px;
  padding: 20px 0;
`;

export const $Tag = styled.span<TagStyleProps>`
  ${flexCustom('row', 'flex-start', 'flex-start')}
  padding: 0.5em;
  border-radius: 1em;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ theme, textColor }) =>
    ({ light: theme.white, dark: theme.gray[900] }[textColor])};
  font-size: 14px;
`;

export const $PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 2px;
  width: 100%;
`;

export const $PaletteGridItem = styled.div.attrs<PaletteGridItemProps>(
  ({ backgroundColor }) => ({
    style: {
      backgroundColor,
    },
  })
)<PaletteGridItemProps>`
  aspect-ratio: 16/9;
`;

export const $Description = styled.small`
  color: ${({ theme }) => theme.gray[500]};
  font-size: 14px;
`;
