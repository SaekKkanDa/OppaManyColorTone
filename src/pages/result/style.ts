import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { BorderedButton, flexCustom } from '@Styles/theme';
import checkIcon from 'public/images/icon/check.png';

interface ColorItemStyleProps {
  backgroundColor: string;
}

export const Wrapper = styled.div`
  ${flexCustom('column', 'inherit', 'flex-start')}
  width: 100%;
`;

export const MainWrapper = styled.div`
  ${flexCustom('column', 'center', 'flex-start')}
  row-gap: 1.5rem;
`;

export const ResultContainer = styled.div`
  ${flexCustom('column', 'inherit', 'flex-start')}
  row-gap: 2.5rem;
  padding: 2rem 1.5rem;
`;

export const LoadingWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')}
  max-width: var(--viewport-max-width);
  margin: 0 auto;
`;

export const Title = styled.h1`
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.font.size['2xl']};
  text-align: center;
`;

export const Description = styled.ul`
  ${flexCustom('column', 'flex-start', 'flex-start')}
  row-gap: 0.5em;
  font-size: 14px;
  text-align: justify;
  color: ${({ theme }) => theme.gray[700]};
  letter-spacing: -0.02em;

  li {
    padding-left: 1rem;
    background: url(${checkIcon.src}) 0 0.4em / 10px 10px no-repeat;
  }
`;

export const SubDescriptionWrapper = styled.div`
  ${flexCustom('column', 'initial', 'initial')}
  row-gap: 1rem;
`;

export const SubDescriptionTitle = styled.h2`
  ${flexCustom('row', 'baseline', 'start')}
  column-gap: 0.5rem;
  font-size: ${({ theme }) => theme.font.size.xl};
  color: ${({ theme }) => theme.gray[900]};
`;

export const SubDescriptionTitleHighlighted = styled.span`
  font-size: ${({ theme }) => theme.font.size['1.5xl']};
  color: ${({ color }) => color};
`;

export const ColorMatchButton = styled.button`
  ${flexCustom('column', 'initial', 'initial')}
  row-gap: 1rem;
`;

export const ColorMatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 6px;
  width: 100%;
`;

export const ColorMatchGridItem = styled.div<ColorItemStyleProps>`
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
`;

export const CelebritiesWrapper = styled.div`
  ${flexCustom('row', 'inherit', 'space-around')};
`;

export const CelebrityWrapper = styled.div`
  ${flexCustom('column', 'inherit', 'inherit')};
`;

export const CelebrityImage = styled(Image)`
  width: 92px;
  height: 92px;
`;

export const CelebrityName = styled.div`
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.gray[600]};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: 500;
  text-align: center;
`;

// palette
export const PaletteWrapper = styled.div`
  position: relative;
  ${flexCustom('row', 'flex-start', 'center')}
  width: 100%;
  aspect-ratio: 1/1;
`;

const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

export const InteractionInfo = styled.div`
  position: absolute;
  top: 15px;
  animation: ${blink} 1.5s linear infinite;
  color: white;
  font-size: ${({ theme }) => theme.font.size.sm};
`;

// share
export const MenuContainer = styled.div`
  ${flexCustom('row', 'center', 'center')}
  column-gap: 1.5rem;
  padding: 1.5rem 0;
`;

export const MenuItemWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')}
`;

export const MenuItemButton = styled.button`
  ${flexCustom('column', 'center', 'center')}
  padding: 10px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.gray[800]};
  aspect-ratio: 1/1;
  font-size: 48px;
  cursor: pointer;

  svg {
    width: 100%;
  }
`;

export const KakaoShareButton = styled.button`
  ${flexCustom('column', 'center', 'center')}
  width: 48px;
  height: 48px;
  border-radius: 50%;
  aspect-ratio: 1/1;
  cursor: pointer;
`;

export const MenuItemImg = styled(Image)`
  max-width: 100%;
`;

export const MenuItemName = styled.div`
  margin-top: 0.25rem;
  text-align: center;
  font-size: ${({ theme }) => theme.font.size.xs};
`;

export const ButtonWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')}
  row-gap: 0.5rem;
  padding: 1.5rem 1.5rem 0.75rem;
`;

export const AllTypesButton = BorderedButton;
