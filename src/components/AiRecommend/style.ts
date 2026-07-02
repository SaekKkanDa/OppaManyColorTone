import styled, { css, keyframes } from 'styled-components';

import { flexCustom } from '@Styles/theme';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Wrapper = styled.div`
  ${flexCustom('column', 'center', 'center')}
  row-gap: 0.5rem;
  padding: 0.75rem 0;
`;

export const Button = styled.button<{ isDisabled?: boolean }>`
  ${flexCustom('row', 'center', 'center')}
  column-gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  background: none;
  border: none;
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.gray[400] : theme.gray[700]};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: 500;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.gray[900]};
    text-decoration: underline;
  }
`;

export const Spinner = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid ${({ theme }) => theme.gray[300]};
  border-top-color: ${({ theme }) => theme.gray[700]};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 2s;
  }
`;

export const ResultBanner = styled.div`
  ${flexCustom('column', 'stretch', 'center')}
  row-gap: 0.25rem;
  max-width: 100%;
  padding: 0.625rem 0.875rem;
  border-radius: 0.625rem;
  background-color: ${({ theme }) => theme.gray[100]};
  color: ${({ theme }) => theme.gray[800]};
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: 1.4;
`;

export const ResultLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.gray[500]};
  letter-spacing: 0.02em;
`;

const errorBase = css`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.gray[600]};
  text-align: center;
`;

export const ErrorText = styled.span`
  ${errorBase}
`;

export const RetryLink = styled.button`
  ${errorBase}
  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 0.375rem;
`;

export const PrivacyLink = styled.a`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.gray[400]};
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.gray[600]};
  }
`;
