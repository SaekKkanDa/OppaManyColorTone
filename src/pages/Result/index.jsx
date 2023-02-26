import styled from 'styled-components';
import { resultData } from '@Constant/resultData';

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
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    max-width: 400px;
    margin: 0 auto;
    padding: 44px 32px 30px 32px;

    border: 1px solid black;

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
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: min(64.25vw, 257px);
`;

const $CelebritiesWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 9px;
    justify-content: space-between;
`;

const $CelebrityWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const $CelebrityName = styled.div`
    margin-bottom: 8px;
    font-size: 16px;
    text-align: center;
    font-weight: 400;
`;

function MenuSubPage() {
    // HJ TODO: 각각 기능 추가
    const menuItemList = [
        { name: '결과저장', imageURL: '/stylingSummerLight.png' },
        { name: '링크복사', imageURL: '/stylingSummerLight.png' },
        { name: '카카오톡', imageURL: '/stylingSummerLight.png' },
        { name: '공유하기', imageURL: '/stylingSummerLight.png' },
    ];

    return (
        <>
            <$MenuContainer>
                {menuItemList.map(({ name, imageURL }) => {
                    return (
                        <$MenuItemWrapper key={name}>
                            <$MenuItemImgWrapper>
                                <$MenuItemImg src={imageURL} />
                            </$MenuItemImgWrapper>
                            <$MenuItemName>{name}</$MenuItemName>
                        </$MenuItemWrapper>
                    );
                })}
            </$MenuContainer>
            <$GotoFirstButton>처음으로</$GotoFirstButton>
        </>
    );
}

const $MenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 73px;
    justify-content: space-around;
`;

const $MenuItemWrapper = styled.div`
    width: 48px;
`;

const $MenuItemImgWrapper = styled.button`
    border: none;
    background: none;
    padding: 0;
`;

const $MenuItemImg = styled.img`
    max-width: 100%;
`;

const $MenuItemName = styled.div`
    text-align: center;
    font-size: 12px;
`;

const $GotoFirstButton = styled.button`
    margin-top: 29px;
`;

export default ResultPage;
