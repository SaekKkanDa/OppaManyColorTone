import React, { useState } from 'react';
import * as S from './style';
import Palette from '@Components/Palette/Palette';
import { Color } from '@Data/resultColorData';
import { FormattedMessage } from 'react-intl';

// HJ TODO: props가 맞을까 store가 맞을까?
interface PaletteSubPageProps {
  imgSrc: string;
  colors: Color[];
  onClick: (color: string) => void;
}

function PaletteSubPage({ imgSrc, colors, onClick }: PaletteSubPageProps) {
  const [isBeforeClick, setIsBeforeClick] = useState(false);

  const onClickWrapper = (color: string) => {
    setIsBeforeClick(true);
    onClick?.(color);
  };

  return (
    <S.PaletteWrapper>
      {!isBeforeClick && (
        <S.InteractionInfo>
          <FormattedMessage id="interactionInfo" />
        </S.InteractionInfo>
      )}
      <Palette imgSrc={imgSrc} colors={colors} onClick={onClickWrapper} />
    </S.PaletteWrapper>
  );
}

export default PaletteSubPage;
