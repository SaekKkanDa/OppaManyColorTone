import styled from 'styled-components';
function ColorImgSpinner() {
    return (
        <ImgSpinnerWrap>
            <ColorChipImg src="/landingColor.png" />
            <ThinkImg src="/langinThink.png" />
        </ImgSpinnerWrap>
    );
}

export const ImgSpinnerWrap = styled.div`
    width: 284px;
    height: 284px;
    margin-top: 90px;
    display: inherit;
`;

export const ColorChipImg = styled.img`
    width: 284px;
    height: 284px;
    animation: spinner 3s infinite linear;

    @keyframes spinner {
        to {
            transform: rotate(360deg);
        }
    }
`;

export const ThinkImg = styled.img`
    width: 118px;
    height: 118px;
    position: absolute;
    margin-top: 83px;
    margin-left: 83px;
`;

export default ColorImgSpinner;
