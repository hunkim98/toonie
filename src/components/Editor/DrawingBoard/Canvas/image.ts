import { PanZoom } from "../../../../types/canvasTypes";
import { getScreenPoint } from "../../../../utils/canvas";

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
