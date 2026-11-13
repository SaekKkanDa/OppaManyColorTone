import { useCallback } from 'react';
import { EOmctErrorNo } from '@Constant/errorKeyValue';
import { canWebShare, webShare } from '@Utils/share';
import { isChrome, isKakao, isOSX } from '@Utils/userAgent';

interface Props {
  onSuccess?: () => void;
  onError?: (
    reason:
      | EOmctErrorNo.SHARE_NOT_SUPPORT_KAKAO_BROWSER
      | EOmctErrorNo.SHARE_NOT_SUPPORT_BROWSER
      | EOmctErrorNo.SHARE_NOT_SUPPORT_FUNCTION
  ) => void;
}
export const useShareWeb = ({ onSuccess, onError }: Props) => {
  const share = useCallback(async () => {
    if (isKakao()) {
      onError?.(EOmctErrorNo.SHARE_NOT_SUPPORT_KAKAO_BROWSER);
      return;
    }

    if (isChrome() && isOSX()) {
      onError?.(EOmctErrorNo.SHARE_NOT_SUPPORT_BROWSER);
      return;
    }

    if (!canWebShare) {
      onError?.(EOmctErrorNo.SHARE_NOT_SUPPORT_FUNCTION);
      return;
    }

    try {
      const shared = await webShare();
      if (shared) onSuccess?.();
    } catch {
      onError?.(EOmctErrorNo.SHARE_NOT_SUPPORT_FUNCTION);
    }
  }, [onError, onSuccess]);

  return share;
};
