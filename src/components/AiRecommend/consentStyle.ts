import styled from 'styled-components';

import { Button, BorderedButton, flexCustom } from '@Styles/theme';

export const ConsentWrapper = styled.div`
  ${flexCustom('column', 'flex-start', 'center')}
  row-gap: 1rem;
  padding-bottom: 1rem;

  & h1 {
    font-size: ${({ theme }) => theme.font.size.lg};
    font-family: inherit;
    font-weight: 600;
  }

  & ul {
    list-style-type: disc;
    color: ${({ theme }) => theme.gray[600]};

    & li {
      margin-left: 1.5rem;
      font-size: ${({ theme }) => theme.font.size.sm};
    }
  }

  & p {
    font-size: ${({ theme }) => theme.font.size.xs};
    color: ${({ theme }) => theme.gray[400]};
  }
`;

export const ButtonRow = styled.div`
  ${flexCustom('row', 'center', 'center')}
  column-gap: 0.5rem;
`;

export const PrimaryButton = styled(Button)`
  flex-basis: 60%;
`;

export const SecondaryButton = styled(BorderedButton)`
  flex-basis: 40%;
`;
