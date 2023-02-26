async function loadKakaoSDK() {
  const script = document.createElement('script');
  script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js';
  script.integrity =
    'sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx';
  script.crossOrigin = 'anonymous';

  return new Promise((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
}

export async function initKakaoSDK() {
  await loadKakaoSDK();
  const { VITE_KAKAO_API_KEY } = import.meta.env;
  Kakao.init(VITE_KAKAO_API_KEY);
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
      description: '퍼스널 칼러를 찾아보세요',
      imageUrl:
        'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
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
