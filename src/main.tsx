import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

const { VITE_SENTRY_DSN, VITE_RELEASE_VERSION } = import.meta.env;

Sentry.init({
  dsn: VITE_SENTRY_DSN,

  // Alternatively, use `process.env.npm_package_version` for a dynamic release version
  // if your build tool supports it.
  release: VITE_RELEASE_VERSION,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
