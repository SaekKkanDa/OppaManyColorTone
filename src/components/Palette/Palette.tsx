import ColorPalette from '@Utils/colorPalette';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  imgSrc: string;
  colors: string[];
  onClick: (color: string) => void;
}

function Palette({ imgSrc, colors, onClick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onClickRef = useRef(onClick);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    const colorPalette = new ColorPalette(
      canvas,
      imgSrc,
      colors,
      false,
      onClickRef.current
    );

    let rafId = 0;
    drawColorPalette();

    function drawColorPalette() {
      rafId = requestAnimationFrame(() => {
        colorPalette.clear();
        colorPalette.draw();
        drawColorPalette();
      });
    }

    return () => {
      cancelAnimationFrame(rafId);
      colorPalette.destroy();
    };
  }, [imgSrc, colors]);

  return <$Canvas ref={canvasRef} />;
}

const $Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  border-radius: 24px;
`;

export default Palette;
