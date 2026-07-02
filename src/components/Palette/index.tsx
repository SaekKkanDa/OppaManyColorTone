import { useEffect, useRef } from 'react';
import ColorPalette from '@Utils/colorPalette';
import * as S from './style';

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

    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
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

  return <S.Canvas ref={canvasRef} />;
}

export default Palette;
