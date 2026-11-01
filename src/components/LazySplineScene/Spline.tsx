// @splinetool/react-spline 은 exports 에 import 조건만 있어서 next/dynamic 이 직접 불러오면
// (내부의 require.resolveWeak 때문에) 빌드가 실패한다. 이 파일을 거쳐서 동적으로 불러온다.
export { default } from '@splinetool/react-spline';
