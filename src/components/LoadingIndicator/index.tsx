import React from 'react';
import Image from 'next/image';
import indicatorImg from 'public/images/icon/color-spinner.png';
import { $Indicator } from './style';

function LoadingIndicator() {
  return (
    <$Indicator>
      <Image
        src={indicatorImg.src}
        alt="loading"
        width={36}
        height={36}
        priority
      />
    </$Indicator>
  );
}

export default LoadingIndicator;
