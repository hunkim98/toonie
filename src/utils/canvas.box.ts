import { Box, Rect, Shape } from "../store/slices/docSlices";
import { Point } from "../types/canvasTypes";

/**
 * Check if the point is contained inside the box.
 */
export function isInnerBox(box: Box, point: Point): boolean {
  const offsetY = box.y + box.height;
  const offsetX = box.x + box.width;

  if (box.height > 0 ? offsetY < point.y : offsetY > point.y) {
    return false;
  }
  if (box.y > point.y) {
    return false;
  }

  if (box.height > 0 ? offsetX < point.x : offsetX > point.x) {
    return false;
  }
  if (box.x > point.x) {
    return false;
  }
  return true;
}

/**
 * Check if it is a shape that can be selected.
 */
export function isSelectable(shape: Shape): shape is Rect {
  return shape.type === "rect";
}
