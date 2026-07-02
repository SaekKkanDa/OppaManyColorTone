import { LegacyRef, useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export interface AdSenseProps {
  'data-ad-slot': string;
}

export function AdSense(props: AdSenseProps) {
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (!adRef.current) return;

    try {
      if (adRef.current.innerHTML.trim() === '') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense error', e);
    }
  }, []);

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
