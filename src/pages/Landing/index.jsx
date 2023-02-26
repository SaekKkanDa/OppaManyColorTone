import { useNavigate } from 'react-router-dom';
import {
    LandingWrap,
    LandingContentDiv,
    LandingTitle,
    LandingSubTitle,
    LandingColorDiv,
    LandingUserCountDiv,
    LangingStartButton,
    LandingPersonalColorExplanationText,
} from './style';

function LandingPage() {
    const navigate = useNavigate();

    const onClickStartButton = () => {
        navigate('/image-upload');
    };

    return (
        <>
            <LandingWrap>
                <LandingContentDiv>
                    <LandingTitle>오빠! 톤 많아?</LandingTitle>
                    <LandingSubTitle>퍼스널 컬러 자가진단</LandingSubTitle>
                    <LandingColorDiv></LandingColorDiv>
                    <LandingUserCountDiv>
                        지금까지 1,234명이 진단했어요!
                    </LandingUserCountDiv>
                    <LangingStartButton onClick={onClickStartButton}>
                        시작하기
                    </LangingStartButton>
                    <LandingPersonalColorExplanationText>
                        퍼스널 컬러 설명 보기
                    </LandingPersonalColorExplanationText>
                </LandingContentDiv>
            </LandingWrap>
        </>
    );
}

export default LandingPage;
