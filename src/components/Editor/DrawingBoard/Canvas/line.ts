import fitCurve from "fit-curve";
import { Line } from "../../../../store/slices/docSlices";
import { PanZoom, Point } from "../../../../types/canvasTypes";
import { getScreenPoint } from "../../../../utils/canvas";

type CanvasLine = Pick<Line, "type" | "points" | "color" | "strokeWidth">;

export function createLine(point: Point, color: string): Line {
  return {
    type: "line",
    color,
    points: [point],
  } as Line;
}

export function drawSmoothLine(
  context: CanvasRenderingContext2D,
  line: CanvasLine,
  panZoom: PanZoom
) {
  // if (line.points.length < 3) {
  //   return;
  // }
  const points = [];
  for (const p of line.points) {
    const screenPos = getScreenPoint({ x: p.x, y: p.y }, panZoom);
    points.push([screenPos.x, screenPos.y]);
  }
  const curves = fitCurve(points, 2);
  if (!curves.length) {
    return;
  }
  context.save();
  context.beginPath();
  context.strokeStyle = line.color;
  context.lineWidth = line.strokeWidth * panZoom.scale;

  const firstCurve = curves[0];

  context.moveTo(firstCurve[0][0], firstCurve[0][1]);
  for (const curve of curves) {
    context.bezierCurveTo(
      curve[1][0],
      curve[1][1],
      curve[2][0],
      curve[2][1],
      curve[3][0],
      curve[3][1]
    );
  }
  context.stroke();
  context.closePath();
  context.restore();
}

export function drawLine(
  context: CanvasRenderingContext2D,
  line: CanvasLine,
  panZoom: PanZoom
) {
  // if (line.points.length < 3) {
  //   return;
  // }
  const points = [];
  for (const p of line.points) {
    points.push([p.x, p.y]);
  }
  context.save();
  context.beginPath();
  context.lineWidth = line.strokeWidth * panZoom.scale;
  context.strokeStyle = line.color;
  const initialScreenPos = getScreenPoint(
    { x: points[0][0], y: points[0][1] },
    panZoom
  );
  context.moveTo(initialScreenPos.x, initialScreenPos.y);
  for (let i = 1; i < points.length; i++) {
    const screenPos = getScreenPoint(
      { x: points[i][0], y: points[i][1] },
      panZoom
    );
    context.lineTo(screenPos.x, screenPos.y);
  }
  context.stroke();
  context.closePath();
  context.restore();
}
