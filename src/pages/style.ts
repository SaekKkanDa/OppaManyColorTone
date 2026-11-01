import styled, { css } from 'styled-components';
import SiteFooter from '@Components/SiteFooter';
import { Button, flexCustom } from '@Styles/theme';

export const bgColor = '#2f2f37';

export const PageWrapper = styled.div`
  width: 100%;
  scroll-snap-type: y mandatory;
`;

const preventTextSelection = css`
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  user-select: none;
`;

export const TopPage = styled.div`
  position: relative;
  width: 100%;
  height: 85dvh;
  background-color: ${bgColor};
  scroll-snap-align: start;
  ${preventTextSelection}
`;

/**
 * 첫 화면 맨 위의 보이지 않는 표시 요소.
 * 이 요소가 보이면 첫 화면으로 판단하고(참여자 수 숨김), 화살표 버튼의 스크롤 목적지로도 쓴다.
 */
export const TopSentinel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  pointer-events: none;
`;

export const TitleWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')}
  row-gap: 0.25rem;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2.1rem;
  color: ${({ theme }) => theme.gray[50]};
  text-shadow: 2px 2px 1px ${({ theme }) => theme.gray[800]};
  pointer-events: none;
  white-space: pre-line;
`;

export const LanguageButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1.5rem;
  z-index: 1;
  ${flexCustom('column', 'center', 'center')}
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.gray[200]};
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme.gray[800]};
  color: ${({ theme }) => theme.gray[200]};
  font-family: var(--font-pretendard);
  font-size: 0.75rem;
  line-height: 1;

  &:active {
    background-color: ${({ theme }) => theme.gray[800]};
    border-color: ${({ theme }) => theme.gray[300]};
    color: ${({ theme }) => theme.gray[300]};
  }
`;

export const StartButton = styled(Button)<{
  $isRunningStartTransition: boolean;
}>`
  position: fixed;
  bottom: 2.5rem;
  z-index: 1;
  && {
    background-color: ${({ theme }) => theme.gray[100]};
    color: ${({ theme, $isRunningStartTransition }) =>
      $isRunningStartTransition ? theme.gray[100] : theme.gray[900]};
    font-size: 2rem;

    &:active {
      background-color: ${({ theme }) => theme.gray[200]};
      color: ${({ theme }) => theme.gray[900]};
    }
  }

  -webkit-box-shadow: 0px 0px 20px 1px ${({ theme }) => `${theme.gray[100]}80`};
  -moz-box-shadow: 0px 0px 20px 1px ${({ theme }) => `${theme.gray[100]}80`};
  box-shadow: 0px 0px 20px 1px ${({ theme }) => `${theme.gray[100]}80`};

  transition: color 0.3s ease-in-out;
  animation: pulse 1s infinite ease-in-out alternate;
  @keyframes pulse {
    from {
      transform: scale(0.975);
    }
    to {
      transform: scale(1.025);
    }
  }
`;

export const StartTransition = styled.div<{
  $isRunningStartTransition: boolean;
}>`
  position: fixed;
  bottom: ${({ $isRunningStartTransition }) =>
    $isRunningStartTransition ? '-50vmax' : '3.75rem'};
  z-index: ${({ $isRunningStartTransition }) =>
    $isRunningStartTransition ? 10 : -1};
  width: ${({ $isRunningStartTransition }) =>
    $isRunningStartTransition ? '200vmax' : '3rem'};
  height: ${({ $isRunningStartTransition }) =>
    $isRunningStartTransition ? '200vmax' : '1.5rem'};
  border-radius: ${({ $isRunningStartTransition }) =>
    $isRunningStartTransition ? '100vmax' : '0.75rem'};
  background-color: ${({ theme }) => theme.gray[100]};

  transition: all 0.5s ease-in-out;
`;

export const ScrollButton = styled.button<{
  $isInViewBottom: boolean;
}>`
  position: absolute;
  bottom: ${({ $isInViewBottom }) => ($isInViewBottom ? '-2.5rem' : '0.5rem')};
  left: 50%;
  z-index: 1;
  translate: -50% 0;
  ${flexCustom('column', 'center', 'center')}
  padding: 0.5rem;
  color: ${({ theme }) => theme.gray[400]};
  rotate: ${({ $isInViewBottom }) => ($isInViewBottom ? '180deg' : 0)};
  transition: all 0.3s ease-in;

  &:active {
    color: ${({ theme }) => theme.gray[300]};
  }
`;

export const BottomPage = styled.div`
  position: relative;
  ${flexCustom('column', 'center', 'center')}
  row-gap: 2.5rem;
  width: 100%;
  min-height: 100dvh;
  padding: 1rem 1.5rem 7.5rem;
  background-image: ${({ theme }) =>
    `linear-gradient(to bottom, ${bgColor} 25%, ${theme.gray[600]})`};
  scroll-snap-align: end;
`;

export const UserCountMessage = styled.div<{
  $isInViewBottom: boolean;
}>`
  ${flexCustom('column', 'center', 'start')}
  row-gap: 0.75rem;
  font-size: 1.875rem;
  color: ${({ theme }) => theme.gray[300]};
  opacity: ${({ $isInViewBottom }) => ($isInViewBottom ? 1 : 0)};
  translate: ${({ $isInViewBottom }) => ($isInViewBottom ? '0 0.5rem' : 0)};
  transition: all 850ms 150ms ease-in;
`;

export const UserCountWrapper = styled.div`
  ${flexCustom('row', 'center', 'center')}
  line-height: 1rem;
`;

export const UserCount = styled.span`
  color: ${({ theme }) => theme.gray[100]};
  font-weight: 700;
  letter-spacing: 0.05rem;
  width: 6.75rem;
`;

export const MiniButtonWrapper = styled.div<{
  $isInViewBottom: boolean;
}>`
  ${flexCustom('column', 'stretch', 'center')}
  row-gap: 0.75rem;
  opacity: ${({ $isInViewBottom }) => ($isInViewBottom ? 1 : 0)};
  translate: ${({ $isInViewBottom }) => ($isInViewBottom ? '0 0.5rem' : 0)};
  pointer-events: ${({ $isInViewBottom }) =>
    $isInViewBottom ? undefined : 'auto'};
  transition: all 500ms 2000ms ease-in;
`;

export const MiniButton = styled.button`
  ${flexCustom('row', 'center', 'start')}
  column-gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.gray[200]};
  border-radius: 1.5rem;
  color: ${({ theme }) => theme.gray[200]};
  font-family: var(--font-moyamoya); /* 링크(<a>)로 쓸 때도 버튼과 같은 글꼴 */
  line-height: 1;
  text-decoration: none;

  & svg {
    flex-basis: 1rem;
  }

  &:active {
    background-color: ${({ theme }) => theme.gray[800]};
    border-color: ${({ theme }) => theme.gray[300]};
    color: ${({ theme }) => theme.gray[300]};
  }
`;

/**
 * 버튼 바로 아래에 둔다. BottomPage 의 아래 여백(7.5rem) 덕분에
 * 화면 하단에 고정된 시작 버튼에 가려지지 않는다.
 */
export const Footer = styled(SiteFooter)`
  /* BottomPage 의 row-gap(2.5rem) + 3.5rem = 버튼과 푸터 사이 6rem */
  margin-top: 3.5rem;
`;

/** 홈 맨 위의 서비스 소개 문구. 첫 화면(TopPage)과 같은 배경색 */
export const IntroTop = styled.section`
  ${flexCustom('column', 'center', 'flex-start')}
  row-gap: 2.5rem;
  width: 100%;
  /* 오른쪽 위에 고정된 언어 버튼과 겹치지 않도록 위 여백을 둔다 */
  padding: 4.5rem 1.5rem 9rem;
  background-color: ${bgColor};
  color: ${({ theme }) => theme.gray[200]};
  word-break: keep-all;
`;

export const IntroContent = styled.div`
  ${flexCustom('column', 'stretch', 'flex-start')}
  row-gap: 1rem;
  width: 100%;
  max-width: var(--viewport-max-width);
  line-height: 1.7;
`;

export const IntroTitle = styled.h2`
  color: ${({ theme }) => theme.gray[350]};
  font-size: 1.2rem;
  line-height: 1.4;
`;
