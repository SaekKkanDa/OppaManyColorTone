import styled from 'styled-components';
import { flexCustom, Button } from '@Styles/theme';

export const FlexContainer = styled.div`
  ${flexCustom('column', 'center', 'center')}
  padding: 30px 20px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.gray[50]};
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

export const ScaleBox = styled.div`
  ${flexCustom('row', 'center', 'center')}
  margin-top: 16px;
`;

export const InputScale = styled.input`
  margin: 0 8px;
  width: 240px;
  border-radius: 1em;
  background-color: ${({ theme }) => theme.gray[300]};
  transition: background 450ms ease-in;
  -webkit-appearance: none;
  appearance: none;
  accent-color: ${({ theme }) => theme.gray[500]};
  cursor: ew-resize;
`;

export const Guidance = styled.p`
  margin: 24px 0;
  text-align: center;
  line-height: 1.6em;
`;

export const ConfirmButton = styled(Button)`
  width: 200px;
`;
