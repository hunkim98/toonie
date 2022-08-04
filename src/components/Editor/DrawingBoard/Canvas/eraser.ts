import { EraserLine } from "../../../../store/slices/docSlices";
import { Point } from "../../../../types/canvasTypes";

type CanvasEraser = Pick<EraserLine, "type" | "points">;
/**
 * drawEraser draws the line of the eraser on the canvas.
 */
export function drawEraser(
  context: CanvasRenderingContext2D,
  line: CanvasEraser
) {
  context.save();
  context.beginPath();

  context.strokeStyle = "#ff7043";

  let isMoved = false;
  for (const p of line.points) {
    if (isMoved === false) {
      isMoved = true;
      context.moveTo(p.x, p.y);
    } else {
      context.lineTo(p.x, p.y);
    }
  }
  context.stroke();
  context.closePath();
  context.restore();
}

/**
 * Match the mouse point position for eraser
 */
export function fixEraserPoint(point: Point) {
  const eraserOffsetXSize = 8;
  const eraserOffsetYSize = 6;
  return {
    y: point.y + eraserOffsetXSize,
    x: point.x + eraserOffsetYSize,
  };
}
