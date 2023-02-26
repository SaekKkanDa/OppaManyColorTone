import styled, { css } from 'styled-components';

const theme = {
    white: '#ffffff',
    gray: {
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        800: '#27272a',
        900: '#18181b',
    },
};

export default theme;

export const flexCustom = (flexDirection, alignItems, justifyContent) => css`
    display: flex;
    flex-direction: ${flexDirection || 'initial'};
    align-items: ${alignItems || 'center'};
    justify-content: ${justifyContent || 'center'};
`;

export const Button = styled.button`
    padding: 16px 0;
    width: 320px;
    border-radius: 20px;

    background-color: ${theme.gray[800]};
    color: ${theme.white};
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;

    &:disabled {
        background-color: ${theme.gray[300]};
        cursor: not-allowed;
    }
`;

export const BorderedButton = styled(Button)`
    background-color: transparent;
    border: 2px solid ${theme.gray[800]};
    color: ${theme.gray[800]};
`;
