import styled from 'styled-components';
import { Button, flexCustom } from '@Styles/theme';

export const $CroppedImageBox = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: 1;
`;

export const $ModalContainer = styled.div`
    position: relative;
    height: 100vh;
`;

export const $ModalBackground = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.gray[500]};
    opacity: 0.5;
    z-index: 10;
`;

export const $FlexContainer = styled.div`
    display: ${({ isModalOpen }) => (isModalOpen ? 'hidden' : 'block')};
    height: 100%;
    ${flexCustom('column', 'center', 'center')}
    padding: 40px 20px;
`;

export const $Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
`;

export const $ImageBox = styled.div`
    ${flexCustom('column', 'center', 'center')}
    margin-bottom: 30px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.white};
`;

export const $ImageLabel = styled.label`
    ${flexCustom('column', 'center', 'center')}
    cursor: pointer;
`;

export const $SelectImgButton = styled(Button)`
    width: 280px;
`;

export const $InputFile = styled.input`
    display: none;
`;

export const $Guidance = styled.p`
    margin: 24px 0 12px;
    text-align: center;
    line-height: 1.6em;
`;

export const $Notification = styled($Guidance)`
    margin: 0 0 36px;
    color: ${({ theme }) => theme.gray[400]};
    font-size: 14px;
`;

export const $NextButton = styled(Button)`
    position: fixed;
    bottom: 48px;
    left: 50%;
    transform: translateX(-50%);
`;
