import React from 'react';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import choiceColorData from '../../data/choiceColorData';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { CropImage, Result } from '../../recoil/app';
import addNumberOfUsers from '@Utils/addNumberOfUsers';
import ROUTE_PATH from '@Constant/routePath';
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
  const [stageNum, setStageNum] = useState(0);
  const MAX_STAGE_NUM = 8;

  const selectedType = useRef([]);
  const userImg = useRecoilValue(CropImage);

  const navigate = useNavigate();
  const selectedColor = useMemo(() => choiceColorData[stageNum], [stageNum]);

  // 사용자 수 +1
  useEffect(() => {
    addNumberOfUsers();
  }, []);

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

  const handleNextClick = (type) => {
    selectedType.current.push(type);
    setStageNum((prev) => prev + 1);
    setResult(finalResult);

    if (stageNum === MAX_STAGE_NUM) {
      navigate({
        pathname: ROUTE_PATH.result,
        search: createSearchParams({ colorTone: finalResult }).toString(),
      });
    }
  };

  return (
    <$Wrapper>
      <$StatusBox>
        <$StatusBar
          width={`${(stageNum + 1) * (100 / choiceColorData.length)}%`}
        />
      </$StatusBox>
      <$StatusContent>
        {stageNum + 1}/{choiceColorData.length} 단계
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
