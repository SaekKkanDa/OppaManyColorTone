import colorWheel from 'public/images/logo/color-wheel-3d.png';
import curiousEmoji from 'public/images/logo/curious-emoji-3d.png';
import * as S from './style';

function ColorChipSpinner() {
  return (
    <S.ImgSpinnerWrap>
      <S.ColorChipImg
        src={colorWheel.src}
        alt="color wheel"
        width={240}
        height={240}
        priority
      />
      <S.ThinkImg
        src={curiousEmoji.src}
        alt="curious emoji"
        width={96}
        height={99}
        priority
      />
    </S.ImgSpinnerWrap>
  );
}

export default ColorChipSpinner;
