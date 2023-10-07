import Link from 'next/link';
import styled from 'styled-components';
import { Button, flexCustom } from '@Styles/theme';

export const LandingWrap = styled.div`
  ${flexCustom('column')}
  margin: 0 auto;
  padding: 48px 0;
  max-width: 400px;
  height: 100%;
  background-color: ${({ theme }) => theme.gray[100]};
`;

export const LandingTitleDiv = styled.div`
  ${flexCustom('column', 'center', 'flex-end')}
  flex: 1 1 0;
`;

export const LandingTitle = styled.h1`
  color: ${({ theme }) => theme.gray[200]};
  font-size: min(14.75vw, 52px);
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.02em;
`;

export const TitleHighlight = styled.span`
  color: ${({ theme }) => theme.gray[700]};
`;

export const LandingSubTitle = styled.h2`
  font-size: min(9.5vw, 32px);
  font-weight: 700;
  margin-top: 20px;
  text-align: center;
`;

export const SpinnerWrapper = styled.div`
  position: relative;
  ${flexCustom('column', 'center', 'center')}
  flex: 3 1 0;
`;

export const SpinnerLoadingArea = styled.div`
  width: 240px;
  height: 240px;
`;

export const AllTypesViewLink = styled(Link)`
  position: absolute;
  top: calc(50% - 80px);
  left: calc(50% + 36px);
  -webkit-animation: scale-in-out 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 2s
    alternate both infinite;
  animation: scale-in-out 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 2s alternate
    both infinite;

  @-webkit-keyframes scale-in-out {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      -webkit-transform-origin: 0% 100%;
      transform-origin: 0% 100%;
    }
    60% {
      -webkit-transform: scale(0);
      transform: scale(0);
      -webkit-transform-origin: 0% 100%;
      transform-origin: 0% 100%;
    }
    70% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: 0% 100%;
      transform-origin: 0% 100%;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: 0% 100%;
      transform-origin: 0% 100%;
    }
  }

  @keyframes scale-in-out {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      -webkit-transform-origin: 0% 100%;
      transform-origin: 0% 100%;
    }
    60% {
      -webkit-transform: scale(0);
      transform: scale(0);
      -webkit-transform-origin: 0% 100%;
      transform-origin: 0% 100%;
    }
    70% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: 0% 100%;
      transform-origin: 0% 100%;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: 0% 100%;
      transform-origin: 0% 100%;
    }
  }
`;

export const LandingBottomDiv = styled.div`
  ${flexCustom('column')}
`;

export const UserInfoWrapper = styled.div`
  ${flexCustom('row', 'center', 'center')}
  column-gap: 8px;
  margin-bottom: 20px;
`;

export const UserCount = styled.div`
  font-size: 18px;
  font-weight: 400;
`;

export const ShareButton = styled.button`
  color: ${({ theme }) => theme.gray[500]};
  font-size: 12px;

  &:active {
    color: ${({ theme }) => theme.gray[900]};
  }
`;

export const StartButton = styled(Button)`
  height: 80px;
  font-size: 40px;
  font-weight: 500;
  cursor: pointer;
`;
