export async function LoadImage(src: string) {
  const img = new Image();
  img.src = src;

  // wait for loading image
  await new Promise<void>((resolve) => {
    if (img.complete == true) {
      resolve();
      return;
    }
    img.onload = () => {
      resolve();
    };
  });

  return img;
}
