import React from 'react';
import Link from 'next/link';
import { $FlexContainer, $Message, $Emoji, $HomeButton } from './style';
import emoji from 'public/images/emoji/sad-emoji-3d.png';

const NotFound = () => {
  return (
    <$FlexContainer>
      <$Message>잘못된 접근입니다.</$Message>
      <$Emoji
        src={emoji.src}
        alt="sad emoji"
        width={150}
        height={150}
        priority
      />

      <Link href="/">
        <$HomeButton>처음으로</$HomeButton>
      </Link>
    </$FlexContainer>
  );
};

export default NotFound;
