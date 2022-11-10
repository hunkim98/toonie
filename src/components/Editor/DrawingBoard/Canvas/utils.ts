import { ImageElement } from "store/slices/docSlices";
import { Point } from "types/canvasTypes";

/**
 * Check if the point is contained inside the image.
 */
export function isInnerImage(image: ImageElement, point: Point): boolean {
  const offsetY = image.position.y + image.height;
  const offsetX = image.position.x + image.width;

  if (offsetY > point.y) {
    return false;
  }
  if (image.position.y > point.y) {
    return false;
  }

  if (offsetX < point.x) {
    return false;
  }
  if (image.position.x > point.x) {
    return false;
  }
  return true;
}
