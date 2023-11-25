import { ReactElement, ReactNode, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { Hidden } from '@Base/components/Hidden';

export interface ModalBaseProps {
  backdropComponent?: ReactElement;
  children?: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export function ModalBase({
  backdropComponent = <DefaultBackdrop />,
  children,
  isOpen,
  onClose,
}: ModalBaseProps) {
  return createPortal(
    <Hidden isHidden={!isOpen}>
      <Container>
        {cloneElement(backdropComponent, { onClick: onClose })}
        {children}
      </Container>
    </Hidden>,
    document.body
  );
}

export const Container = styled.div`
  position: relative;
  height: 100%;
  max-height: 100dvh;
  overflow: hidden;
`;

export const DefaultBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #27272a;
  opacity: 0.5;
  z-index: 10;
`;
