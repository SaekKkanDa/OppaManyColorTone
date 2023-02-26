import styled from 'styled-components';
import theme, { Button, flexCustom } from '@Styles/theme';

export const LandingWrap = styled.div`
    width: 100vw;
    height: 100vh;
    ${flexCustom('row', 'center', 'center')}
`;

export const LandingContentDiv = styled.div`
    width: 400px;
    height: 900px;
    ${flexCustom('column', 'center', 'initial')}
    background-color: ${theme.gray[100]};
    border-radius: 6px;
`;

export const LandingTitle = styled.div`
    height: 66px;
    font-size: 52px;
    font-weight: 700;
    margin-top: 82px;
    text-align: center;
`;

export const LandingSubTitle = styled.div`
    height: 46px;
    font-size: 32px;
    font-weight: 700;
    margin-top: 14px;
    text-align: center;
`;

export const LandingColorDiv2 = styled.div`
    width: 284px;
    height: 284px;
    margin-top: 90px;
`;

export const LandingUserCountDiv = styled.div`
    height: 38px;
    font-size: 20px;
    font-weight: 400;
    margin-top: 90px;
`;

export const LangingStartButton = styled(Button)`
    height: 88px;
    font-size: 40px;
    font-weight: 500;
    cursor: pointer;
`;

export const LandingPersonalColorExplanationText = styled.div`
    margin-top: 14px;
    font-size: 16px;
    font-weight: 400;
    color: ${theme.gray[400]};
    text-decoration: underline;
    cursor: pointer;
`;
