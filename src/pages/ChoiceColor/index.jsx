import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import choiceColorData from '../../data/choiceColorData';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { CropImage, Result } from '../../recoil/app';
import ROUTE_PATH from '@Constant/routePath';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import {
  $Wrapper,
  $StatusBox,
  $StatusBar,
  $StatusContent,
  $Explain,
  $ColorBox,
  $Color,
} from './style';

function ChoiceColor() {
  const [num, setNum] = useState(0);

  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const docRef = doc(db, 'numberOfUsers', 'numberOfUsers');

  const selectedType = useRef([]);
  const userImg = useRecoilValue(CropImage);

  const navigate = useNavigate();
  const selectedColor = useMemo(() => choiceColorData[num], [num]);

  // 파이어베이스로 사용자 수 가져오기
  useEffect(() => {
    getNumberOfUsers();
  }, []);

  const getNumberOfUsers = async () => {
    const docSnap = await getDoc(docRef);
    setNumberOfUsers(docSnap.data().numberOfUsers);
  };

  //selectedType 배열을 객체화하여 가장 많이 선택된 값 출력
  let result = {};
  const findMax = () => {
    selectedType.current.forEach((x) => {
      result[x] = (result[x] || 0) + 1;
    });
    return result;
  };

  //가장 많이 선택된 type 출력
  const calResult = () => {
    findMax();
    let maxValue = -Infinity;
    let maxKey = null;

    for (let key in result) {
      const value = result[key];
      if (value > maxValue) {
        maxValue = value;
        maxKey = key;
      }
    }
    return maxKey;
  };

  //recoil에 최종 결과값 담기
  const setResult = useSetRecoilState(Result);
  const finalResult = calResult();

  //이미지 초기화
  const setUserImg = useSetRecoilState(CropImage);

  const handleNextClick = (type) => {
    selectedType.current.push(type);
    setNum(num + 1);
    setResult(finalResult);
    if (num === 8) {
      setUserImg('');
      addNumberOfUsers();
      navigate({
        pathname: ROUTE_PATH.result,
        search: createSearchParams({ colorTone: finalResult }).toString(),
      });
    }
  };

  // 사용자 수 1 증가
  const addNumberOfUsers = () => {
    if (numberOfUsers) {
      setDoc(docRef, { numberOfUsers: numberOfUsers + 1 });
    }
  };

  return (
    <$Wrapper>
      <$StatusBox>
        <$StatusBar width={`${(num + 1) * (100 / choiceColorData.length)}%`} />
      </$StatusBox>
      <$StatusContent>
        {num + 1}/{choiceColorData.length} 단계
      </$StatusContent>
      <$Explain>
        얼굴과 잘 어울리는 색을 선택해주세요.
        <p>
          얼굴과 색이 하나로 이어진 것처럼 조화로워 보이고, 피부색이 균일하고
          맑아 보이는 색이 잘 어울리는 색입니다.
        </p>
      </$Explain>
      <$ColorBox>
        {selectedColor.map((item) => (
          <$Color
            key={item.id}
            color={item.color}
            onClick={() => handleNextClick(item.type)}
          >
            <img src={userImg} alt="사용자 이미지" />
          </$Color>
        ))}
      </$ColorBox>
    </$Wrapper>
  );
}

export default ChoiceColor;
