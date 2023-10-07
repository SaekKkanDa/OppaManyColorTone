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
        width={96}
        height={99}
        priority
      />
    </$ImgSpinnerWrap>
  );
}

export const $ImgSpinnerWrap = styled.div`
  position: relative;
  width: 240px;
  height: 240px;
  display: inherit;
`;

export const $ColorChipImg = styled(Image)`
  width: 240px;
  height: 240px;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ColorImgSpinner;
