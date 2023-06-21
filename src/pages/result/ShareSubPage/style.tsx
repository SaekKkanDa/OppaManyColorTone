import styled from 'styled-components';
import Image from 'next/image';
import { Button, flexCustom } from '@Styles/theme';

export const MenuContainer = styled.div`
  ${flexCustom('row', 'inherit', 'space-around')}
  padding: 36px 32px;
`;

export const MenuItemWrapper = styled.div`
  ${flexCustom('column', 'center', 'center')}
`;

export const MenuItemButton = styled.button`
  ${flexCustom('column', 'center', 'center')}
  border-radius: 50%;
  background-color: ${({ theme }) => theme.gray[800]};
  padding: 10px;
  width: 48px;
  height: 48px;
  aspect-ratio: 1/1;
  font-size: 48px;
  cursor: pointer;

  svg {
    width: 100%;
  }
`;

export const KakaoShareButton = styled.button`
  ${flexCustom('column', 'center', 'center')}
  border-radius: 50%;
  width: 48px;
  height: 48px;
  aspect-ratio: 1/1;
  cursor: pointer;
`;

export const MenuItemImg = styled(Image)`
  max-width: 100%;
`;

export const MenuItemName = styled.div`
  margin-top: 4px;
  text-align: center;
  font-size: 12px;
`;

export const ButtonsWrapper = styled.div`
  ${flexCustom('row', 'center', 'center')}
  column-gap: 12px;
  padding: 0 32px 36px;

  button,
  a {
    flex: 1 1 0;
    width: 100%;
    font-size: 20px;
  }
`;

export const AllTypesButton = styled(Button)`
  border: 2px solid ${({ theme }) => theme.gray[800]};
`;
