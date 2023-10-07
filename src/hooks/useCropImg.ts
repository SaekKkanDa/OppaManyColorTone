import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { CropImage } from '@Recoil/app';
import curiousEmoji from 'public/images/logo/curious-emoji-3d.png';

function useCropImg() {
  const cropImg = useRecoilValue(CropImage);
  const userImg = useMemo(() => {
    if (!cropImg) return curiousEmoji.src;

    return cropImg;
  }, [cropImg]);

  return userImg;
}

export default useCropImg;
