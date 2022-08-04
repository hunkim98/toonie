import { Box, Rect } from "../../../../store/slices/docSlices";
import { Point } from "../../../../types/canvasTypes";

export interface RectOptions {
  color: string;
}

/**
 * Create the basic object of the rect with point.
 */
export function createRect(point: Point, options: RectOptions): Rect {
  return {
    type: "rect",
    color: options.color,
    box: {
      x: point.x,
      y: point.y,
      width: 0,
      height: 0,
    },
    points: [{ x: point.x, y: point.y }],
  } as Rect;
}

/**
 * Draw a rect on the canvas.
 */
export function drawRect(context: CanvasRenderingContext2D, rect: Rect) {
  context.save();
  context.strokeStyle = rect.color;
  context.strokeRect(rect.box.x, rect.box.y, rect.box.width, rect.box.height);
  context.restore();
}

/**
 * Adjust the box according to the incoming point.
 */
export function adjustRectBox(shape: Rect, point: Point): Box {
  const box = cloneBox(shape.box);
  const rectPoint = shape.points[0];

  const width = point.x - rectPoint.x;
  const height = point.y - rectPoint.y;
  const aWidth = Math.abs(width);
  const aHeight = Math.abs(height);

  box.x = rectPoint.x - (width > 0 ? 0 : -width);
  box.y = rectPoint.y - (height > 0 ? 0 : -height);
  box.width = aWidth;
  box.height = aHeight;

  return box;
}

export function cloneBox(box: Box): Box {
  return {
    y: box.y,
    x: box.x,
    width: box.width,
    height: box.height,
  };
}
