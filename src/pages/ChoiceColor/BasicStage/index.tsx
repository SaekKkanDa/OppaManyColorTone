import React from 'react';
import type { Type } from '@Data/color';
import type { ChoiceColorDataType } from '@Data/choiceColorData';
import Guidance from '../Guidance';
import {
  $StatusBox,
  $StatusBar,
  $StatusContent,
  $ColorBox,
  $Color,
} from './style';

interface BasicStageProps {
  userImg: string;
  stageNum: number;
  choiceColorData: ChoiceColorDataType[][];
  selectedColor: ChoiceColorDataType[];
  handleNextClick: (type: Type) => void;
}

function BasicStage({
  userImg,
  stageNum,
  choiceColorData,
  selectedColor,
  handleNextClick,
}: BasicStageProps) {
  return (
    <>
      <$StatusBox>
        <$StatusBar
          width={`${(stageNum + 1) * (100 / choiceColorData.length)}%`}
        />
      </$StatusBox>
      <$StatusContent>
        {stageNum + 1}/{choiceColorData.length} 단계
      </$StatusContent>

      <Guidance />

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
    </>
  );
}

export default BasicStage;
