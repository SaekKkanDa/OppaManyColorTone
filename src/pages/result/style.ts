import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { Button, flexCustom } from '@Styles/theme';
import checkIcon from 'public/images/icon/check.png';

interface ColorItemStyleProps {
  backgroundColor: string;
}

export const Wrapper = styled.div`
  ${flexCustom('column', 'inherit', 'flex-start')}
  margin: 0 auto;
  max-width: var(--viewport-max-width);
`;

export const ResultContainer = styled.div`
  ${flexCustom('column', 'inherit', 'flex-start')}
  padding: 48px 32px 36px;
`;

export const LoadingWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')}
  row-gap: 40px;
  max-width: var(--viewport-max-width);
  margin: 0 auto;
  padding: 48px 32px 30px 36px;
`;

export const Title = styled.h1`
  ${flexCustom('column', 'center', 'center')}
  row-gap: 16px;
  font-size: min(4.5vw, 18px);
  font-weight: 700;
  text-align: center;
`;

export const TitleBold = styled.span`
  font-size: min(7.5vw, 30px);
  color: ${(props) => props.color};
`;

export const Description = styled.ul`
  ${flexCustom('column', 'flex-start', 'flex-start')}
  row-gap: 0.5em;
  margin-top: 24px;
  font-size: 14px;
  line-height: 24px;
  text-align: justify;
  letter-spacing: -0.02em;

  li {
    padding-left: 16px;
    background: url(${checkIcon.src}) 0 0.6em / 10px 10px no-repeat;
  }
`;

export const ColorMatchButton = styled.button`
  margin-top: 48px;
  cursor: pointer;
`;

export const ColorMatchTitle = styled.h2`
  ${flexCustom('row', 'baseline', 'flex-start')}
  column-gap: 12px;
  font-weight: 700;
  font-size: min(5.25vw, 21px);
`;

export const ColorMatchGrid = styled.div`
  display: grid;
  margin-top: 12px;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;

  width: 100%;
`;

export const ColorMatchGridItem = styled.div<ColorItemStyleProps>`
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
`;

export const SubDescriptionTitle = styled.h2`
  margin-top: 48px;
  font-size: min(5.25vw, 21px);
  font-weight: 700;
`;

export const SubDescriptionTitleBold = styled.span`
  color: ${(props) => props.color};
`;

export const Styling = styled(Image)`
  width: 92px;
  height: 92px;
`;

export const StylingWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')};
  margin: 12px auto 0;
  width: min(64.25vw, 257px);
  padding-top: 20px;
`;

export const CelebritiesWrapper = styled.div`
  ${flexCustom('row', 'inherit', 'space-between')};
  margin-top: 20px;
`;

export const CelebrityWrapper = styled.div`
  ${flexCustom('column', 'inherit', 'inherit')};
`;

export const CelebrityName = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.gray[600]};
  font-size: 14px;
  text-align: center;
  font-weight: 500;
  font-family: 'Noto Sans KR', sans-serif;
`;

// palette
export const PaletteWrapper = styled.div`
  position: relative;
  ${flexCustom('row', 'flex-start', 'center')}
  margin: 24px auto 0 auto;
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
  font-size: 0.9rem;
`;

// share
export const MenuContainer = styled.div`
  ${flexCustom('row', 'inherit', 'space-around')}
  padding: 36px 32px;
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
  margin-top: 4px;
  text-align: center;
  font-size: 12px;
`;

export const ButtonsWrapper = styled.div`
  ${flexCustom('row', 'center', 'center')}
  column-gap: 12px;
  padding: 0 32px 36px;

  button,
  a {
    flex: 1 1 0;
    width: 100%;
    font-size: 20px;
  }
`;

export const AllTypesButton = styled(Button)`
  border: 2px solid ${({ theme }) => theme.gray[800]};
`;
