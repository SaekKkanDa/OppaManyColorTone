// only working in https
export const canWebShare =
  typeof window !== 'undefined' && typeof navigator.share === 'function';

export async function webShare() {
  const shareData = {
    title: '오빠 톤 많아? 퍼스널 컬러 자가진단',
    text: '나에게 어울리는 컬러는 무엇일까?',
    url:
      typeof window !== 'undefined'
        ? window.location.href
        : 'https://omct.web.app/',
  };

  return navigator.share(shareData);
}
