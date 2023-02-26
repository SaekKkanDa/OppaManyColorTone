import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

function MobileLayout() {
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
