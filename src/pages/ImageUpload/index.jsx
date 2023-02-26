import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import FaceDetectionPage from '../FaceDetection';
import theme from '@Styles/theme';
import {useRecoilState} from 'recoil'
import { CropImage } from "../../recoil/app";

import {
    $FlexContainer,
    $Modal,
    $Guidance,
    $ImageBox,
    $ImageLabel,
    $ImageUploadButton,
    $InputFile,
    $NextButton,
    $Notification,
} from './style';

function ImageUploadPage() {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewURL, setImagePreviewURL] = useRecoilState(CropImage);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const inputRef = useRef(null);

    const clickInput = () => {
        inputRef.current?.click();
    };

    const selectImage = (e) => {
        setImageFile(e.target.files[0]);

        setIsModalOpen(true);

        // const reader = new FileReader();
        // reader.readAsDataURL(image);

        // reader.onload = () => {
        //     setImagePreviewURL(reader.result);
        //     e.target.value = '';
        // };
    };

    return (
        <$FlexContainer>
            {isModalOpen ? (
                <$Modal>
                    <FaceDetectionPage
                        imageFile={imageFile}
                        setIsModalOpen={setIsModalOpen}
                    />
                </$Modal>
            ) : null}

            <$ImageBox>
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
                        color={theme.white}
                    />
                </$ImageLabel>
            </$ImageBox>
            {imagePreviewURL && (
                <img src={imagePreviewURL} alt="preview image" />
            )}

            <$ImageUploadButton onClick={clickInput}>
                사진 선택
            </$ImageUploadButton>
            <$Guidance>실제와 비슷한 톤의 얼굴 사진을 선택해주세요.</$Guidance>
            <$Notification>
                ※ 사진은 본 진단 이외 다른 목적으로 이용되지 않습니다.
            </$Notification>
            <Link to="/choice-color">
                <$NextButton disabled={!imageFile}>다음으로</$NextButton>
            </Link>
        </$FlexContainer>
    );
}

export default ImageUploadPage;
