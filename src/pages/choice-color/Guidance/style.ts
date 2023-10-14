import styled from 'styled-components';

export const Explanation = styled.div`
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
