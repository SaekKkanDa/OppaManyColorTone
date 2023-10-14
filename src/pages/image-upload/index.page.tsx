import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { CropImage } from '@Recoil/app';
import ROUTE_PATH from '@Constant/routePath';
import AlertModal from '@Components/AlertModal/AlertModal';
import theme, { Modal, ModalBackground, ModalContainer } from '@Styles/theme';
import FaceDetection from './FaceDetection';

import * as S from './style';

function ImageUploadPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertModal, setAlertModal] = useState('');
  const imagePreviewURL = useRecoilState(CropImage)[0];

  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

  const clickInput = () => {
    inputRef.current?.click();
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
      setIsModalOpen(true);
      return;
    }
    setAlertModal('alertRetry');
  };

  return (
    <ModalContainer isModalOpen={isModalOpen}>
      {isModalOpen && imageFile ? (
        <>
          <Modal>
            <FaceDetection
              imageFile={imageFile}
              setIsModalOpen={setIsModalOpen}
              setAlertModal={setAlertModal}
            />
          </Modal>
          <ModalBackground />
        </>
      ) : null}
      {alertModal && (
        <AlertModal alertModal={alertModal} setAlertModal={setAlertModal} />
      )}

      <S.FlexContainer isModalOpen={isModalOpen}>
        <S.ImageBox>
          {imagePreviewURL ? (
            <>
              <S.CroppedImageBox
                src={imagePreviewURL}
                alt="preview image"
                width={150}
                height={150}
              />
              <S.InputFile
                ref={inputRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={selectImage}
              />
            </>
          ) : (
            <S.ImageLabel>
              <S.InputFile
                ref={inputRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={selectImage}
              />
              <FontAwesomeIcon
                icon={faUserPlus}
                size="3x"
                color={theme.gray[300]}
              />
            </S.ImageLabel>
          )}
        </S.ImageBox>

        <S.SelectImgButton onClick={clickInput}>
          <FormattedMessage id="selectImgButton" />
        </S.SelectImgButton>
        <S.Guidance>
          <FormattedMessage id="guidance" />
        </S.Guidance>
        <S.Notification>
          <h6>
            <FontAwesomeIcon icon={faFaceSmile} size="sm" />
            <FormattedMessage id="notification_1" />
          </h6>
          <FormattedMessage id="notification_2" />
          <br />
          <FormattedMessage id="notification_3" />
        </S.Notification>

        <Link href={ROUTE_PATH.choiceColor}>
          <S.NextButton disabled={!imagePreviewURL}>
            <FormattedMessage id="nextButton" />
          </S.NextButton>
        </Link>
      </S.FlexContainer>
    </ModalContainer>
  );
}

export default ImageUploadPage;
