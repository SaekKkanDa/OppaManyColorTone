import { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

const theme = {
  white: '#ffffff',
  gray: {
    50: '#fafafa',
    100: '#f4f4f5',
    150: '#f1f1f3',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
};

export default theme;

export const flexCustom = (
  flexDirection: CSSProperties['flexDirection'] = 'initial',
  alignItems: CSSProperties['alignItems'] = 'center',
  justifyContent: CSSProperties['justifyContent'] = 'center'
) => css`
  display: flex;
  flex-direction: ${flexDirection};
  align-items: ${alignItems};
  justify-content: ${justifyContent};
`;

export const Button = styled.button`
  padding: 16px 0;
  width: 320px;
  max-width: 100%;
  border-radius: 20px;

  background-color: ${theme.gray[800]};
  color: ${theme.white};
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;

  &:active {
    background-color: ${theme.gray[900]};
  }

  &:disabled {
    background-color: ${theme.gray[300]};
    cursor: not-allowed;
  }
`;

export const BorderedButton = styled(Button)`
  background-color: transparent;
  border: 2px solid ${theme.gray[800]};
  color: ${theme.gray[800]};

  &:active {
    background-color: ${theme.gray[200]};
  }
`;

type ModalContainerProps = {
  isOpen: boolean;
};

export const ModalContainer = styled.div<ModalContainerProps>`
  position: relative;
  height: 100%;
  max-height: ${({ isOpen }) => (isOpen ? '100dvh' : 'none')};
  overflow: ${({ isOpen }) => (isOpen ? 'hidden' : 'auto')};
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.gray[800]};
  opacity: 0.5;
  z-index: 10;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;
