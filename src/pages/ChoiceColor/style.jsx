import styled from 'styled-components';

export const $Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
`
export const $StatusBox = styled.div`
  width: 90%;
  height: 8px;
  border-radius: 4px;
  background-color: #D4D4D8;
`

export const $StatusBar = styled.div`
  background-color: #52525B;
  border-radius: 4px;
  width: ${({width}) => width};
  height: 8px;
`
export const $StatusContent = styled.div`
  font-size: 20px;
  margin-bottom: 30px;
`

export const $Explain = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`

export const $ColorBox = styled.div`
  display: grid;
  grid-template-columns : 1fr 1fr;
  width: 90%;
  height: 500px;
  margin-bottom: 20px;
`
export const $Color = styled.div`
  background-color: ${({color}) => color};
  width: 100%;
`