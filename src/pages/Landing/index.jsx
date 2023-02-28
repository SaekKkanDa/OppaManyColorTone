import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import ColorImgSpinner from '@Components/Spinner/ColorImgSpinner';
import ROUTE_PATH from '@Constant/routePath';
import {
  $LandingWrap,
  $LandingTitleDiv,
  $LandingTitle,
  $LandingSubTitle,
  $LandingBottomDiv,
  $LandingUserCountDiv,
  $LangingStartButton,
  $LandingPersonalColorExplanationText,
} from './style';

function LandingPage() {
  const navigate = useNavigate();

  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const docRef = doc(db, 'numberOfUsers', 'numberOfUsers');

  useEffect(() => {
    getNumberOfUsers();
  }, []);

  const getNumberOfUsers = async () => {
    const docSnap = await getDoc(docRef);
    setNumberOfUsers(docSnap.data().numberOfUsers);
  };

  const onClickStartButton = () => {
    navigate(ROUTE_PATH.imageUpload);
  };

  return (
    <>
      <$LandingWrap>
        <$LandingTitleDiv>
          <$LandingTitle>오빠! 톤 많아?</$LandingTitle>
          <$LandingSubTitle>퍼스널 컬러 자가진단</$LandingSubTitle>
        </$LandingTitleDiv>
        <ColorImgSpinner />
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
