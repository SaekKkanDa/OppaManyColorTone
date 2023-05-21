export async function updateClipboard(newClip: string) {
  return navigator.clipboard.writeText(newClip);
}
