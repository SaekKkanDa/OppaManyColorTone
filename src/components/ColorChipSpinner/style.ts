import Image from 'next/image';
import styled from 'styled-components';

export const ImgSpinnerWrap = styled.div`
  position: relative;
  width: 240px;
  height: 240px;
  display: inherit;
`;

export const ColorChipImg = styled(Image)`
  width: 240px;
  height: 240px;
  animation: spinner 12s infinite linear;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ThinkImg = styled(Image)`
  max-width: 80px;
  max-height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
