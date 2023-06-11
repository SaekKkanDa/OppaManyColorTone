import { LoadImage } from '@Utils/mediaExtension';

interface MousePoint {
  isValid: boolean;
  angle: number;
  y: number;
  x: number;
}

interface Arc {
  startAngle: number;
  endAngle: number;
  color: string;
}

class ColorPalette {
  private m_canvas: HTMLCanvasElement;
  private m_ctx: CanvasRenderingContext2D;
  private m_isCircle: boolean;
  private m_img!: HTMLImageElement;
  private m_colors: string[];
  private m_width: number;
  private m_height: number;
  private m_isInitialized: boolean;
  private m_mousePoint: MousePoint;
  private m_onClick?: (color: string) => void;

  private readonly ImageWidth = 100;
  private readonly ImageHeight = 100;
  private readonly BlurColor = 'rgb(0 0 0 / 0.3)';
  private readonly BlurSize = 10;

  constructor(
    canvas: HTMLCanvasElement,
    imgSrc: string,
    colors: string[],
    isCircle = false,
    onClick?: (color: string) => void
  ) {
    this.m_canvas = canvas;
    this.m_isInitialized = false;
    this.m_colors = colors;
    this.m_isCircle = isCircle;
    this.m_width = canvas.width;
    this.m_height = canvas.height;
    this.m_mousePoint = { isValid: false, x: 0, y: 0, angle: 0 };
    this.m_onClick = onClick;

    // setting context
    const ctx = canvas.getContext('2d');
    if (ctx == null) throw new Error('context is null');
    this.m_ctx = ctx;
    this.m_ctx.shadowColor = this.BlurColor;

    // change coordinate from left-top to center
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // caching image element
    LoadImage(imgSrc).then((img) => {
      this.m_img = img;
      this.m_isInitialized = true;
    });

    // add canvas event listener
    this.m_canvas.addEventListener('click', this.onClick.bind(this));
    this.m_canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.m_canvas.addEventListener('mouseout', this.onMouseOut.bind(this));
  }

  public async draw() {
    this.drawColors();
    this.drawImg();
  }

  public destroy() {
    this.clear();

    // remove event listener
    this.m_canvas.removeEventListener('click', this.onClick.bind(this));
    this.m_canvas.removeEventListener('mousemove', this.onMouseMove.bind(this));
    this.m_canvas.removeEventListener('mouseout', this.onMouseOut.bind(this));
  }

  public clear() {
    const ctx = this.m_ctx;

    ctx.clearRect(
      -1 * (this.m_width / 2),
      -1 * (this.m_height / 2),
      this.m_width,
      this.m_height
    );
  }

  private onClick() {
    const radian = (Math.PI * 2) / this.m_colors.length;
    let startAngle = 0;
    for (const color of this.m_colors) {
      const endAngle = startAngle + radian;
      if (this.checkIfHover(startAngle, endAngle) == true) {
        this.m_onClick?.(color);
        break;
      }
      startAngle = endAngle;
    }
  }

  private onMouseMove(e: MouseEvent) {
    const x = e.offsetX - this.m_width / 2;
    const y = e.offsetY - this.m_height / 2;

    // check if point is inside the image circle
    const imageRadius = this.ImageWidth / 2;
    if (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(imageRadius, 2)) {
      this.m_mousePoint.isValid = false;
    } else {
      const dy = y - 0;
      const dx = x - 0;
      let angle = Math.atan2(dy, dx);
      if (angle < 0) angle += Math.PI * 2;

      this.m_mousePoint = { isValid: true, x, y, angle };
    }
  }

  private onMouseOut() {
    this.m_mousePoint.isValid = false;
  }

  private drawImg() {
    const ctx = this.m_ctx;

    if (this.m_isInitialized == true) {
      const radius = this.ImageWidth / 2;
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(
        this.m_img,
        (-1 * this.ImageWidth) / 2,
        (-1 * this.ImageHeight) / 2,
        this.ImageWidth,
        this.ImageHeight
      );

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.closePath();
      ctx.restore();
    }
  }

  private drawBackground(hoveredColor: string) {
    const ctx = this.m_ctx;

    if (this.m_isInitialized == true) {
      ctx.beginPath();

      ctx.arc(0, 0, this.ImageWidth, 0, 2 * Math.PI);

      ctx.fillStyle = hoveredColor;
      ctx.fill();
    }
  }

  private drawColors() {
    const radian = (Math.PI * 2) / this.m_colors.length;

    // in case rectangle, just increase size of radius
    const radius = this.m_isCircle
      ? this.m_width / 2 - this.BlurSize
      : Math.sqrt(Math.pow(this.m_width, 2) + Math.pow(this.m_height, 2));

    let startAngle = 0;
    let hoveredArc: Arc | null = null;
    for (const color of this.m_colors) {
      const endAngle = startAngle + radian;
      if (this.checkIfHover(startAngle, endAngle) == true) {
        hoveredArc = { startAngle, endAngle, color };
      } else {
        this.drawArc(radius, startAngle, endAngle, color, false);
      }
      startAngle = endAngle;
    }

    if (hoveredArc) {
      this.drawArc(
        radius,
        hoveredArc.startAngle,
        hoveredArc.endAngle,
        hoveredArc.color,
        true
      );

      this.drawBackground(hoveredArc.color);
    }
  }

  private drawArc(
    radius: number,
    startAngle: number,
    endAngle: number,
    color: string,
    isShadow: boolean
  ) {
    const ctx = this.m_ctx;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, startAngle - 0.01, endAngle);
    if (isShadow) {
      ctx.shadowBlur = this.BlurSize;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  private checkIfHover(startAngle: number, endAngle: number) {
    if (this.m_mousePoint.isValid == false) return false;

    const angle = this.m_mousePoint.angle;
    const ret = startAngle <= angle && angle < endAngle;

    return ret;
  }
}

export default ColorPalette;
