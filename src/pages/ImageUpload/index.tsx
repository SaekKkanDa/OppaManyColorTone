import React from 'react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import FaceDetection from '../FaceDetection';
import theme from '@Styles/theme';
import { useRecoilState } from 'recoil';
import { CropImage } from '../../recoil/app';
import ROUTE_PATH from '@Constant/routePath';

import {
  $ModalContainer,
  $ModalBackground,
  $FlexContainer,
  $Modal,
  $Guidance,
  $ImageBox,
  $ImageLabel,
  $SelectImgButton,
  $InputFile,
  $NextButton,
  $Notification,
  $CroppedImageBox,
} from './style';

function ImageUploadPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    window.alert('다시 시도해 주세요.');
  };

  return (
    <$ModalContainer>
      {isModalOpen && imageFile ? (
        <>
          <$Modal>
            <FaceDetection
              imageFile={imageFile}
              setIsModalOpen={setIsModalOpen}
            />
          </$Modal>
          <$ModalBackground />
        </>
      ) : null}

      <$FlexContainer isModalOpen={isModalOpen}>
        <$ImageBox>
          {imagePreviewURL ? (
            <>
              <$CroppedImageBox src={imagePreviewURL} alt="preview image" />
              <$InputFile
                ref={inputRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={selectImage}
              />
            </>
          ) : (
            <$ImageLabel>
              <$InputFile
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
            </$ImageLabel>
          )}
        </$ImageBox>

        <$SelectImgButton onClick={clickInput}>사진 선택</$SelectImgButton>
        <$Guidance>실제와 비슷한 톤의 얼굴 사진을 선택해주세요.</$Guidance>
        <$Notification>
          ※ 사진은 본 진단 이외 다른 목적으로 이용되지 않으며,
          <br />
          서버에 저장되거나 제3자와 공유되지 않습니다.
        </$Notification>

        <Link to={ROUTE_PATH.choiceColor}>
          <$NextButton disabled={!imagePreviewURL}>다음으로</$NextButton>
        </Link>
      </$FlexContainer>
    </$ModalContainer>
  );
}

export default ImageUploadPage;
