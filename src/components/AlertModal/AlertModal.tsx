import React from 'react';
import styled from 'styled-components';
import { ModalContainer, ModalBackground, Button } from '@Styles/theme';

function AlertModal() {
  return (
    <ModalContainer isModalOpen={false}>
      <ModalBackground />
      <Modal>
        <h1>링크 복사에 실패했어요...🥲</h1>
        <Button>닫기</Button>
      </Modal>
    </ModalContainer>
  );
}

export default AlertModal;

const Modal = styled.div`
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 370px;
  border-radius: 20px;
  background-color: #e4e4e7;
  border: 2px solid #27272a;
  color: #27272a;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  font-size: 24px;
  font-weight: 500;
  button {
    font-size: 20px;
  }
`;
