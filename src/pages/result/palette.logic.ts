import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import {
  globalBgColorAtom,
  globalTextColorAtom,
} from '@Recoil/globalStyleStore';
import { invertColor } from '@Utils/colorExtension';

export function useChangeTheme() {
  const [, setBgColor] = useRecoilState(globalBgColorAtom);
  const [, setTextColor] = useRecoilState(globalTextColorAtom);

  const changeTheme = useCallback(
    (color: string) => {
      setTimeout(() => {
        setBgColor(color);
        setTextColor(invertColor(color, true));
      }, 1000);
    },
    [setBgColor, setTextColor]
  );

  return changeTheme;
}
