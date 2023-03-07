import React from 'react';
import { Link } from 'react-router-dom';
import { $FlexContainer, $Message, $Emoji, $HomeButton } from './style';
import emoji from '../../assets/emoji/sad-emoji-3d.png';

const WrongAccessPage = () => {
  return (
    <$FlexContainer>
      <$Message>잘못된 접근입니다.</$Message>
      <$Emoji src={emoji} alt="sad emoji" />

      <Link to="/">
        <$HomeButton>처음으로</$HomeButton>
      </Link>
    </$FlexContainer>
  );
};

export default WrongAccessPage;
