async function loadKakaoSDK() {
  const script = document.createElement('script');
  script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js';
  script.integrity =
    'sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx';
  script.crossOrigin = 'anonymous';

  return new Promise<void>((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
}

export async function initKakaoSDK() {
  await loadKakaoSDK();
  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  Kakao.init(KAKAO_API_KEY);
}

export function shareKakaoDefault() {
  if (Object.hasOwn(window, 'Kakao') === false) return;

  // HJ TODO: 도메인 나오면 등록
  // HJ TODO: image url 수정
  // HJ TODO: url 뒤 값 수정
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '오빠 톤 많아?',
      description: '퍼스널 컬러 자가진단',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/oppamanycolortone-5fb42.appspot.com/o/preview%2Fkakao-share-preview.png?alt=media&token=d209f2d5-e3f8-4a1d-97d6-8d87b220b8a4',
      link: {
        mobileWebUrl: location.href,
        webUrl: location.href,
      },
    },
    social: {
      likeCount: 953,
      commentCount: 1234,
      sharedCount: 9999,
    },
    buttons: [
      {
        title: '나의 퍼스널 컬러 찾기',
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href,
        },
      },
    ],
  });
}
