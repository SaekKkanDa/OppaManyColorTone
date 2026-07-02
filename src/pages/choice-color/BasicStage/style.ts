import { flexCustom } from '@Styles/theme';
import styled, { css, keyframes } from 'styled-components';

const flip = keyframes`
0% {
  transform: rotateY(0);
}
100% {
  transform: rotateY(180deg);
}
`;

const pulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(255, 200, 60, 0.6); }
  70%  { box-shadow: 0 0 0 12px rgba(255, 200, 60, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 200, 60, 0); }
`;

export const StatusWrapper = styled.div`
  ${flexCustom('column', 'stretch', 'center')}
  row-gap: 0.5rem;
`;

export const StatusBox = styled.div`
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.gray[300]};
`;

export const StatusBar = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 8px;
  background-color: ${({ theme }) => theme.gray[600]};
  border-radius: 4px;
  transition: width ease 0.5s;
`;

export const StatusContent = styled.h6`
  color: ${({ theme }) => theme.gray[600]};
  font-size: ${({ theme }) => theme.font.size.lg};
  text-align: center;
`;

export const ColorBox = styled.div`
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  cursor: pointer;
  border-radius: 8px;
`;

export const Color = styled.div<{
  color?: string;
  isSelected: boolean;
  isRecommended?: boolean;
}>`
  display: flex;
  padding: 24px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({ color }) => color};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  img {
    border-radius: 50%;
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      animation: ${flip} 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
    `}

  ${({ isRecommended, isSelected }) =>
    isRecommended &&
    !isSelected &&
    css`
      animation: ${pulse} 1.8s ease-out infinite;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
        outline: 3px solid rgba(255, 200, 60, 0.85);
        outline-offset: -3px;
      }
    `}
`;
