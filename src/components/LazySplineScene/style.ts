import styled from 'styled-components';

/** 3D 장면은 화면 크기와 상관없이 중앙 기준으로 같은 크기로 그려져서, 포스터도 중앙에 고정 크기로 둔다 */
export const PosterWrapper = styled.div<{ $isHidden: boolean }>`
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
  transition: opacity 0.3s ease-out;
  pointer-events: none;
`;

// styled-components 가 fetchPriority 를 걸러내서 그대로 넘기도록 지정한다
export const Poster = styled.img.withConfig({
  shouldForwardProp: () => true,
})`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: none;
  translate: -50% -50%;
`;
