import { captureElement, downloadImage } from '@Utils/capture';
import { isKakao } from '@Utils/userAgent';

export function checkIfKakaoAndAlert() {
  const _isKakao = isKakao();

  if (_isKakao) {
    return '카카오 인앱 브라우저에서는 지원하지 않는 기능입니다.\n다른 브라우저에서 실행해 주세요. 🥰';
  }

  return null;
}

export async function captureAndDownload(element: HTMLElement, name: string) {
  const imgName = name;
  const img = await captureElement(element, imgName);
  downloadImage(img, imgName);
}

// HJ TODO: handler hook이 나을까? js function이 나을까?
