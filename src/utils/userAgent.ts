export function isKakao() {
  const userAgent = navigator.userAgent;

  return userAgent.includes('KAKAOTALK');
}