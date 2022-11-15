import { ImageElement, Root } from "store/slices/docSlices";
import { getWorldPoint } from "utils/canvas";
import { TimeTicket } from "yorkie-js-sdk";
import { ToolType } from "../../../../../store/slices/boardSlices";
import { PanZoom, Point } from "../../../../../types/canvasTypes";
import Board from "../Board";
import Worker from "./Worker";

class PointerWorker extends Worker {
  type = ToolType.Pointer;

  update: Function;

  updatePresence: Function;

  board: Board;

  selectedImageId: TimeTicket | null = null;

  selectedImageIndex: number | null = null;

  constructor(update: Function, board: Board) {
    super();
    this.update = update;
    this.updatePresence = () => {};
    this.board = board;
  }

  shouldAllowPanning(point: Point, panZoom: PanZoom): boolean {
    const image = this.findTarget(point, panZoom);
    if (image) {
      return false;
    }
    return true;
  }

  findTarget(point: Point, panZoom: PanZoom): ImageElement | undefined {
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
          console.log(this.selectedImageIndex, "image id");
          target = image;
        }
      }
    });
    return target;
  }

  mousedown(point: Point, panZoom: PanZoom) {
    // console.log(point);
    // this.findTarget(point, panZoom);
    if (this.selectedImageIndex !== null) {
      console.log("hihi");
      this.update((root: Root) => {
        // console.log(root.images);
        for (const image of root.images) {
          console.log(image.getID(), image.name);
        }
      });
    }
    return;
  }

  mousemove(point: Point, panZoom: PanZoom) {
    return;
  }

  mouseup() {
    return;
  }

  flushTask() {
    return;
  }
}

export default PointerWorker;
