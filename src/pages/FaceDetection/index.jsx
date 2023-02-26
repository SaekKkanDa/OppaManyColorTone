import { useEffect, useState } from "react";
import AvatarEditor from 'react-avatar-editor'

function FaceDetectionPage() {
    const [image,setImage] = useState('');
    const [scale, setScale] = useState(1);
    const [editor, setEditor] = useState(null);
    const [newImage,setNewImage] = useState(undefined)
    const OnImageChange = (event) =>{
        const file = event.target.files[0];
        if (!file.type.startsWith('image/')) {
            console.error('Selected file is not an image');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);

        };
    }
    useEffect(()=>{

    })
    const OnChange = (event) =>{
        const {name, value} = event.target;

        switch (name) {
            case 'scale':
                const v = Math.floor(value/5)/10 +1
                setScale(v);
                break;

            default:
                break;
        }
    }
    const handleSave = () => {
        if (editor) {
          const canvas = editor.getImageScaledToCanvas();
          const image = canvas.toDataURL('image/jpeg');
          // 이제 이 이미지를 서버로 업로드하거나 상태에 저장할 수 있습니다.
          console.log(image);
          setNewImage(image)
        }
      };
    return (
        <div>
            <input type="file" name="" onChange={OnImageChange} id="" />
            <div >
                {image && <AvatarEditor
                    ref={setEditor}
                    image={image}
                    width={200}
                    height={200}
                    border={100}
                    color={[0, 0, 0, 0.8]} // RGBA
                    scale={scale}
                    rotate={0}
                    borderRadius={100}
                />}
            </div>
            <div>
                <input type="range" name="scale"  id="" onChange={OnChange}  min={0} max={100} />
            </div>
            <button onClick={handleSave}>Save</button>

            <button>확인</button>
            {newImage && <img src={newImage} alt="" /> }
        </div>
    );
    
}

export default FaceDetectionPage;