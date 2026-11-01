// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  // 운영 배포에서만 보낸다. 개발 서버(yarn dev)와 로컬 운영 빌드(localhost)의 에러는 제외
  enabled:
    process.env.NODE_ENV === 'production' &&
    !['localhost', '127.0.0.1'].includes(window.location.hostname),

  dsn: 'https://9a3b5d02657d4031b2f5f2c1b33f0e44@o4504803405332480.ingest.sentry.io/4505216542572544',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,
});

// Replay 는 번들이 커서 첫 로드에서 빼고, 페이지 로드가 끝난 뒤 유휴 시간에 불러온다.
// 그 전에 난 에러에는 리플레이가 붙지 않는다.
const loadReplay = async () => {
  try {
    const { Replay } = await import('@sentry/replay');
    Sentry.getCurrentHub()
      .getClient()
      ?.addIntegration?.(
        new Replay({
          maskAllText: true,
          blockAllMedia: true,
        })
      );
  } catch {
    // 청크를 받지 못해도 에러 수집에는 영향이 없다
  }
};

const scheduleLoadReplay = () => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadReplay);
  } else {
    setTimeout(loadReplay, 2000);
  }
};

if (Sentry.getCurrentHub().getClient()?.getOptions().enabled) {
  if (document.readyState === 'complete') {
    scheduleLoadReplay();
  } else {
    window.addEventListener('load', scheduleLoadReplay, { once: true });
  }
}
