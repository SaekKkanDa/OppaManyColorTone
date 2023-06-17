import styled, { keyframes } from 'styled-components';
import { flexCustom } from '@Styles/theme';

export const PaletteWrapper = styled.div`
  width: 100%;
  ${flexCustom('row', 'flex-start', 'center')}
  position: relative;
  aspect-ratio: 1/1;
  margin: 24px auto 0 auto;
`;

const blink = keyframes`
  50% {
    opacity: 0;
  }

`;
export const InteractionInfo = styled.div`
  position: absolute;
  top: 15px;
  animation: ${blink} 1.5s linear infinite;
  color: white;
  font-size: 0.9rem;
`;
