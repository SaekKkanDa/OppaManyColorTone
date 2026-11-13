// only working in https
export const canWebShare =
  typeof window !== 'undefined' && typeof navigator.share === 'function';

const isShareCancelled = (error: unknown) =>
  error instanceof Error && error.name === 'AbortError';

/**
 * Web Share API 호출.
 * - 공유 완료: true
 * - 사용자가 공유 시트를 닫음(AbortError): false — 정상 흐름이므로 에러로 취급하지 않음
 * - 그 외 실패(NotAllowedError 등): throw
 */
export async function webShare(): Promise<boolean> {
  const shareData = {
    title: '리트머스 페이스 - 퍼스널 컬러 자가진단',
    text: '나에게 어울리는 컬러는 무엇일까?',
    url:
      typeof window !== 'undefined'
        ? window.location.href
        : 'https://omct.web.app/',
  };

  try {
    await navigator.share(shareData);
    return true;
  } catch (error) {
    if (isShareCancelled(error)) return false;
    throw error;
  }
}
