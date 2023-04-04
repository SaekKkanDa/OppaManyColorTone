import { UAParser } from 'ua-parser-js';

export function isKakao() {
  const userAgent = navigator.userAgent;

  return userAgent.includes('KAKAOTALK');
}

export function isOSX() {
  const parser = UAParser(navigator.userAgent);
  const os = parser.os;

  return os.name === 'macOS';
}

export function isChrome() {
  const parser = UAParser(navigator.userAgent);
  const browser = parser.browser;

  return browser.name === 'Chrome';
}
