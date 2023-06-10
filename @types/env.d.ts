declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_FIREBASE_API_KEY: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string;
    NEXT_PUBLIC_FIREBASE_APP_ID: string;

    // Kakao
    NEXT_PUBLIC_KAKAO_API_KEY: string;

    // Sentry
    NEXT_PUBLIC_SENTRY_DSN: string;

    // Common
    NEXT_PUBLIC_RELEASE_VERSION: string;
  }
}
