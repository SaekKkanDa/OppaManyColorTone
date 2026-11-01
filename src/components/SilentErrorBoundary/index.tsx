import { Component, ReactNode } from 'react';

interface SilentErrorBoundaryProps {
  children: ReactNode;
  /** 에러가 나면 대신 보여줄 내용. 기본은 아무것도 그리지 않음 */
  fallback?: ReactNode;
}

interface SilentErrorBoundaryState {
  hasError: boolean;
}

/**
 * 없어도 페이지가 동작하는 장식용 컴포넌트(예: 홈의 3D 장면)를 감싼다.
 * 안에서 에러가 나도 페이지 전체가 깨지지 않고 이 부분만 빠진다.
 * WebGL 미지원처럼 사용자 환경 때문에 나는 에러라 Sentry로 보내지 않는다.
 */
class SilentErrorBoundary extends Component<
  SilentErrorBoundaryProps,
  SilentErrorBoundaryState
> {
  state: SilentErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SilentErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default SilentErrorBoundary;
