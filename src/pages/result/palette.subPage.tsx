import { useRef, useState } from 'react';

import * as S from './style';
import Palette from '@Components/Palette';
import { Color } from '@Data/resultColorData';
import ColorTransition, {
  ColorTransitionInstance,
} from '@Components/Transition/ColorTransition';
import { useChangeTheme } from './palette.logic';
import useCropImg from '@Hooks/useCropImg';
import { FormattedMessage } from 'react-intl';

interface PaletteSubPageProps {
  colors: Color[];
}

function PaletteSubPage({ colors }: PaletteSubPageProps) {
  const transitionRef = useRef<ColorTransitionInstance>(null);
  const [isBeforeClick, setIsBeforeClick] = useState(false);

  const cropImg = useCropImg();

  const changeTheme = useChangeTheme();
  const onClickPalette = (color: string) => {
    setIsBeforeClick(true);
    transitionRef.current?.play(color);
    changeTheme(color);
  };

  return (
    <>
      <S.PaletteWrapper>
        {!isBeforeClick && (
          <S.InteractionInfo>
            <FormattedMessage id="interactionInfo" />
          </S.InteractionInfo>
        )}
        <Palette imgSrc={cropImg} colors={colors} onClick={onClickPalette} />
      </S.PaletteWrapper>
      <ColorTransition ref={transitionRef} />
    </>
  );
}

export default PaletteSubPage;
