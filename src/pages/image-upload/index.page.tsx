import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@Root/next-i18next.config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { isEmpty, isNotNil } from '@Base/utils/check';
import { useModal } from '@Base/hooks/useModal';
import { CropImage } from '@Recoil/app';
import useModalRecoil from '@Hooks/useModalRecoil';
import ROUTE_PATH from '@Constant/routePath';
import AlertModal from '@Components/AlertModal';
import theme, {
  Modal as ThemeModal,
  ModalBackground,
  ModalContainer,
} from '@Styles/theme';

import { imageFileState, shareModalState } from './imageUpload.atom';
import ShareModalSubPage from './subpages/shareModal.subpage';
import FaceDetection from './FaceDetection';
import * as S from './style';

function ImageUploadPage() {
  const router = useRouter();
  const { t } = useTranslation('common');

  const [imageFile, setImageFile] = useRecoilState(imageFileState);

  const {
    isOpen: isOpenImageUploadModal,
    open: openImageUploadModal,
    close: closeImageUploadModal,
  } = useModal({ defaultIsOpen: false });

  const [alertMessage, setAlertMessage] = useState('');
  const imagePreviewURL = useRecoilValue(CropImage);

  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

  const clickInput = () => {
    inputRef.current?.click();
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
      openImageUploadModal();
      return;
    }
    setAlertMessage('alertRetry');
  };

  const handleTestMyself = () => {
    router.push(ROUTE_PATH.choiceColor);
  };

  // related to start button
  const { open: openShareRecommendationModal } = useModalRecoil({
    state: shareModalState,
  });

  return (
    <>
      <ModalContainer isOpen={isOpenImageUploadModal}>
        {isOpenImageUploadModal && isNotNil(imageFile) && (
          <>
            <ThemeModal>
              <FaceDetection
                imageFile={imageFile}
                setAlertMessage={setAlertMessage}
                handleClose={closeImageUploadModal}
              />
            </ThemeModal>
            <ModalBackground />
          </>
        )}
        {!isEmpty(alertMessage) && (
          <AlertModal
            isOpen={!!alertMessage}
            handleClose={() => setAlertMessage('')}
          >
            {t(`${alertMessage}`)}
          </AlertModal>
        )}

        <S.FlexContainer isOpen={isOpenImageUploadModal}>
          <S.ImageSelectWrapper>
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
              {t('selectImg')}
            </S.SelectImgButton>
            <S.Guidance>{t('guidance')}</S.Guidance>
            <S.Notification>
              <h6>
                <FontAwesomeIcon icon={faFaceSmile} size="sm" />
                {t('notification_1')}
              </h6>
              {t('notification_2')}
            </S.Notification>
          </S.ImageSelectWrapper>

          <S.ButtonWrapper>
            <S.PrimaryButton
              disabled={!imagePreviewURL}
              onClick={handleTestMyself}
            >
              {t('testMyselfButton')}
            </S.PrimaryButton>
            <S.SecondaryButton
              disabled={!imagePreviewURL}
              onClick={openShareRecommendationModal}
            >
              {t('askSomeoneElseButton')}
            </S.SecondaryButton>
          </S.ButtonWrapper>
        </S.FlexContainer>
      </ModalContainer>
      <ShareModalSubPage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18NextConfig)),
    },
  };
};

export default ImageUploadPage;
