import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ModalContainer, ModalBackground, Button } from '@Styles/theme';

interface AlertModalProps {
  alertModal: string;
  setAlertModal: React.Dispatch<React.SetStateAction<string>>;
}
function AlertModal({ alertModal, setAlertModal }: AlertModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    alertModal ? setIsModalOpen(true) : setIsModalOpen(false);
  }, [alertModal]);

  return (
    <ModalContainer isModalOpen={isModalOpen}>
      <ModalBackground />
      <Modal>
        <h1>{alertModal}</h1>
        <Button
          onClick={() => {
            setAlertModal('');
          }}
        >
          닫기
        </Button>
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
  h1 {
    line-height: 1.2;
  }
  button {
    font-size: 20px;
  }
`;
