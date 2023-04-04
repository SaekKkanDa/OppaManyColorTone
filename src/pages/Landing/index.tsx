import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { CropImage } from '../../recoil/app';
import ColorImgSpinner from '@Components/Spinner/ColorImgSpinner';
import omctDb from '@Utils/omctDb';
import ROUTE_PATH from '@Constant/routePath';
import {
  $LandingWrap,
  $LandingTitleDiv,
  $LandingTitle,
  $TitleHighlight,
  $LandingSubTitle,
  $SpinnerWrapper,
  $LandingBottomDiv,
  $LandingUserCountDiv,
  $LangingStartButton,
  $LandingPersonalColorExplanationText,
} from './style';

function LandingPage() {
  const navigate = useNavigate();

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
    navigate(ROUTE_PATH.imageUpload);
  };

  return (
    <>
      <$LandingWrap>
        <$LandingTitleDiv>
          <$LandingTitle>
            오빠! <$TitleHighlight>톤</$TitleHighlight> 많아?
          </$LandingTitle>
          <$LandingSubTitle>퍼스널 컬러 자가진단</$LandingSubTitle>
        </$LandingTitleDiv>

        <$SpinnerWrapper>
          <ColorImgSpinner />
        </$SpinnerWrapper>

        <$LandingBottomDiv>
          {!!numberOfUsers && (
            <$LandingUserCountDiv>
              지금까지 {numberOfUsers.toLocaleString()}명이 진단했어요!
            </$LandingUserCountDiv>
          )}
          <$LangingStartButton onClick={onClickStartButton}>
            시작하기
          </$LangingStartButton>
          <$LandingPersonalColorExplanationText>
            퍼스널 컬러 설명 보기
          </$LandingPersonalColorExplanationText>
        </$LandingBottomDiv>
      </$LandingWrap>
    </>
  );
}

export default LandingPage;
