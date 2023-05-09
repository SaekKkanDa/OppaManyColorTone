import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import colorWheel from 'public/images/logo/color-wheel-3d.png';
import curiousEmoji from 'public/images/logo/curious-emoji-3d.png';

function ColorImgSpinner() {
  return (
    <$ImgSpinnerWrap>
      <$ColorChipImg
        src={colorWheel.src}
        alt="color wheel"
        width={240}
        height={240}
        priority
      />
      <$ThinkImg
        src={curiousEmoji.src}
        alt="curious emoji"
        width={80}
        height={80}
      />
    </$ImgSpinnerWrap>
  );
}

export const $ImgSpinnerWrap = styled.div`
  position: relative;
  max-width: 240px;
  max-height: 240px;
  width: 80vw;
  height: 80vw;
  display: inherit;
`;

export const $ColorChipImg = styled(Image)`
  max-width: 240px;
  max-height: 240px;
  width: 80vw;
  height: 80vw;
  animation: spinner 12s infinite linear;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const $ThinkImg = styled(Image)`
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
