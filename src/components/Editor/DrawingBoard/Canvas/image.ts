import { PanZoom, Point } from "types/canvasTypes";
import { getScreenPoint } from "utils/canvas";

export const maxImageSideLength = 1000;

export const imageBetweenDistance = 100;

export function drawImageElement(
  context: CanvasRenderingContext2D,
  HTMLImageElement: HTMLImageElement,
  panZoom: PanZoom,
  position: Point,
  width: number,
  height: number
) {
  if (HTMLImageElement.complete) {
    const screenPos = getScreenPoint(position, panZoom);
    context.drawImage(
      HTMLImageElement,
      screenPos.x,
      screenPos.y,
      width * panZoom.scale,
      height * panZoom.scale
    );
  }
}
