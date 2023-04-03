import UAParser from 'ua-parser-js';

export function isKakao() {
  const userAgent = navigator.userAgent;

  return userAgent.includes('KAKAOTALK');
}

export function isOSX() {
  const parser = UAParser();
  const os = parser.os;

  return os.name === 'Mac OS';
}

export function isChrome() {
  const parser = UAParser();
  const browser = parser.browser;

  return browser.name === 'Chrome';
}
