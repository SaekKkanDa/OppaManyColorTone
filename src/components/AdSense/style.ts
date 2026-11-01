import styled from 'styled-components';

/**
 * 표시할 광고가 없으면 구글이 data-ad-status="unfilled" 를 붙이는데, 영역 높이는 그대로 남는다.
 * 구글 스크립트가 인라인으로 display 와 height 를 넣어서 !important 로 덮어쓴다.
 */
export const AdSlot = styled.ins`
  &[data-ad-status='unfilled'] {
    display: none !important;
  }
`;
