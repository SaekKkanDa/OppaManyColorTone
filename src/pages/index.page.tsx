import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShareFromSquare,
  faLanguage,
} from '@fortawesome/free-solid-svg-icons';
import { CropImage, Locale } from '@Recoil/app';
import ColorChipSpinner from '@Components/ColorChipSpinner';
import omctDb from '@Utils/omctDb';
import { canWebShare, webShare } from '@Utils/share';
import ROUTE_PATH from '@Constant/routePath';
import { copyUrl } from '@Utils/clipboard';
import questionBubble from 'public/images/icon/question-bubble.png';
import * as S from './style';

function LandingPage() {
  const router = useRouter();

  const [numberOfUsers, setNumberOfUsers] = useState(0);

  const setUserImg = useSetRecoilState(CropImage);
  const setLocale = useSetRecoilState(Locale);

  useEffect(() => {
    const getNumberOfUsers = async () => {
      setNumberOfUsers(await omctDb.getNumberOfUsers());
    };

    getNumberOfUsers();
  }, []);

  useEffect(() => {
    setUserImg('');
  }, [setUserImg]);

  const onClickStartButton = () => {
    router.push(ROUTE_PATH.imageUpload);
  };

  const handleShare = async () => {
    if (canWebShare) return await webShare();
    await copyUrl(location.href);
  };

  const handleLocale = () => {
    setLocale((prev) => (prev === 'en-US' ? 'ko-KR' : 'en-US'));
  };

  return (
    <>
      <S.LandingWrap>
        <S.LandingTitleDiv>
          <S.LandingTitle>
            <FormattedMessage id="landingTitle_1" />{' '}
            <S.TitleHighlight>
              <FormattedMessage id="titleHighlight" />
            </S.TitleHighlight>{' '}
            <FormattedMessage id="landingTitle_2" />
          </S.LandingTitle>
          <S.LandingSubTitle>
            <FormattedMessage id="landingSubTitle" />
          </S.LandingSubTitle>
        </S.LandingTitleDiv>

        <S.SpinnerWrapper>
          <ColorChipSpinner />

          <S.AllTypesViewLink href={ROUTE_PATH.allTypesView}>
            <Image
              src={questionBubble}
              alt="thought bubble"
              width={48}
              height={48}
            />
          </S.AllTypesViewLink>
        </S.SpinnerWrapper>

        <S.LandingBottomDiv>
          <S.UserCount>
            <FormattedMessage id="userCount_1" />{' '}
            {numberOfUsers ? numberOfUsers.toLocaleString() : '1,000'}
            <FormattedMessage id="userCount_2" />
          </S.UserCount>

          <S.StartButton onClick={onClickStartButton}>
            <FormattedMessage id="startButton" />
          </S.StartButton>

          <S.IconButtonWrapper>
            <S.IconButton onClick={handleShare}>
              <FontAwesomeIcon icon={faShareFromSquare} size="2x" />
            </S.IconButton>
            <S.IconButton onClick={handleLocale}>
              <FontAwesomeIcon icon={faLanguage} size="2x" />
            </S.IconButton>
          </S.IconButtonWrapper>
        </S.LandingBottomDiv>
      </S.LandingWrap>
    </>
  );
}

export default LandingPage;
