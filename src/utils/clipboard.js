export async function updateClipboard(newClip) {
    return navigator.clipboard.writeText(newClip);
}