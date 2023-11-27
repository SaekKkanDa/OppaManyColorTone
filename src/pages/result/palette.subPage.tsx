import { useRef } from 'react';

import * as S from './style';
import Palette from '@Components/Palette';
import { Color } from '@Data/resultColorData';
import ColorTransition, {
  ColorTransitionInstance,
} from '@Components/Transition/ColorTransition';
import { useChangeTheme } from './palette.logic';
import useCropImg from '@Hooks/useCropImg';
import { FormattedMessage } from 'react-intl';
import { useTrigger } from '@Base/hooks/useTrigger';

interface PaletteSubPageProps {
  colors: Color[];
}

function PaletteSubPage({ colors }: PaletteSubPageProps) {
  const transitionRef = useRef<ColorTransitionInstance>(null);
  const { isTriggered: isBeforeClick, trigger } = useTrigger({});
  const changeTheme = useChangeTheme();

  const cropImg = useCropImg();

  const onClickPalette = (color: string) => {
    !isBeforeClick && trigger();
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
