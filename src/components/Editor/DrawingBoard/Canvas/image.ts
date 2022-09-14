import { ImageElement } from "store/slices/docSlices";
import { PanZoom, Point } from "types/canvasTypes";
import { getScreenPoint } from "utils/canvas";

export const maxImageSideLength = 1000;

export function drawImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  panZoom: PanZoom,
  imgUrl: string | undefined
) {
  if (image.complete) {
    const screenPos = getScreenPoint({ x: 0, y: 0 }, panZoom);
    const maxSideLength = 1000;
    let imageWidth = image.naturalWidth;
    let imageHeight = image.naturalHeight;
    const isWidthLonger = imageWidth > imageHeight;
    if (isWidthLonger) {
      if (imageWidth > maxSideLength) {
        imageHeight = (maxSideLength * imageHeight) / imageWidth;
        imageWidth = maxSideLength;
      }
    } else {
      if (imageHeight > maxSideLength) {
        imageWidth = (maxSideLength * imageWidth) / imageHeight;
        imageHeight = maxSideLength;
      }
    }
    context.drawImage(
      image,
      screenPos.x,
      screenPos.y,
      imageWidth * panZoom.scale,
      imageHeight * panZoom.scale
    );
    return {
      x: screenPos.x,
      y: screenPos.y,
      width: imageWidth * panZoom.scale,
      height: imageHeight * panZoom.scale,
    };
  } else {
    if (imgUrl) {
      const img = new Image();
      image = img;
      img.crossOrigin = "Anonymous";
      img.onerror = (err) => {
        console.log(err, "image error!");
      };
      img.src = imgUrl;
    }
    return undefined;
  }
}

export function drawImageElement(
  context: CanvasRenderingContext2D,
  HTMLImageElement: HTMLImageElement,
  panZoom: PanZoom,
  position: Point
) {
  if (HTMLImageElement.complete) {
    const screenPos = getScreenPoint(position, panZoom);
    let imageWidth = HTMLImageElement.naturalWidth;
    let imageHeight = HTMLImageElement.naturalHeight;
    const isWidthLonger = imageWidth > imageHeight;
    if (isWidthLonger) {
      if (imageWidth > maxImageSideLength) {
        imageHeight = (maxImageSideLength * imageHeight) / imageWidth;
        imageWidth = maxImageSideLength;
      }
    } else {
      if (imageHeight > maxImageSideLength) {
        imageWidth = (maxImageSideLength * imageWidth) / imageHeight;
        imageHeight = maxImageSideLength;
      }
    }
    context.drawImage(
      HTMLImageElement,
      screenPos.x,
      screenPos.y,
      imageWidth * panZoom.scale,
      imageHeight * panZoom.scale
    );
  }
}
