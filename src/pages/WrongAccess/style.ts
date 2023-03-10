import styled from 'styled-components';
import { Button, flexCustom } from '@Styles/theme';

export const $FlexContainer = styled.div`
  ${flexCustom('column', 'center', 'center')}
  height: 100vh;
`;

export const $Message = styled.h1`
  font-size: 32px;
  text-align: center;
`;

export const $Emoji = styled.img`
  margin: 36px 0 48px;
  width: 150px;
  height: 150px;
`;

export const $HomeButton = styled(Button)`
  padding: 24px 0;
  border-radius: 24px;
  font-size: 32px;
`;
