import styled from 'styled-components';

export const $Indicator = styled.div`
  width: 36px;
  height: 36px;
  animation: spinner 3s infinite linear;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  img {
    width: 100%;
    height: 100%;
  }
`;
