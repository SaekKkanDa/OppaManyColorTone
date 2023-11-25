export function createConsecutiveNumbers(length: number, startNum = 0) {
  return new Array(length).fill(0).map((_, idx) => startNum + idx);
}
