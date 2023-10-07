import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Indicator = styled(Image)`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  animation: loading-spinner 3s infinite linear;
  transform: translate(-50%, -50%);
  z-index: 100;

  @keyframes loading-spinner {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    50% {
      transform: translate(-50%, -50%) rotate(180deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;
