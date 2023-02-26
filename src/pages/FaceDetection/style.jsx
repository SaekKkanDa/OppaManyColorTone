import styled from 'styled-components';
import { Button, flexCustom } from '@Styles/theme';


export const $FlexContainer = styled.div`
    position: relative;
    ${flexCustom('column', 'center', 'center')}
    padding: 40px 20px;
    height: 100vh;
    background-color: rgba(255,255,255,1);
`;

export const $ScaleBox = styled.div`
    margin-bottom:40px;
`;

export const $InputScale = styled.input`
    width: 300px;
    border-radius: 0px;
    border-bottom: 2px solid #444;
    outline: none;
    transition: background 450ms ease-in;
    -webkit-appearance: none;
    accent-color: #666;
`;

export const $Span = styled.span`
    font-size: 25px;
`;
