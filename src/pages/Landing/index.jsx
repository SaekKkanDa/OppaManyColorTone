import styled from 'styled-components';
import theme, { Button } from '@Styles/theme';

function LandingPage() {
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
                    <LangingStartButton>시작하기</LangingStartButton>
                    <LandingPersonalColorExplanationText>
                        퍼스널 컬러 설명 보기
                    </LandingPersonalColorExplanationText>
                </LandingContentDiv>
            </LandingWrap>
        </>
    );
}

const LandingWrap = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LandingContentDiv = styled.div`
    width: 400px;
    height: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${theme.gray[100]};
    border-radius: 6px;
    border: 1px solid black;
`;

const LandingTitle = styled.div`
    height: 66px;
    font-size: 52px;
    font-weight: 700;
    margin-top: 82px;
`;

const LandingSubTitle = styled.div`
    height: 46px;
    font-size: 32px;
    font-weight: 700;
    margin-top: 14px;
`;

const LandingColorDiv = styled.div`
    width: 284px;
    height: 284px;
    background-color: pink;
    margin-top: 90px;
`;

const LandingUserCountDiv = styled.div`
    height: 38px;
    font-size: 20px;
    font-weight: 400;
    margin-top: 90px;
`;

const LangingStartButton = styled(Button)`
    height: 88px;
    font-size: 40px;
    font-weight: 500;
    cursor: pointer;
`;

const LandingPersonalColorExplanationText = styled.div`
    margin-top: 14px;
    font-size: 16px;
    font-weight: 400;
    color: ${theme.gray[400]};
    text-decoration: underline;
    cursor: pointer;
`;

export default LandingPage;
