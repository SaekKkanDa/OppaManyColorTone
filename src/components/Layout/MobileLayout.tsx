'use client';
import React from 'react';
import styled from 'styled-components';
import useViewportHeight from '@Hooks/useViewportHeight';

function MobileLayout({ children }: React.PropsWithChildren) {
  useViewportHeight();

  return <$Wrapper>{children}</$Wrapper>;
}

const $Wrapper = styled.div`
  margin: 0 auto;
`;

export default MobileLayout;
