import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ModalContainer, ModalBackground, Button } from '@Styles/theme';
import { FormattedMessage } from 'react-intl';

interface AlertModalProps {
  alertModal: string;
  setAlertModal: React.Dispatch<React.SetStateAction<string>>;
  smallTextSize: boolean;
}
function AlertModal({
  alertModal,
  setAlertModal,
  smallTextSize,
}: AlertModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    alertModal ? setIsModalOpen(true) : setIsModalOpen(false);
  }, [alertModal]);

  return (
    <ModalContainer isModalOpen={isModalOpen}>
      <ModalBackground
        onClick={() => {
          setAlertModal('');
        }}
      />
      <Modal>
        {smallTextSize ? (
          <h2>
            <FormattedMessage id={alertModal} />
          </h2>
        ) : (
          <h1>
            <FormattedMessage id={alertModal} />
          </h1>
        )}

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

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  width: 100%;
  max-width: 370px;
  padding: 40px 20px;
  border: 2px solid #27272a;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.gray[200]};
  color: ${({ theme }) => theme.gray[800]};

  font-size: 24px;
  font-weight: 500;
  white-space: break-spaces;

  h1 {
    line-height: 1.2;
  }

  h2 {
    font-size: 13px;
    line-height: 1.8;
  }

  button {
    font-size: 20px;
  }
`;
