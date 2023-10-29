import { FormattedMessage } from 'react-intl';
import { ModalContainer, ModalBackground, Button } from '@Styles/theme';
import * as S from './style';

interface AlertModalProps {
  isOpen: boolean;
  title?: string;
  textSize?: 'sm' | 'md';
  handleClose: () => void;
}

const AlertModal = ({
  isOpen,
  title,
  children,
  textSize = 'md',
  handleClose,
}: AlertModalProps & React.PropsWithChildren) => {
  return (
    <ModalContainer isOpen={isOpen}>
      <ModalBackground onClick={handleClose} />
      <S.Modal>
        {title && (
          <S.Title>
            <FormattedMessage id={title} />
          </S.Title>
        )}
        <S.Message $textSize={textSize}>{children}</S.Message>

        <Button onClick={handleClose}>
          <FormattedMessage id="confirm" />
        </Button>
      </S.Modal>
    </ModalContainer>
  );
};

export default AlertModal;
