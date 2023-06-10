import { withSentryConfig } from '@sentry/nextjs';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['page.tsx'],
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  // HJ TODO: 학습 필요
  sentry: {
    autoInstrumentServerFunctions: false,
  },
};

/**
 * @type {import('@sentry/nextjs/types/config/types').SentryWebpackPluginOptions}>
 */
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,

  org: 'saekkkanda-m0',
  project: 'omct-next',
};

/**
 * @type {import('@sentry/nextjs/types/config/types').UserSentryOptions}>
 */
const sentryOptions = {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Transpiles SDK to be compatible with IE11 (increases bundle size)
  transpileClientSDK: true,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
};

export default withSentryConfig(
  nextConfig,
  sentryWebpackPluginOptions,
  sentryOptions
);
