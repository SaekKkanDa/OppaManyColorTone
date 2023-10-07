import Link from 'next/link';
import { $FlexContainer, $Message, $Emoji, $HomeButton } from './style';
import emoji from 'public/images/emoji/sad-emoji-3d.png';
import { FormattedMessage } from 'react-intl';

const NotFound = () => {
  return (
    <$FlexContainer>
      <$Message>
        <FormattedMessage id="notFoundMsg" />
      </$Message>
      <$Emoji
        src={emoji.src}
        alt="sad emoji"
        width={150}
        height={150}
        priority
      />

      <Link href="/">
        <$HomeButton>
          <FormattedMessage id="restart" />
        </$HomeButton>
      </Link>
    </$FlexContainer>
  );
};

export default NotFound;
