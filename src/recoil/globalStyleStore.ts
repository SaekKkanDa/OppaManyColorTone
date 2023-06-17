import { atom } from 'recoil';

export const globalBgColorAtom = atom({
  key: 'globalBgColor',
  default: 'inherit',
});

export const globalTextColorAtom = atom({
  key: 'globalColor',
  default: 'inherit',
});
