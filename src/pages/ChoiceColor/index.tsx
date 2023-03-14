import React from 'react';
import { useState, useMemo } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import choiceColorData from '../../data/choiceColorData';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { CropImage, Result } from '../../recoil/app';
import useRedirectNoImage from '@Hooks/useRedirectNoImage';
import omctDb from '@Utils/omctDb';
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
  const MAX_STAGE_NUM = choiceColorData.length - 1;

  const userImg = useRecoilValue(CropImage);
  useRedirectNoImage(userImg);

  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const selectedColor = useMemo(() => choiceColorData[stageNum], [stageNum]);

  interface ITypeObject {
    [key: string]: number;
  }

  //season과 type이 몇 번씩 선택되었는지 객체로 출력 e.g {summer: 1, cool : 1 }
  const countMaxType = (arr: string[]) => {
    const result: ITypeObject = {};

    arr.forEach((str) => {
      const type = str.split(' ');

      const countedType: ITypeObject = {};

      type.forEach((type: string) => {
        if (countedType[type]) {
          countedType[type]++;
        } else {
          countedType[type] = 1;
        }
      });

      Object.entries(countedType).forEach(([type, count]) => {
        if (result[type]) {
          result[type] += count;
        } else {
          result[type] = count;
        }
      });
    });
    return result;
  };

  const seasonToneResult = countMaxType(selectedType);

  const season = ['spring', 'summer', 'autumn', 'winter'];
  const tone = ['warm', 'cool', 'bright', 'mute', 'light', 'deep'];

  //season과 tone 별로 최댓값의 key 출력
  const findMaxKey = (obj: ITypeObject, arr: string[]) => {
    let maxKey = '';
    let maxVal = 0;

    for (const key in obj) {
      if (arr.includes(key)) {
        if (obj[key] > maxVal) {
          maxVal = obj[key];
          maxKey = key;
        }
      }
    }
    return maxKey;
  };

  const maxSeason = findMaxKey(seasonToneResult, season);
  const maxTone = findMaxKey(seasonToneResult, tone);
  // console.log(maxTone, maxSeason)

  //recoil에 최종 결과값 담기
  const setResult = useSetRecoilState(Result);
  const finalResult = maxSeason + maxTone;

  const handleNextClick = (type: string) => {
    setSelectedType((prevArr) => [...prevArr, type]);
    setStageNum((prev) => prev + 1);
    if (finalResult) {
      setResult(finalResult);
    }

    if (stageNum === MAX_STAGE_NUM) {
      omctDb.addNumberOfUsers();

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
