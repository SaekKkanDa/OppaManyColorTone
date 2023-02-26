import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import { resultData } from '@Constant/resultData';
import { flexCustom } from '@Styles/theme';

import { updateClipboard } from '@Utils/clipboard';

import useKakaoShare from '@Hooks/useKakaoShare';

function ResultPage() {
    const {
        name,
        textColor,
        gridColors,
        description,
        bestColors,
        worstColors,
        stylingURL,
        celebrities,
    } = resultData['springLight'];

    return (
        <$Wrapper>
            <$Title>
                당신은 <$TitleBold color={textColor}>{name}</$TitleBold> 입니다
            </$Title>

            <$ColorGrid>
                {/* HJ TODO: idx 제거 */}
                {gridColors.map((color, idx) => (
                    <$ColorGridItem key={color + idx} backgroundColor={color} />
                ))}
            </$ColorGrid>

            <$Description>{description}</$Description>

            <$ColorMatchWrapper>
                <$ColorMatchTitle>베스트 컬러</$ColorMatchTitle>
                <$ColorMatchGrid>
                    {bestColors.map((color, idx) => (
                        <$ColorMatchGridItem
                            key={color + idx}
                            backgroundColor={color}
                        />
                    ))}
                </$ColorMatchGrid>
                <$ColorMatchTitle>피해야 할 컬러</$ColorMatchTitle>
                <$ColorMatchWorstGrid>
                    {worstColors.map((color, idx) => (
                        <$ColorMatchGridItem
                            key={color + idx}
                            backgroundColor={color}
                        />
                    ))}
                </$ColorMatchWorstGrid>
            </$ColorMatchWrapper>

            <$SubDescriptionTitle>
                <$SubDescriptionTitleBold color={textColor}>
                    {name}
                </$SubDescriptionTitleBold>{' '}
                스타일링 추천
                <$StylingWrapper>
                    <$Styling src={stylingURL} />
                </$StylingWrapper>
            </$SubDescriptionTitle>

            <$SubDescriptionTitle>
                <$SubDescriptionTitleBold color={textColor}>
                    {name}
                </$SubDescriptionTitleBold>{' '}
                대표 연예인
                <$CelebritiesWrapper>
                    {celebrities.map(({ name, imageURL }, idx) => {
                        return (
                            <$CelebrityWrapper key={name + idx}>
                                <$CelebrityName>{name}</$CelebrityName>
                                <$Styling key={name} src={imageURL} />
                            </$CelebrityWrapper>
                        );
                    })}
                </$CelebritiesWrapper>
            </$SubDescriptionTitle>

            <MenuSubPage />
        </$Wrapper>
    );
}

const $Wrapper = styled.div`
    ${flexCustom('column', 'inherit', 'flex-start')}
    box-sizing: border-box;
    max-width: 400px;
    margin: 0 auto;
    padding: 44px 32px 30px 32px;

    font-family: Inter;
`;

const $Title = styled.h1`
    font-size: min(5.25vw, 21px);
    font-weight: 700;
    text-align: center;
    letter-spacing: -0.022em;
`;

const $TitleBold = styled.span`
    font-size: min(8.75vw, 35px);
    color: ${(props) => props.color};
`;

const $ColorGrid = styled.div`
    margin: 21px auto 0 auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 1px;

    width: 100%;
`;

const $ColorGridItem = styled.div`
    aspect-ratio: 16/9;
    background-color: ${(props) => props.backgroundColor};
`;

const $Description = styled.div`
    margin-top: 21px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
`;

const $ColorMatchWrapper = styled.div`
    margin-top: 25px;
`;

const $ColorMatchTitle = styled.div`
    font-weight: 700;
    font-size: min(5.25vw, 21px);
`;

const $ColorMatchGrid = styled.div`
    margin-top: 5px;
    margin-bottom: 30px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 5px;

    width: 100%;
`;

const $ColorMatchGridItem = styled.div`
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: ${(props) => props.backgroundColor};
`;

const $ColorMatchWorstGrid = styled.div`
    margin-top: 5px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: 1fr;
    gap: 5px;
`;

const $SubDescriptionTitle = styled.div`
    margin-top: 34px;
    font-size: min(5.25vw, 21px);
    font-weight: 700;
`;

const $SubDescriptionTitleBold = styled.span`
    color: ${(props) => props.color};
`;

const $Styling = styled.img`
    max-width: 100%;
`;

const $StylingWrapper = styled.div`
    ${flexCustom('column', 'center', 'center')};
    margin: 0 auto;
    width: min(64.25vw, 257px);
`;

const $CelebritiesWrapper = styled.div`
    ${flexCustom('row', 'inherit', 'space-between')};
    margin-top: 9px;
`;

const $CelebrityWrapper = styled.div`
    ${flexCustom('column', 'inherit', 'inherit')};
`;

const $CelebrityName = styled.div`
    margin-bottom: 8px;
    font-size: 16px;
    text-align: center;
    font-weight: 400;
`;

function MenuSubPage() {
    const { isLoading, kakaoShare } = useKakaoShare();

    const handleLinkCopyClick = async () => {
        try {
            await updateClipboard(location.href);
            // HJ TODO: 커스텀 alert 등록
            alert('클립보드 복사에 성공했습니다.');
        } catch (err) {
            console.error(err);
            alert('클립보드 복사에 실패했습니다');
        }
    };

    const handleKakaoShare = () => {
        if (isLoading) {
            alert('로딩 중 입니다. 다시 시도해주세요 :)');
        } else {
            kakaoShare();
        }
    };

    return (
        <>
            <$MenuContainer>
                <$MenuItemWrapper>
                    <$MenuItemButton>
                        <$MenuItemImg src="/stylingSummerLight.png" />
                    </$MenuItemButton>
                    <$MenuItemName>결과저장</$MenuItemName>
                </$MenuItemWrapper>

                <$MenuItemWrapper>
                    <$MenuItemButton onClick={handleLinkCopyClick}>
                        <FontAwesomeIcon icon={faLink} color={'white'} />
                    </$MenuItemButton>
                    <$MenuItemName>링크복사</$MenuItemName>
                </$MenuItemWrapper>

                <$MenuItemWrapper>
                    <$KakaoShareButton onClick={handleKakaoShare}>
                        <$MenuItemImg src="/kakaoIcon.png" />
                    </$KakaoShareButton>
                    <$MenuItemName>카카오톡</$MenuItemName>
                </$MenuItemWrapper>

                <$MenuItemWrapper>
                    <$MenuItemButton>
                        <$MenuItemImg src="/stylingSummerLight.png" />
                    </$MenuItemButton>
                    <$MenuItemName>공유하기</$MenuItemName>
                </$MenuItemWrapper>
            </$MenuContainer>

            <$GotoFirstButton>처음으로</$GotoFirstButton>
        </>
    );
}

const $MenuContainer = styled.div`
    ${flexCustom('row', 'inherit', 'space-around')}
    margin-top: 73px;
`;

const $MenuItemWrapper = styled.div`
    ${flexCustom('column', 'center', 'center')}
`;

const $MenuItemButton = styled.button`
    ${flexCustom('column', 'center', 'center')}
    border-radius: 50%;
    background-color: #27272a;
    padding: 8px;
    width: 48px;
    height: 48px;
    aspect-ratio: 1/1;
    font-size: 48px;
    cursor: pointer;

    svg {
        width: 100%;
    }
`;

const $KakaoShareButton = styled.button`
    ${flexCustom('column', 'center', 'center')}
    border-radius: 50%;
    width: 48px;
    height: 48px;
    aspect-ratio: 1/1;
    cursor: pointer;
`;

const $MenuItemImg = styled.img`
    max-width: 100%;
`;

const $MenuItemName = styled.div`
    margin-top: 2px;
    text-align: center;
    font-size: 12px;
`;

const $GotoFirstButton = styled.button`
    margin-top: 29px;
`;

export default ResultPage;
