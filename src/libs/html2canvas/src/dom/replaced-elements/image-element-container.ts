import { ElementContainer } from '../element-container';
import { Context } from '../../core/context';

export class ImageElementContainer extends ElementContainer {
  src: string;
  intrinsicWidth: number;
  intrinsicHeight: number;

  constructor(context: Context, img: HTMLImageElement) {
    super(context, img);
    this.src = img.currentSrc || img.src;
    this.intrinsicWidth = img.naturalWidth * Math.floor(devicePixelRatio);
    this.intrinsicHeight = img.naturalHeight * Math.floor(devicePixelRatio);
    this.context.cache.addImage(this.src);
  }
}
