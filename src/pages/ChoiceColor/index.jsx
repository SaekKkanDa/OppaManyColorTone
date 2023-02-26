import { useState, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Button } from '@Styles/theme';
import { useNavigate } from 'react-router-dom';
import { colorData } from '@Constant/colorData';

function ChoiceColor() {
    const [num, setNum] = useState(0);
    const selectedType = useRef([]);

    const navigate = useNavigate();
    const selectedColor = useMemo(() => colorData[num], [num]);

    const nextSlide = (type) => {
        selectedType.current.push(type);
        setNum(num + 1);
        if (num === 8) {
            navigate('/result');
        }
    };

    //selectedType 배열을 객체화하여 가장 많이 선택된 값 출력
    let result = {};
    const findMax = () => {
        selectedType.current.forEach((x) => {
            result[x] = (result[x] || 0) + 1;
        });
        return result;
    };

    //가장 많이 선택된 type 출력
    const calResult = () => {
        let maxValue = -Infinity;
        let maxKey = null;

        for (let key in result) {
            const value = result[key];
            if (value > maxValue) {
                maxValue = value;
                maxKey = key;
            }
        }
        return maxKey;
    };

    //리코일에 최종 결과값 담기
    const finalResult = calResult();

    return (
        <Wrapper>
            <StatusBox>
                <StatusBar width={`${(num + 1) * 11.1}%`} />
            </StatusBox>
            <StatusContent>
                {num + 1}/{colorData.length} 단계
            </StatusContent>
            <Explain>얼굴과 제일 잘 어울리는 컬러를 선택해주세요.</Explain>
            <ColorBox>
                {selectedColor.map((item) => (
                    <Color
                        key={item.id}
                        color={item.color}
                        onClick={() => nextSlide(item.type)}
                    />
                ))}
            </ColorBox>
            <Button onClick={() => navigate('/result')}>다음으로</Button>
        </Wrapper>
    );
}

export default ChoiceColor;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    max-width: 400px;
    margin: 0 auto;
`;
const StatusBox = styled.div`
    width: 90%;
    height: 8px;
    border-radius: 4px;
    background-color: #d4d4d8;
`;

const StatusBar = styled.div`
    background-color: #52525b;
    border-radius: 4px;
    width: ${({ width }) => width};
    height: 8px;
`;
const StatusContent = styled.div`
    font-size: 20px;
    margin-bottom: 30px;
`;

const Explain = styled.div`
    font-size: 16px;
    margin-bottom: 20px;
`;

const ColorBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 90%;
    height: 500px;
    margin-bottom: 20px;
`;
const Color = styled.div`
    background-color: ${({ color }) => color};
    width: 100%;
`;
