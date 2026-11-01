import React from 'react';
import styled from 'styled-components';
import useViewportHeight from '@Hooks/useViewportHeight';
import { useRecoilValue } from 'recoil';
import {
  globalBgColorAtom,
  globalTextColorAtom,
} from '@Recoil/globalStyleStore';

interface MobileLayoutProps {
  backgroundColor: string;
  textColor: string;
}

const Wrapper = styled.div<MobileLayoutProps>`
  margin: 0 auto;
  width: 100%;
  max-width: var(--viewport-max-width);
  min-height: 100dvh;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
`;

function MobileLayout({ children }: React.PropsWithChildren) {
  const bgColor = useRecoilValue(globalBgColorAtom);
  const textColor = useRecoilValue(globalTextColorAtom);
  useViewportHeight();

  return (
    <Wrapper as="main" backgroundColor={bgColor} textColor={textColor}>
      {children}
    </Wrapper>
  );
}

export default MobileLayout;
