// 전역 CSS side-effect import (예: '@fortawesome/fontawesome-svg-core/styles.css') 용 타입 선언.
// TS 의 noUncheckedSideEffectImports 가 켜진 환경(최신 TS / 에디터 내장 TS)에서 TS2307 을 막는다.
declare module '*.css';
