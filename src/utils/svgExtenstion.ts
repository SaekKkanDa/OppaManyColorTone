export interface ViewBox {
  minX: number;
  minY: number;
  width: number;
  height: number;
}
export interface Point {
  y: number;
  x: number;
}

export interface Line {
  from: Point;
  to: Point;
}

export interface CurvePath {
  viewBox: ViewBox;
  line1: Line;
  line2: Line;
}

export const pointToString = (point: Point) => {
  const { x, y } = point;
  return `${x} ${y}`;
};

export const curveToString = (path: CurvePath, isComplement: boolean) => {
  const { viewBox, line1, line2 } = path;
  const { minX, minY, width, height } = viewBox;

  const line1From = pointToString(line1.from);
  const line1To = pointToString(line1.to);

  const line2From = pointToString(line2.from);
  const line2To = pointToString(line2.to);

  const complement = isComplement
    ? `L ${width} ${minY} L ${minX} ${minY}`
    : `L ${width} ${height} L ${minX} ${height}`;

  return `M ${line1From} C ${line1To}, ${line2From}, ${line2To} ${complement}`;
};
