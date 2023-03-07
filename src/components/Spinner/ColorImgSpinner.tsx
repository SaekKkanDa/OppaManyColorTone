import React from 'react';
import styled from 'styled-components';
import colorWheel from '../../assets/logo/color-wheel-3d.png';
import curiousEmoji from '../../assets/logo/curious-emoji-3d.png';

function ColorImgSpinner() {
  return (
    <ImgSpinnerWrap>
      <ColorChipImg src={colorWheel} />
      <ThinkImg src={curiousEmoji} />
    </ImgSpinnerWrap>
  );
}

export const ImgSpinnerWrap = styled.div`
  position: relative;
  max-width: 240px;
  max-height: 240px;
  width: 92vw;
  height: 92vw;
  margin-top: 7vh;
  display: inherit;
`;

export const ColorChipImg = styled.img`
  max-width: 240px;
  max-height: 240px;
  width: 92vw;
  height: 92vw;
  animation: spinner 12s infinite linear;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ThinkImg = styled.img`
  max-width: 80px;
  max-height: 80px;
  width: 32vw;
  height: 32vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ColorImgSpinner;
