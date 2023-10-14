import { captureElement, downloadImage } from '@Utils/capture';
import { isKakao } from '@Utils/userAgent';

export function checkIfKakaoAndAlert() {
  const _isKakao = isKakao();

  if (_isKakao) {
    return 'alertKakao';
  }

  return '';
}

export async function captureAndDownload(element: HTMLElement, name: string) {
  const imgName = name;
  const img = await captureElement(element, imgName);
  downloadImage(img, imgName);
}

// HJ TODO: handler hook이 나을까? js function이 나을까?
