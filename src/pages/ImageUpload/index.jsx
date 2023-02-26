import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import theme, { Button } from '@Styles/theme';
import {
    FlexContainer,
    Guidance,
    ImageBox,
    ImageUpload,
    NextButton,
    Notification,
} from './style';

function ImageUploadPage() {
    return (
        <FlexContainer>
            <ImageBox>
                <ImageUpload>
                    <FontAwesomeIcon
                        icon={faUserPlus}
                        size="3x"
                        color={theme.white}
                    />
                </ImageUpload>
            </ImageBox>
            <Button>사진 선택하기</Button>
            <Guidance>
                실제와 비슷한 톤의 얼굴 사진을 선택해주세요.
                <br />
                얼굴과 헤어가 보이게 영역을 설정해주세요.
            </Guidance>
            <Notification>
                ※ 사진은 본 진단 이외에 다른 목적으로 이용되지 않습니다.
            </Notification>
            <NextButton disabled>다음으로</NextButton>
        </FlexContainer>
    );
}

export default ImageUploadPage;
