import styled from 'styled-components';
import { flexCustom } from '@Styles/theme';

interface ColorItemStyleProps {
  backgroundColor: string;
}

export const $Wrapper = styled.div`
  ${flexCustom('column', 'inherit', 'flex-start')}
  box-sizing: border-box;
  max-width: 400px;
  margin: 0 auto;
  padding: 48px 32px 30px 36px;
`;

export const $LoadingWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')}
  box-sizing: border-box;
  max-width: 400px;
  margin: 0 auto;
  padding: 48px 32px 30px 36px;
`;

export const $Title = styled.h1`
  font-size: min(4.5vw, 18px);
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.022em;
`;

export const $TitleBold = styled.span`
  font-size: min(7.5vw, 30px);
  color: ${(props) => props.color};
`;

export const $ColorGrid = styled.div`
  margin: 24px auto 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 1px;

  width: 100%;
`;

export const $ColorGridItem = styled.div<ColorItemStyleProps>`
  aspect-ratio: 16/9;
  background-color: ${(props) => props.backgroundColor};
`;

export const $Description = styled.div`
  margin-top: 24px;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: justify;
`;

export const $ColorMatchWrapper = styled.div`
  margin-top: 48px;
`;

export const $ColorMatchTitle = styled.h2`
  font-weight: 700;
  font-size: min(5.25vw, 21px);
`;

export const $ColorMatchGrid = styled.div`
  margin-top: 12px;
  margin-bottom: 36px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;

  width: 100%;
`;

export const $ColorMatchGridItem = styled.div<ColorItemStyleProps>`
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
`;

export const $ColorMatchWorstGrid = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 1fr;
  gap: 5px;
`;

export const $SubDescriptionTitle = styled.h2`
  margin-top: 48px;
  font-size: min(5.25vw, 21px);
  font-weight: 700;
`;

export const $SubDescriptionTitleBold = styled.span`
  color: ${(props) => props.color};
`;

export const $Styling = styled.img`
  max-width: 100%;
`;

export const $StylingWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')};
  margin: 12px auto 0;
  width: min(64.25vw, 257px);
  padding-top: 20px;
`;

export const $CelebritiesWrapper = styled.div`
  ${flexCustom('row', 'inherit', 'space-between')};
  margin-top: 20px;
`;

export const $CelebrityWrapper = styled.div`
  ${flexCustom('column', 'inherit', 'inherit')};
`;

export const $CelebrityName = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.gray[600]};
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  font-family: initial;
`;

export const $MenuContainer = styled.div`
  ${flexCustom('row', 'inherit', 'space-around')}
  margin-top: 72px;
`;

export const $MenuItemWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')}
`;

export const $MenuItemButton = styled.button`
  ${flexCustom('column', 'center', 'center')}
  border-radius: 50%;
  background-color: ${({ theme }) => theme.gray[800]};
  padding: 10px;
  width: 48px;
  height: 48px;
  aspect-ratio: 1/1;
  font-size: 48px;
  cursor: pointer;

  svg {
    width: 100%;
  }
`;

export const $KakaoShareButton = styled.button`
  ${flexCustom('column', 'center', 'center')}
  border-radius: 50%;
  width: 48px;
  height: 48px;
  aspect-ratio: 1/1;
  cursor: pointer;
`;

export const $MenuItemImg = styled.img`
  max-width: 100%;
`;

export const $MenuItemName = styled.div`
  margin-top: 4px;
  text-align: center;
  font-size: 12px;
`;

export const $RestartButtonWrapper = styled.div`
  margin-top: 29px;
`;
