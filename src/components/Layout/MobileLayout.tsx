'use client';
import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import {
  globalBgColorAtom,
  globalTextColorAtom,
} from '@Recoil/globalStyleStore';

function MobileLayout({ children }: React.PropsWithChildren) {
  const bgColor = useRecoilValue(globalBgColorAtom);
  const textColor = useRecoilValue(globalTextColorAtom);

  return (
    <$Wrapper backgroundColor={bgColor} textColor={textColor}>
      {children}
    </$Wrapper>
  );
}

interface MobileLayoutProps {
  backgroundColor: string;
  textColor: string;
}

const $Wrapper = styled.div<MobileLayoutProps>`
  margin: 0 auto;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
`;

export default MobileLayout;
