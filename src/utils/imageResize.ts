const DEFAULT_MAX_SIZE = 800;
const DEFAULT_QUALITY = 0.85;

export type ResizeOptions = {
  maxSize?: number;
  quality?: number;
  mimeType?: 'image/jpeg' | 'image/webp';
};

export async function resizeImageToDataUri(
  source: string,
  { maxSize = DEFAULT_MAX_SIZE, quality = DEFAULT_QUALITY, mimeType = 'image/jpeg' }: ResizeOptions = {},
): Promise<string> {
  const image = await loadImage(source);
  const { width, height } = fitInSquare(image.width, image.height, maxSize);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context is unavailable');
  ctx.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL(mimeType, quality);
}

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.crossOrigin = 'anonymous';
    img.src = source;
  });
}

function fitInSquare(w: number, h: number, max: number): { width: number; height: number } {
  if (w <= max && h <= max) return { width: w, height: h };
  const ratio = w >= h ? max / w : max / h;
  return {
    width: Math.round(w * ratio),
    height: Math.round(h * ratio),
  };
}
