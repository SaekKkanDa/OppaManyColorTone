import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Application } from '@splinetool/runtime';

import SilentErrorBoundary from '@Components/SilentErrorBoundary';
import * as S from './style';

const Spline = dynamic(() => import('./Spline'), {
  ssr: false,
});

const INTERACTION_EVENTS = [
  'scroll',
  'pointermove',
  'pointerdown',
  'touchstart',
  'keydown',
] as const;

interface LazySplineSceneProps {
  scene: string;
  /** 3D 장면이 뜨기 전까지 보여줄 캡처 이미지. 표시 크기는 장면과 같아야 한다. */
  poster: { src: string; width: number; height: number };
  onLoad?: (app: Application) => void;
}

/**
 * Spline 3D 장면을 사용자의 첫 입력 후에 불러온다.
 * 런타임(gzip 약 1.2MB)이 무겁고 초기화 중 메인 스레드를 오래 막기 때문에 첫 로드에서 빼고,
 * 그동안 포스터를 보여준다. WebGL 을 쓸 수 없는 환경에서는 포스터가 그대로 남는다.
 */
function LazySplineScene({ scene, poster, onLoad }: LazySplineSceneProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const startLoading = () => setShouldLoad(true);
    // scroll 은 버블링되지 않아서, 내부 스크롤 영역까지 잡도록 capture 로 듣는다
    const options = { capture: true, passive: true };

    INTERACTION_EVENTS.forEach((event) =>
      window.addEventListener(event, startLoading, options)
    );

    return () => {
      INTERACTION_EVENTS.forEach((event) =>
        window.removeEventListener(event, startLoading, options)
      );
    };
  }, []);

  const handleLoad = (app: Application) => {
    onLoad?.(app);
    setIsLoaded(true);
  };

  return (
    <>
      {shouldLoad && (
        <SilentErrorBoundary>
          <Spline
            scene={scene}
            style={{ width: '100%', height: '100%' }}
            onLoad={handleLoad}
          />
        </SilentErrorBoundary>
      )}
      <S.PosterWrapper $isHidden={isLoaded}>
        <S.Poster
          src={poster.src}
          width={poster.width}
          height={poster.height}
          alt=""
          fetchPriority="high"
        />
      </S.PosterWrapper>
    </>
  );
}

export default LazySplineScene;
