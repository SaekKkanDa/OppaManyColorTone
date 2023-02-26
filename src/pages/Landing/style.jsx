import styled from 'styled-components';
import theme, { Button, flexCustom } from '@Styles/theme';

export const $LandingWrap = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 400px;
    height: 100vh;
    ${flexCustom('column', 'center', 'space-around')}
    background-color: ${theme.gray[100]};
`;

export const $LandingTitleDiv = styled.div`
    ${flexCustom('column')}
`;

export const $LandingTitle = styled.h1`
    font-size: min(14.75vw, 52px);
    font-weight: 700;
    text-align: center;
`;

export const $LandingSubTitle = styled.h2`
    font-size: min(9.5vw, 32px);
    font-weight: 700;
    margin-top: 2vh;
    text-align: center;
`;

export const $LandingBottomDiv = styled.div`
    ${flexCustom('column')}
`;

export const $LandingUserCountDiv = styled.div`
    font-size: min(5vw, 20px);
    font-weight: 400;
    margin-bottom: max(2vh, 20px);
`;

export const $LangingStartButton = styled(Button)`
    height: 88px;
    font-size: 40px;
    font-weight: 500;
    cursor: pointer;
`;

export const $LandingPersonalColorExplanationText = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${theme.gray[400]};
    text-decoration: underline;
    cursor: pointer;
    margin-top: max(1vh, 10px);
    display: none;
`;
