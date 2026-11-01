/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    locales: ['en', 'ko'], // 지원하는 언어 목록
    defaultLocale: 'en', // 기본 언어 설정
    // localeDetection: false, // 브라우저 언어 감지 기능을 비활성화하여 직접 제어 가능
  },
  localePath: path.resolve('./public/locales'), // 번역 파일 경로
  fallbackLng: 'en', // 기본 언어 설정
  ns: ['common', 'legal', 'guide'], // 사용하는 namespace 목록 (서버에서 미리 읽어 둘 namespace. 페이지는 serverSideTranslations 로 필요한 것만 받음)
  defaultNS: 'common', // 기본 namespace
  debug: process.env.NODE_ENV === 'development',
};
