import { OmctErrorNo } from '@Constant/errorKeyValue';
import { ShareError } from '@Utils/customError';

export async function updateClipboard(newClip: string) {
  return navigator.clipboard.writeText(newClip);
}

export async function copyUrl(url: string) {
  try {
    await updateClipboard(url);
    alert('링크 복사 성공! ✨');
  } catch (error) {
    console.error(error);
    alert('링크 복사에 실패했어요...🥲');
    throw new ShareError({
      errorNo: OmctErrorNo.SHARE_CLIPBOARD_COPY_ERROR,
    });
  }
}
