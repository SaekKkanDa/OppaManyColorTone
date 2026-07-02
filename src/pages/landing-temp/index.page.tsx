import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useSetRecoilState } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { useCountUp } from '@Base/hooks/useCountUp';
import { CropImage } from '@Recoil/app';
import ColorChipSpinner from '@Components/ColorChipSpinner';
import omctDb from '@Utils/omctDb';
import { canWebShare, webShare } from '@Utils/share';
import ROUTE_PATH from '@Constant/routePath';
import { copyUrl } from '@Utils/clipboard';
import questionBubble from 'public/images/icon/question-bubble.png';
import * as S from './style';

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@Root/next-i18next.config';
import { cLocales } from '@Constant/locales';
import { withDefault } from '@Base/utils/dataExtension';

function LandingPage() {
  const { t, i18n } = useTranslation('common');

  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const router = useRouter();

  const setUserImg = useSetRecoilState(CropImage);

  useEffect(() => {
    const getNumberOfUsers = async () => {
      setNumberOfUsers(await omctDb.getNumberOfUsers());
    };

    getNumberOfUsers();
  }, []);

  const COUNT_UP_DURATION = 2000;
  const count = useCountUp(numberOfUsers, COUNT_UP_DURATION, true);

  useEffect(() => {
    setUserImg('');
  }, [setUserImg]);

  const onClickStartButton = () => {
    router.push(ROUTE_PATH.imageUpload);
  };

  const handleViewAllType = () => {
    router.push(ROUTE_PATH.allTypesView);
  };

  const handleShare = async () => {
    if (canWebShare) return await webShare();
    const messageId = await copyUrl(location.href);
    alert(t(`${messageId}`));
  };

  const currentLocale = i18n.language;
  const toggleLocale =
    currentLocale === cLocales.en ? cLocales.ko : cLocales.en;

  const handleToggleLanguage = () => {
    router.push(router.pathname, router.asPath, { locale: toggleLocale });
  };

  return (
    <>
      <S.LandingWrap>
        <S.LandingTitleDiv>
          <S.LandingTitle>
            {t('landingTitle_1')}{' '}
            <S.TitleHighlight>{t('titleHighlight')}</S.TitleHighlight>{' '}
            {t('landingTitle_2')}
          </S.LandingTitle>
          <S.LandingSubTitle>{t('landingSubTitle')}</S.LandingSubTitle>
        </S.LandingTitleDiv>

        <S.SpinnerWrapper>
          <ColorChipSpinner />
          <S.QuestionMark>
            <Image
              src={questionBubble}
              alt="thought bubble"
              width={48}
              height={48}
            />
          </S.QuestionMark>
        </S.SpinnerWrapper>

        <S.LandingBottomDiv>
          <S.UserCount>
            {t('userCount_1')} {count.toLocaleString()} {t('userCount_2')}
            {t('userCount_3')}
          </S.UserCount>

          <S.StartButton onClick={onClickStartButton}>
            {t('startButton')}
          </S.StartButton>

          <S.MiniButtonWrapper>
            <S.MiniButton onClick={handleViewAllType}>
              <FontAwesomeIcon icon={faPalette} />
            </S.MiniButton>
            <S.MiniButton onClick={handleToggleLanguage}>
              {withDefault(
                { [cLocales.ko]: 'ENG', [cLocales.en]: '한국어' }[
                  currentLocale
                ],
                '한국어'
              )}
            </S.MiniButton>
            <S.MiniButton onClick={handleShare}>
              <FontAwesomeIcon icon={faShareNodes} />
            </S.MiniButton>
          </S.MiniButtonWrapper>
        </S.LandingBottomDiv>
      </S.LandingWrap>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18NextConfig)),
    },
  };
};

export default LandingPage;
