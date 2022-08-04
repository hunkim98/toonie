import fitCurve from "fit-curve";
import { Line } from "../../../../store/slices/docSlices";
import { Point } from "../../../../types/canvasTypes";

type CanvasLine = Pick<Line, "type" | "points" | "color">;

export function createLine(point: Point, color: string): Line {
  return {
    type: "line",
    color,
    points: [point],
  } as Line;
}

export function drawLine(context: CanvasRenderingContext2D, line: CanvasLine) {
  if (line.points.length < 3) {
    return;
  }
  const points = [];
  for (const p of line.points) {
    points.push([p.x, p.y]);
  }
  const curves = fitCurve(points, 2);

  if (!curves.length) {
    return;
  }

  context.save();
  context.beginPath();
  context.strokeStyle = "#000000";

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
