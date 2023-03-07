import React, { useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useRecoilState } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CropImage } from '../../recoil/app';
import theme from '@Styles/theme';
import {
  $FlexContainer,
  $InputScale,
  $ScaleBox,
  $Guidance,
  $ConfirmButton,
} from './style';

interface FaceDetectionProps {
  imageFile: File;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function FaceDetection({ imageFile, setIsModalOpen }: FaceDetectionProps) {
  const [image, setImage] = useState('');
  const [scale, setScale] = useState(1);
  const [, setCropImage] = useRecoilState(CropImage);

  const editor: React.RefObject<AvatarEditor> = useRef(null);

  useEffect(() => {
    const file = imageFile;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일을 선택해 주세요.');
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
    if (editor.current) {
      try {
        const canvas = editor.current.getImageScaledToCanvas();
        const image = canvas.toDataURL('image/jpeg');

        setCropImage(image);
        setIsModalOpen(false);
      } catch (error) {
        window.alert('다시 시도해 주세요.');
      }
    } else {
      window.alert('이미지가 없습니다.');
    }
  };

  return (
    <$FlexContainer>
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
      <$ScaleBox>
        <FontAwesomeIcon icon={faMinus} size="1x" color={theme.gray[900]} />
        <$InputScale
          type="range"
          name="scale"
          onChange={OnChange}
          min={0.5}
          max={3.0}
          step={0.1}
        />
        <FontAwesomeIcon icon={faPlus} size="1x" color={theme.gray[900]} />
      </$ScaleBox>
      <$Guidance>
        옷을 제외하고 얼굴과 헤어만 포함되도록
        <br />
        영역을 설정해주세요.
      </$Guidance>
      <$ConfirmButton onClick={handleSave}>확인</$ConfirmButton>
    </$FlexContainer>
  );
}

export default FaceDetection;
