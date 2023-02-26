import styled from 'styled-components';
import { Button, flexCustom } from '@Styles/theme';

export const FlexContainer = styled.div`
    position: relative;
    ${flexCustom('column', 'center', 'center')}
    padding: 40px 20px;
    height: 100vh;
`;

export const ImageBox = styled.div`
    ${flexCustom('column', 'center', 'center')}
    margin-bottom: 24px;
    width: 280px;
    height: 280px;
    background-color: ${({ theme }) => theme.white};
`;

export const ImageUpload = styled.div`
    ${flexCustom('column', 'center', 'center')}
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.gray[300]};
`;

export const Guidance = styled.p`
    margin: 24px 0 12px;
    text-align: center;
    line-height: 1.6em;
`;

export const Notification = styled(Guidance)`
    margin: 0 0 36px;
    color: ${({ theme }) => theme.gray[400]};
    font-size: 14px;
`;

export const NextButton = styled(Button)`
    position: fixed;
    bottom: 48px;
`;
