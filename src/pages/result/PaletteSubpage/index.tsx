import React from 'react';
import * as S from './style';
import Palette from '@Components/Palette/Palette';
import { Color } from '@Data/resultColorData';

// HJ TODO: props가 맞을까 store가 맞을까?
interface PaletteSubPageProps {
  imgSrc: string;
  colors: Color[];
  onClick: (color: string) => void;
}

function PaletteSubPage({ imgSrc, colors, onClick }: PaletteSubPageProps) {
  return (
    <S.PaletteWrapper>
      <Palette imgSrc={imgSrc} colors={colors} onClick={onClick} />
    </S.PaletteWrapper>
  );
}

export default PaletteSubPage;
