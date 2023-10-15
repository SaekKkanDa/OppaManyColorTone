import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import emoji from 'public/images/emoji/sad-emoji-3d.png';
import * as S from './style';

const NotFound = () => {
  return (
    <S.FlexContainer>
      <S.Message>
        <FormattedMessage id="notFoundMsg" />
      </S.Message>
      <S.Emoji
        src={emoji.src}
        alt="sad emoji"
        width={150}
        height={150}
        priority
      />

      <Link href="/">
        <S.HomeButton>
          <FormattedMessage id="restart" />
        </S.HomeButton>
      </Link>
    </S.FlexContainer>
  );
};

export default NotFound;
