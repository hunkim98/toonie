import { PanZoom } from "../../../../types/canvasTypes";
import { getScreenPoint } from "../../../../utils/canvas";

export function drawImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  panZoom: PanZoom
) {
  const screenPos = getScreenPoint({ x: 0, y: 0 }, panZoom);
  context.drawImage(
    image,
    screenPos.x,
    screenPos.y,
    image.naturalWidth * panZoom.scale,
    image.naturalHeight * panZoom.scale
  );
}
