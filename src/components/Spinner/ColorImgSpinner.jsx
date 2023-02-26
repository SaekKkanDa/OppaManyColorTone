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
    max-width: 240px;
    max-height: 240px;
    width: 92vw;
    height: 92vw;
    margin-top: 7vh;
    display: inherit;
`;

export const ColorChipImg = styled.img`
    max-width: 240px;
    max-height: 240px;
    width: 92vw;
    height: 92vw;
    animation: spinner 3s infinite linear;

    @keyframes spinner {
        to {
            transform: rotate(360deg);
        }
    }
`;

export const ThinkImg = styled.img`
    max-width: 100px;
    max-height: 100px;
    width: 32vw;
    height: 32vw;
    position: absolute;
    margin-top: 70px;
    margin-left: 70px;
`;

export default ColorImgSpinner;
