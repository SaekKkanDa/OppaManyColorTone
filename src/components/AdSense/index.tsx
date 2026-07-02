import { LegacyRef, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export interface AdSenseProps {
  'data-ad-slot': string;
}

const UNFILLED_CHECK_DELAY_MS = 3000;

export function AdSense(props: AdSenseProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const [isUnfilled, setIsUnfilled] = useState(false);

  useEffect(() => {
    if (!adRef.current) return;

    try {
      if (adRef.current.innerHTML.trim() === '') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense error', e);
    }

    const timer = setTimeout(() => {
      const status = adRef.current?.getAttribute('data-ad-status');
      if (status === 'unfilled' || adRef.current?.innerHTML.trim() === '') {
        setIsUnfilled(true);
      }
    }, UNFILLED_CHECK_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  if (isUnfilled) return null;

  return (
    <ins
      ref={adRef as LegacyRef<HTMLModElement>}
      className="adsbygoogle"
      style={{
        display: 'block',
        width: '100%',
        minHeight: '100px',
      }}
      data-ad-client="ca-pub-9551977219354865"
      data-ad-format="auto"
      data-full-width-responsive="true"
      {...props}
    />
  );
}
