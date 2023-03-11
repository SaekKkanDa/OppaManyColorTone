import html2canvas from 'html2canvas';

export async function captureElement(targetElement, name) {
  const canvas = await html2canvas(targetElement);
  const img = canvas.toDataURL(name);

  return img;
}

export function downloadImage(img, name) {
  const link = document.createElement('a');
  link.href = img;
  link.download = name;
  link.click();

  link.remove();
}
