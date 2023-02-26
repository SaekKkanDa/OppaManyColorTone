import { useEffect, useState } from 'react';
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
    $ConfirmButton,
} from './style';

function FaceDetectionPage({ imageFile, setIsModalOpen }) {
    const [image, setImage] = useState('');
    const [scale, setScale] = useState(1);
    const [editor, setEditor] = useState(null);
    const [cropImage, setCropImage] = useRecoilState(CropImage);

    useEffect(() => {
        const file = imageFile;

        if (!file.type.startsWith('image/')) {
            alert('이미지 파일을 선택해 주세요.');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        };
    }, [imageFile]);

    const OnChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'scale':
                const scaleValue = Math.floor(value / 5) / 10 + 1;
                setScale(Number(value));
                break;

            default:
                break;
        }
    };
    const handleSave = () => {
        if (editor) {
            try {
                const canvas = editor.getImageScaledToCanvas();
                const image = canvas.toDataURL('image/jpeg');
                // 이제 이 이미지를 서버로 업로드하거나 상태에 저장할 수 있습니다.
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
                    ref={setEditor}
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
                <FontAwesomeIcon
                    icon={faMinus}
                    size="1x"
                    color={theme.gray[900]}
                />
                <$InputScale
                    type="range"
                    name="scale"
                    onChange={OnChange}
                    min={0.5}
                    max={3.0}
                    step={0.1}
                />
                <FontAwesomeIcon
                    icon={faPlus}
                    size="1x"
                    color={theme.gray[900]}
                />
            </$ScaleBox>
            <$ConfirmButton onClick={handleSave}>확인</$ConfirmButton>
        </$FlexContainer>
    );
}

export default FaceDetectionPage;
