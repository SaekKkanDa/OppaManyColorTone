import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';

import ROUTE_PATH from '@Constant/routePath';
import resultColorData from '@Data/resultColorData';
import {
  globalBgColorAtom,
  globalTextColorAtom,
} from '@Recoil/globalStyleStore';

interface UseLateColorTypeReturn extends UseLateBaseReturn<ColorType> {}

export function useLateColorType() {
  const router = useRouter();

  const colorType: Nullable<ColorType> = useMemo(() => {
    if (router.isReady === false) return null;
    const { colorType } = router.query;

    if (checkIfColorType(colorType)) {
      return colorType;
    }

    return null;
  }, [router.isReady, router.query]);

  const status: LateStatus = useMemo(() => {
    if (router.isReady === false) return 'loading';

    if (colorType === null) return 'error';
    return 'success';
  }, [colorType, router.isReady]);

  const ret: UseLateColorTypeReturn = useMemo(() => {
    return {
      status: status,
      error: new Error('invalid color type'),
      data: colorType,
    };
  }, [colorType, status]);

  return ret;
}

function checkIfColorType(
  obj: string | string[] | undefined
): obj is ColorType {
  if (typeof obj !== 'string' || !Object.keys(resultColorData).includes(obj))
    return false;

  return true;
}

export function useClearPageTheme() {
  const [, setBgColor] = useRecoilState(globalBgColorAtom);
  const [, setTextColor] = useRecoilState(globalTextColorAtom);

  useEffect(() => {
    return () => {
      setBgColor('inherit');
      setTextColor('inherit');
    };
  }, [setBgColor, setTextColor]);
}

export function useNavigateByColorType() {
  const router = useRouter();

  const navigateByColorType = useCallback(
    (type: ColorType) => {
      const params = new URLSearchParams(router.query.toString());
      params.set('colorType', type);
      router.push(`${ROUTE_PATH.result}?${params}`);
    },
    [router]
  );

  return navigateByColorType;
}
