import React, { useImperativeHandle, useRef, useState } from 'react';
import { CurvePath, ViewBox } from '@Utils/svgExtenstion';
import * as S from './style';

// HJ TODO: 방향 설정할 수 있게 추가
interface ColorTransitionProps {
  onStart?: () => void;
  onEnd?: () => void;
}

export interface ColorTransitionInstance {
  play: (color: string) => void;
}

// configure for animation
// HJ TODO: 분리 해야할까?

// view box
const minX = 0;
const minY = 0;
const width = 100;
const height = 20;

// curve angle
const angleX = 25;
const angleY = 20;

// animation
const curveDuration = 1;
const fadeInDuration = 2;

const viewBox: ViewBox = {
  minX,
  minY,
  width,
  height,
};

const beforeCurve: CurvePath = {
  viewBox,
  line1: {
    from: { x: minX, y: angleY },
    to: { x: angleX, y: minY },
  },

  line2: {
    from: { x: width - angleX, y: minY },
    to: { x: width, y: angleY },
  },
};

const afterCurve: CurvePath = {
  viewBox,
  line1: {
    from: { x: minX, y: minY },
    to: { x: minX, y: minY },
  },

  line2: {
    from: { x: width - angleX, y: minY },
    to: { x: width, y: minY },
  },
};

// HJ TODO: 트랜지션 후 배경 + 폰트 색 변경
const ColorTransition = React.forwardRef<
  ColorTransitionInstance,
  ColorTransitionProps
>(({ onStart, onEnd }, ref) => {
  const onStartRef = useRef(onStart);
  const onEndRef = useRef(onEnd);

  const [isPlay, setIsPlay] = useState(false);
  const [color, setColor] = useState('');

  useImperativeHandle(ref, () => {
    return {
      play(color: string) {
        if (isPlay) return;

        setIsPlay(true);
        setColor(color);
        onStartRef.current?.();
        setTimeout(() => {
          setIsPlay(false);
          onEndRef.current?.();
        }, Math.max(curveDuration, fadeInDuration) * 1000);
      },
    };
  });

  if (isPlay == false) return <></>;

  return (
    <S.Wrapper animationDuration={fadeInDuration}>
      <S.UpperSvg
        viewBox={`${minX} ${minY} ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <S.UpperPath
          fill={color}
          beforeCurve={beforeCurve}
          afterCurve={afterCurve}
          animationDuration={curveDuration}
        />
      </S.UpperSvg>
      <S.CenterRect backgroundColor={color} />
      <S.BottomSvg
        viewBox={`${minX} ${minY} ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <S.BottomPath
          fill={color}
          beforeCurve={beforeCurve}
          afterCurve={afterCurve}
          animationDuration={curveDuration}
          animationDelay={fadeInDuration}
        />
      </S.BottomSvg>
    </S.Wrapper>
  );
});

ColorTransition.displayName = 'ColorTransition';

export default ColorTransition;
