import { useEffect, useState } from "react";
import AvatarEditor from 'react-avatar-editor'
import {useRecoilState} from 'recoil'
import { CropImage } from "../../recoil/app";
import { useNavigate } from 'react-router-dom';
import {
    $FlexContainer,
    $InputScale,
    $Span ,
    $ScaleBox
} from './style';
import theme, { Button } from '@Styles/theme';

function FaceDetectionPage({imageFile,setIsModalOpen}) {

    const navigate = useNavigate();
    const [image,setImage] = useState('');
    const [scale, setScale] = useState(1);
    const [editor, setEditor] = useState(null);
    const [cropImage, setCropImage] = useRecoilState(CropImage);

  
    useEffect(()=>{
        const file = imageFile;
        
        if (!file.type.startsWith('image/')) {
            console.error('Selected file is not an image');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);

        };
    },[imageFile])
   
    const OnChange = (event) =>{
        const {name, value} = event.target;

        switch (name) {
            case 'scale':
                const v = Math.floor(value/5)/10 +1
                setScale(value);
                break;

            default:
                break;
        }
    }
    const handleSave = () => {
        if (editor) {
            try {
                const canvas = editor.getImageScaledToCanvas();
                const image = canvas.toDataURL('image/jpeg');
                // 이제 이 이미지를 서버로 업로드하거나 상태에 저장할 수 있습니다.
                setCropImage(image);
                setIsModalOpen(false);
            } catch (error) {
                window.alert('이미지 크롭 개발 중 입니다.');
            }
          
        }else{
            window.alert('이미지가 없습니다.');
        }
    };

    return (
        <$FlexContainer>
            <div >
                 <AvatarEditor
                    ref={setEditor}
                    image={image}
                    width={200}
                    height={200}
                    border={100}
                    color={[0, 0, 0, 0.4]} // RGBA
                    scale={scale}
                    rotate={0}
                    borderRadius={100}
                />
            </div>
            <$ScaleBox>
                <$Span >-</$Span > 
                <$InputScale type="range" name="scale"  id="" onChange={OnChange}  min={0.1} max={3.0} step={0.1} />
                <$Span >+</$Span > 
            </$ScaleBox>
            <Button onClick={handleSave}>확인</Button>

        </$FlexContainer>
    );
    
}

export default FaceDetectionPage;