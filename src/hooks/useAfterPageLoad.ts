import { useEffect, useState } from 'react';

/**
 * 페이지 load 이벤트 이후, 브라우저가 한가할 때 true 가 된다.
 * 분석·광고 같은 서드파티 스크립트가 첫 화면 그리기(FCP/LCP)와 경쟁하지 않게 할 때 쓴다.
 */
export function useAfterPageLoad() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const markLoaded = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => setIsLoaded(true), { timeout: 2000 });
      } else {
        setTimeout(() => setIsLoaded(true), 0);
      }
    };

    if (document.readyState === 'complete') {
      markLoaded();
      return;
    }

    window.addEventListener('load', markLoaded, { once: true });
    return () => window.removeEventListener('load', markLoaded);
  }, []);

  return isLoaded;
}
