import { ImageElement, Root } from "store/slices/docSlices";
import { getWorldPoint } from "utils/canvas";
import { TimeTicket } from "yorkie-js-sdk";
import { ToolType } from "../../../../../store/slices/boardSlices";
import { PanZoom, Point } from "../../../../../types/canvasTypes";
import Board from "../Board";
import Worker, { MouseMoveCallback } from "./Worker";

class PointerWorker extends Worker {
  type = ToolType.Pointer;

  update: Function;

  updatePresence: Function;

  board: Board;

  selectedElementId: TimeTicket | null = null;

  targetImage: ImageElement | null = null;

  selectedImageIndex: number | null = null;

  mouseStartPoint: Point = { x: 0, y: 0 };

  pointOffset: Point = { x: 0, y: 0 };

  constructor(update: Function, board: Board) {
    super();
    this.update = update;
    this.updatePresence = () => {};
    this.board = board;
  }

  shouldAllowPanning(point: Point, panZoom: PanZoom): boolean {
    const image = this.findImageTarget(point, panZoom);
    if (image) {
      this.targetImage = image;
      return false;
    }
    return true;
  }

  findImageTarget(point: Point, panZoom: PanZoom): ImageElement | undefined {
    const currentWorldPoint = getWorldPoint(point, panZoom);
    let target;
    this.update((root: Root) => {
      for (const image of root.images) {
        const leftTopPointOfImage = {
          x: image.position.x,
          y: image.position.y,
        };
        const rightBottomOfImage = {
          x: image.position.x + image.width,
          y: image.position.y + image.height,
        };
        console.log(leftTopPointOfImage, rightBottomOfImage, currentWorldPoint);
        if (
          currentWorldPoint.x > leftTopPointOfImage.x &&
          currentWorldPoint.x < rightBottomOfImage.x &&
          currentWorldPoint.y > leftTopPointOfImage.y &&
          currentWorldPoint.y < rightBottomOfImage.y
        ) {
          // }
          // console.log(this.selectedImageIndex, "image id");
          this.selectedElementId = image.getID();
          if (this.selectedElementId !== null) {
            this.deleteImageByID(root, this.selectedElementId);
            console.log("this is id", this.selectedElementId);
            target = image;
          }
        }
      }
    });
    return target;
  }

  mousedown(point: Point, panZoom: PanZoom) {
    // console.log(point);
    // this.findTarget(point, panZoom);
    console.log(this.targetImage);
    this.mouseStartPoint = getWorldPoint(point, panZoom);
    return;
  }

  mousemove(point: Point, panZoom: PanZoom, callback: MouseMoveCallback) {
    if (this.targetImage) {
      const currentWorldPoint = getWorldPoint(point, panZoom);
      this.pointOffset = {
        x: currentWorldPoint.x - this.mouseStartPoint.x,
        y: currentWorldPoint.y - this.mouseStartPoint.y,
      };
      callback({
        imageElement: {
          ...this.targetImage,
          position: {
            x: this.targetImage.position.x + this.pointOffset.x,
            y: this.targetImage.position.y + this.pointOffset.y,
          },
        },
      });
    }
    return;
  }

  mouseup() {
    this.targetImage = null;
    this.pointOffset = { x: 0, y: 0 };
    return;
  }

  flushTask() {
    return;
  }
}

export default PointerWorker;
