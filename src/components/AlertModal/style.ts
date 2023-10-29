import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  display: flex;
  flex-direction: column;
  gap: 16px;

  width: calc(100% - 64px);
  max-width: calc(400px - 64px);
  padding: 24px 16px;
  border-radius: 20px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  background-color: ${({ theme }) => theme.gray[50]};
  color: ${({ theme }) => theme.gray[800]};

  word-break: keep-all;
  white-space: break-spaces;

  button {
    font-size: 1.25rem;
  }
`;

export const Title = styled.h6``;

export const Message = styled.div<{ $textSize: 'sm' | 'md' }>`
  font-size: ${({ $textSize }) => $textSize === 'sm' && '0.875rem'};
  text-align: initial;
  margin-bottom: 0.5rem;
`;
