import { ImageElement, Root } from "store/slices/docSlices";
import { getWorldPoint } from "utils/canvas";
import { ToolType } from "../../../../../store/slices/boardSlices";
import { PanZoom, Point } from "../../../../../types/canvasTypes";
import Board from "../Board";
import Worker from "./Worker";

class PointerWorker extends Worker {
  type = ToolType.Pointer;

  update: Function;

  updatePresence: Function;

  board: Board;

  selectedImageIndex: number | null = null;

  constructor(board: Board) {
    super();
    this.update = () => {};
    this.updatePresence = () => {};
    this.board = board;
  }

  shouldAllowPanning(point: Point, panZoom: PanZoom): boolean {
    const currentWorldPoint = getWorldPoint(point, panZoom);
    for (let i = 0; i < this.board.getImages().length; i++) {
      const image = this.board.getImages()[i];
      const leftTopPointOfImage = {
        x: image.position.x,
        y: image.position.y,
      };
      const rightBottomOfImage = {
        x: image.position.x + image.width,
        y: image.position.y + image.height,
      };
      if (
        currentWorldPoint.x > leftTopPointOfImage.x &&
        currentWorldPoint.x < rightBottomOfImage.x &&
        currentWorldPoint.y > leftTopPointOfImage.y &&
        currentWorldPoint.y < rightBottomOfImage.y
      ) {
        this.selectedImageIndex = i;
        return false;
      }
    }
    this.selectedImageIndex = null;
    return true;
  }

  mousedown(point: Point, panZoom: PanZoom) {
    // console.log(point);
    // this.findTarget(point, panZoom);
    if (this.selectedImageIndex !== null) {
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
