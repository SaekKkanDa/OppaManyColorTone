import { useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useRecoilState } from 'recoil';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CropImage } from '@Recoil/app';
import theme from '@Styles/theme';

import * as S from './style';

interface FaceDetectionProps {
  imageFile: File;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertModal: React.Dispatch<React.SetStateAction<string>>;
}

function FaceDetection({
  imageFile,
  setIsModalOpen,
  setAlertModal,
}: FaceDetectionProps) {
  const [image, setImage] = useState('');
  const [scale, setScale] = useState(1);
  const [, setCropImage] = useRecoilState(CropImage);

  const editor = useRef<AvatarEditor>(null);

  useEffect(() => {
    const file = imageFile;

    if (!file.type.startsWith('image/')) {
      setIsModalOpen(false);
      setAlertModal('alertSelectImg');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;

      if (typeof result === 'string') {
        setImage(result);
        return;
      }

      throw Error('이미지 파일을 불러오는 데 오류가 발생했습니다.');
    };
  }, [imageFile]);

  const OnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'scale':
        setScale(Number(value));
        break;

      default:
        break;
    }
  };

  const handleSave = () => {
    let errorMsg = '';
    if (editor.current) {
      try {
        const canvas = editor.current.getImageScaledToCanvas();
        const image = canvas.toDataURL('image/jpeg');
        setCropImage(image);
      } catch (error) {
        errorMsg = 'alertRetry';
      }
    } else {
      errorMsg = 'alertNoImg';
    }

    setAlertModal(errorMsg);
    setIsModalOpen(false);
  };

  return (
    <S.FlexContainer>
      <div>
        <AvatarEditor
          ref={editor}
          image={image}
          width={100}
          height={100}
          border={100}
          color={[0, 0, 0, 0.4]} // RGBA
          scale={scale}
          rotate={0}
          borderRadius={100}
        />
      </div>
      <S.ScaleBox>
        <FontAwesomeIcon icon={faMinus} size="1x" color={theme.gray[900]} />
        <S.InputScale
          type="range"
          name="scale"
          onChange={OnChange}
          min={0.5}
          max={3.0}
          step={0.1}
        />
        <FontAwesomeIcon icon={faPlus} size="1x" color={theme.gray[900]} />
      </S.ScaleBox>
      <S.Guidance>
        <FormattedMessage id="modalGuidance_1" />
        <br />
        <FormattedMessage id="modalGuidance_2" />
      </S.Guidance>
      <S.ConfirmButton onClick={handleSave}>
        <FormattedMessage id="confirmButton" />
      </S.ConfirmButton>
    </S.FlexContainer>
  );
}

export default FaceDetection;
