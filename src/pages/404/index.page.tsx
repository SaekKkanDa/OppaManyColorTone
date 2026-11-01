import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '@Root/next-i18next.config';
import emoji from 'public/images/emoji/sad-emoji-3d.png';
import * as S from './style';

const NotFound = () => {
  const { t } = useTranslation('common');

  return (
    <S.FlexContainer>
      <S.Message>{t('notFoundMsg')}</S.Message>
      <S.Emoji
        src={emoji.src}
        alt="sad emoji"
        width={150}
        height={150}
        priority
      />

      <Link href="/">
        <S.HomeButton>{t('restart')}</S.HomeButton>
      </Link>
    </S.FlexContainer>
  );
};

// 번역을 서버에서 넣어 두지 않으면 서버 HTML과 브라우저의 문구가 달라 하이드레이션 에러가 난다.
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? 'en',
        ['common'],
        nextI18NextConfig
      )),
    },
  };
};

export default NotFound;
