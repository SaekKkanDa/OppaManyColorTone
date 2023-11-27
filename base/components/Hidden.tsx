import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';

export interface HiddenProps {
  isHidden: boolean;
  isUseVisibility?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}
export function Hidden({
  isHidden,
  isUseVisibility = false,
  style,
  children,
}: HiddenProps) {
  return (
    <HiddenContainer
      isHidden={isHidden}
      isUseVisibility={isUseVisibility}
      style={style}
    >
      {children}
    </HiddenContainer>
  );
}

const HiddenContainer = styled.div<{
  isHidden: boolean;
  isUseVisibility: boolean;
}>`
  ${({ isUseVisibility, isHidden }) =>
    isHidden && (isUseVisibility ? 'visiblity : hidden' : 'display : none')}
`;
