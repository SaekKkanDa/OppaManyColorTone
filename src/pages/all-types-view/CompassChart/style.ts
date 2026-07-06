import Image from 'next/image';
import styled from 'styled-components';

import { CHART_SIZE, AVATAR_DIAMETER } from './constants';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: ${CHART_SIZE}px;
  aspect-ratio: 1 / 1;
  margin: 24px auto 16px;
`;

export const Svg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
`;

export const AvatarButton = styled.button<{
  $left: number;
  $top: number;
  $isActive: boolean;
  $accentColor: string;
}>`
  position: absolute;
  left: ${({ $left }) => `${($left / CHART_SIZE) * 100}%`};
  top: ${({ $top }) => `${($top / CHART_SIZE) * 100}%`};
  width: ${AVATAR_DIAMETER}px;
  height: ${AVATAR_DIAMETER}px;
  margin-left: ${-AVATAR_DIAMETER / 2}px;
  margin-top: ${-AVATAR_DIAMETER / 2}px;
  padding: 0;
  border: 2px solid
    ${({ $isActive, $accentColor, theme }) =>
      $isActive ? $accentColor : theme.gray[100]};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ $isActive }) =>
    $isActive
      ? '0 4px 12px rgba(0, 0, 0, 0.18)'
      : '0 1px 3px rgba(0, 0, 0, 0.08)'};
  transform: scale(${({ $isActive }) => ($isActive ? 1.12 : 1)});
  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
  cursor: pointer;
  z-index: ${({ $isActive }) => ($isActive ? 3 : 2)};

  &:hover {
    transform: scale(1.08);
    border-color: ${({ $accentColor }) => $accentColor};
    z-index: 3;
  }

  &:focus-visible {
    outline: 2px solid ${({ $accentColor }) => $accentColor};
    outline-offset: 2px;
  }
`;

export const AvatarImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const SeasonLabel = styled.div<{
  $left: number;
  $top: number;
  $color: string;
}>`
  position: absolute;
  left: ${({ $left }) => `${($left / CHART_SIZE) * 100}%`};
  top: ${({ $top }) => `${($top / CHART_SIZE) * 100}%`};
  transform: translate(-50%, -50%);
  color: ${({ $color }) => $color};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1;
`;
