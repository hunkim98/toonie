import { PanZoom, Point } from "../types/canvasTypes";
import { addPoints, diffPoints, getScreenPoint, getWorldPoint } from "./canvas";

export const returnScrollOffsetFromMouseOffset = (
  mouseOffset: Point,
  currentPanZoom: PanZoom,
  newScale: number
) => {
  const worldPos = getWorldPoint(mouseOffset, currentPanZoom);
  const newMousePos = getScreenPoint(worldPos, {
    scale: newScale,
    offset: currentPanZoom.offset,
  });
  const scaleOffset = diffPoints(mouseOffset, newMousePos);
  const offset = addPoints(currentPanZoom.offset, scaleOffset);
  return offset;
};
