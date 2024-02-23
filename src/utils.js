/**
 * @param {string} key
 */
export function findCookie(key) {
  return document.cookie.split("; ").find(it => it.startsWith(key))?.split("=")?.[1];
}
