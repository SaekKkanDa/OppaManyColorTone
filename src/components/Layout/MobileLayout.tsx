import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import useViewportHeight from '@Hooks/useViewportHeight';

function MobileLayout() {
  useViewportHeight();

  return (
    <$Wrapper>
      <Outlet />
    </$Wrapper>
  );
}

const $Wrapper = styled.div`
  margin: 0 auto;
`;

export default MobileLayout;
