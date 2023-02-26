import { useState } from 'react';
import styled from 'styled-components';
import {Button} from '@Styles/theme'
import { useNavigate } from 'react-router-dom';

// 1 spring, 2 summer, 3 autumn, 4 winter
const colorPalette = [
  [
    {id: 1, color: '#F9D3E6'},
    {id: 2, color: '#E38CAF'},
    {id: 3, color: '#DA7E81'},
    {id: 4, color: '#DB026C'}
  ],
  [
    {id: 1, color: '#FFEB80'},
    {id: 2, color: '#F3DC40'},
    {id: 3, color: '#E9C382'},
    {id: 4, color: '#F7A501'}
  ],
  [
    {id: 1, color: '#0078B4'},
    {id: 2, color: '#5873A6'},
    {id: 3, color: '#81A6A5'},
    {id: 4, color: '#0F428A'}
  ],
  [
    {id: 1, color: '#D3DD70'},
    {id: 2, color: '#4DA73A'},
    {id: 3, color: '#313F12'},
    {id: 4, color: '#015836'}
  ],
]

function ChoiceColor() {
  const [num, setNum] = useState(0)
  const [result, setResult] = useState([])

  const navigate = useNavigate()
  const nextSlide = (id) => {
    result.push(id)
    setResult(result)
    setNum(num + 1)
  }
  // console.log(result)
  return (
    <Wrapper>
    <StatusBox>
      <StatusBar width={`${(num + 1) * 25}%`}/>  
    </StatusBox>
    <StatusContent>{(num + 1) * 4}/16 단계</StatusContent>
    <Explain>얼굴과 제일 잘 어울리는 컬러를 선택해주세요.</Explain>
    <ColorBox>
      {
        colorPalette[num].map(item => <Color key={item.id} color={item.color} onClick={() => nextSlide(item.id)}/>)
      }
    </ColorBox>
    <Button onClick={()=>navigate('/result')}>다음으로</Button>
  </Wrapper>
  )
}

export default ChoiceColor;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
`
const StatusBox = styled.div`
  width: 90%;
  height: 8px;
  border-radius: 4px;
  background-color: #D4D4D8;
`

const StatusBar = styled.div`
  background-color: #52525B;
  border-radius: 4px;
  width: ${({width}) => width};
  height: 8px;
`
const StatusContent = styled.div`
  font-size: 20px;
  margin-bottom: 30px;
`

const Explain = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`

const ColorBox = styled.div`
  display: grid;
  grid-template-columns : 1fr 1fr;
  width: 90%;
  height: 500px;
  margin-bottom: 20px;
`
const Color = styled.div`
  background-color: ${({color}) => color};
  width: 100%;
  
`
