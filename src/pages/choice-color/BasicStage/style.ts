import styled from 'styled-components';

export const StatusBox = styled.div`
  margin-top: 10px;
  width: 100%;
  max-width: 896px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.gray[300]};
`;

export const StatusBar = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 8px;
  background-color: ${({ theme }) => theme.gray[600]};
  border-radius: 4px;
  transition: width ease 0.5s;
`;

export const StatusContent = styled.h6`
  margin: 8px 0 24px;
  color: ${({ theme }) => theme.gray[600]};
  font-size: 18px;
`;

export const ColorBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 100%;
  max-width: 896px;
  height: 520px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const Color = styled.div<{ color?: string }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({ color }) => color};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  img {
    border-radius: 50%;
  }
`;
