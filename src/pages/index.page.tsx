import React from 'react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { CropImage } from '@Recoil/app';
import omctDb from '@Utils/omctDb';
import { canWebShare, webShare } from '@Utils/share';
import ROUTE_PATH from '@Constant/routePath';
import { copyUrl } from '@Utils/clipboard';
import questionBubble from 'public/images/icon/question-bubble.png';
import * as S from './style';
import Image from 'next/image';

const ColorImgSpinner = dynamic(
  () => import('@Components/Spinner/ColorImgSpinner'),
  {
    loading: () => <S.SpinnerLoadingArea />,
  }
);

function LandingPage() {
  const router = useRouter();

  const [numberOfUsers, setNumberOfUsers] = useState(0);

  const setUserImg = useSetRecoilState(CropImage);

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

  return (
    <>
      <S.LandingWrap>
        <S.LandingTitleDiv>
          <S.LandingTitle>
            오빠! <S.TitleHighlight>톤</S.TitleHighlight> 많아?
          </S.LandingTitle>
          <S.LandingSubTitle>퍼스널 컬러 자가진단</S.LandingSubTitle>
        </S.LandingTitleDiv>

        <S.SpinnerWrapper>
          <ColorImgSpinner />

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
          <S.UserInfoWrapper>
            <S.UserCount>
              지금까지{' '}
              {numberOfUsers ? numberOfUsers.toLocaleString() : '1,000'}
              명이 진단했어요!
            </S.UserCount>
            <S.ShareButton name="share" onClick={handleShare}>
              <FontAwesomeIcon icon={faShareFromSquare} size="2x" />
            </S.ShareButton>
          </S.UserInfoWrapper>

          <S.StartButton onClick={onClickStartButton}>시작하기</S.StartButton>
        </S.LandingBottomDiv>
      </S.LandingWrap>
    </>
  );
}

export default LandingPage;
