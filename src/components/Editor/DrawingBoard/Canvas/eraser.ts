import { EraserLine } from "../../../../store/slices/docSlices";
import { PanZoom, Point } from "../../../../types/canvasTypes";
import { getScreenPoint } from "../../../../utils/canvas";

type CanvasEraser = Pick<EraserLine, "type" | "points">;
/**
 * drawEraser draws the line of the eraser on the canvas.
 */
export function drawEraser(
  context: CanvasRenderingContext2D,
  line: CanvasEraser,
  panZoom: PanZoom
) {
  context.save();
  context.beginPath();

  context.strokeStyle = "#ff7043";

  let isMoved = false;
  for (const p of line.points) {
    const screenPos = getScreenPoint({ x: p.x, y: p.y }, panZoom);
    if (isMoved === false) {
      isMoved = true;
      context.moveTo(screenPos.x, screenPos.y);
    } else {
      context.lineTo(screenPos.x, screenPos.y);
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
