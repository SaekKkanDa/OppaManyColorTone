/**
 * checking object if is null + undefined or not
 * if object is 0, this functions consider as true
 */
export function isFalse<T>(obj: T | undefined | null): obj is undefined | null {
  if (obj === undefined || obj === null) return true;

  return false;
}

/**
 * checking object if is null + undefined or not
 * if object is 0, this functions consider as true
 */
export function isTrue<T>(obj: T | undefined | null): obj is T {
  return !isFalse(obj);
}

export function isEmpty<T extends string | Array<unknown>>(obj: T) {
  if (obj.length === 0) return true;
  return false;
}
