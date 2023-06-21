import styled, { keyframes } from 'styled-components';
import { CurvePath, curveToString } from '@Utils/svgExtenstion';

const CurveFadeUp = keyframes`
  0% {
    transform: translateY(75%);
  }

  100% {
    transform: translateY(-100%);
  }
`;

const CurveTop = (beforeCurve: CurvePath, afterCurve: CurvePath) => keyframes`
  0% {
    d: path('${curveToString(afterCurve, false)}')
  }

  50% {
    d: path('${curveToString(beforeCurve, false)}')
  }

  100% {
    d: path('${curveToString(afterCurve, false)}')
  }
`;

const CurveBottom = (
  beforeCurve: CurvePath,
  afterCurve: CurvePath
) => keyframes`
  0% {
    d: path('${curveToString(beforeCurve, true)}')
  }

  100% {
    d: path('${curveToString(afterCurve, true)}')
  }
`;

export const Wrapper = styled.div<{ animationDuration: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;

  display: flex;
  flex-direction: column;

  animation: ${CurveFadeUp} ${(props) => props.animationDuration}s
    cubic-bezier(0.68, -0.01, 0.38, 0.99) forwards;
`;

export const UpperPath = styled.path<{
  beforeCurve: CurvePath;
  afterCurve: CurvePath;
  animationDuration: number;
}>`
  d: path('${(props) => curveToString(props.afterCurve, false)}');

  animation: ${(props) => props.animationDuration}s
    ${(props) => CurveTop(props.beforeCurve, props.afterCurve)} 0s
    cubic-bezier(0.68, -0.01, 0.38, 0.99) forwards;
`;

export const UpperSvg = styled.svg`
  display: block;
`;

export const CenterRect = styled.div<{ backgroundColor: string }>`
  display: block;
  flex-grow: 1;
  background-color: ${(props) => props.backgroundColor};
`;

export const BottomPath = styled.path<{
  beforeCurve: CurvePath;
  afterCurve: CurvePath;
  animationDuration: number;
  animationDelay: number;
}>`
  d: path('${(props) => curveToString(props.afterCurve, true)}');

  animation: ${(props) => props.animationDuration}s
    ${(props) => CurveBottom(props.beforeCurve, props.afterCurve)}
    ${(props) => props.animationDelay / 2}s
    cubic-bezier(0.68, -0.01, 0.38, 0.99) forwards;
`;

export const BottomSvg = styled.svg`
  display: block;
`;
