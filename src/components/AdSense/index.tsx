import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export interface AdSenseProps {
  'data-ad-slot': string;
}

export function AdSense(props: AdSenseProps) {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-9551977219354865"
      data-ad-format="auto"
      data-full-width-responsive="true"
      {...props}
    />
  );
}
