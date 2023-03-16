import React from 'react';
import indicatorImg from '@Assets/icon/color-spinner.png';
import { $Indicator } from './style';

function LoadingIndicator() {
  return (
    <$Indicator>
      <img src={indicatorImg} alt="loading" />
    </$Indicator>
  );
}

export default LoadingIndicator;
