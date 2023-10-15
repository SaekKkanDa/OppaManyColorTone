import { OmctErrorNo } from '@Constant/errorKeyValue';
import { ShareError } from '@Utils/customError';

export async function updateClipboard(newClip: string) {
  return navigator.clipboard.writeText(newClip);
}

export async function copyUrl(url: string) {
  try {
    await updateClipboard(url);
    return 'alertSuccessCopy';
  } catch (error) {
    console.error(error);
    return 'alertFailCopy';
    throw new ShareError({
      errorNo: OmctErrorNo.SHARE_CLIPBOARD_COPY_ERROR,
    });
  }
}
