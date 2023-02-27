import styled from 'styled-components';

export const $Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
`;

export const $StatusBox = styled.div`
  margin-top: 10px;
  width: 100%;
  max-width: 896px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.gray[300]};
`;

export const $StatusBar = styled.div`
  background-color: ${({ theme }) => theme.gray[600]};
  border-radius: 4px;
  width: ${({ width }) => width};
  height: 8px;
  transition: width ease 0.5s;
`;
export const $StatusContent = styled.div`
  font-size: 20px;
  margin-bottom: 30px;
`;

export const $Explain = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.6em;
  text-align: center;

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.gray[400]};
    font-size: 14px;
  }
`;

export const $ColorBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 896px;
  height: 520px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const $Color = styled.div`
  background-color: ${({ color }) => color};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    border-radius: 50%;
  }
`;
