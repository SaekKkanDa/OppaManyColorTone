import styled from 'styled-components';
import { Button, flexCustom } from '@Styles/theme';

export const $LandingWrap = styled.div`
  margin: 0 auto;
  padding: 48px 0;
  max-width: 400px;
  height: 100%;
  ${flexCustom('column')}
  background-color: ${({ theme }) => theme.gray[100]};
`;

export const $LandingTitleDiv = styled.div`
  ${flexCustom('column', 'center', 'flex-end')}
  flex: 1 1 0;
`;

export const $LandingTitle = styled.h1`
  color: ${({ theme }) => theme.gray[300]};
  font-size: min(14.75vw, 52px);
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.02em;
`;

export const $TitleHighlight = styled.span`
  color: ${({ theme }) => theme.gray[700]};
`;

export const $LandingSubTitle = styled.h2`
  font-size: min(9.5vw, 32px);
  font-weight: 700;
  margin-top: 20px;
  text-align: center;
`;

export const $SpinnerWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')}
  flex: 3 1 0;
`;

export const $LandingBottomDiv = styled.div`
  ${flexCustom('column')}
`;

export const $LandingUserCountDiv = styled.div`
  font-size: min(5vw, 20px);
  font-weight: 400;
  margin-bottom: max(2vh, 20px);
`;

export const $LangingStartButton = styled(Button)`
  height: 80px;
  font-size: 40px;
  font-weight: 500;
  cursor: pointer;
`;

export const $ButtonsWrapper = styled.div`
  ${flexCustom('row', 'center', 'center')}
  column-gap: 16px;
  margin-top: 16px;
  color: ${({ theme }) => theme.gray[400]};
  font-size: 14px;
  font-weight: 400;
  /* text-decoration: underline; */
`;

export const $ShareButton = styled.button`
  padding-right: 16px;
  border-right: 1px solid ${({ theme }) => theme.gray[400]};
  font: inherit;
  color: inherit;
`;
