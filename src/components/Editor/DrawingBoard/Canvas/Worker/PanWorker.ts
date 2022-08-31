import { ToolType } from "../../../../../store/slices/boardSlices";
import { PanZoom, Point } from "../../../../../types/canvasTypes";
import Board from "../Board";
import Worker from "./Worker";

class PanWorker extends Worker {
  type = ToolType.Pan;

  update: Function;

  updatePresence: Function;

  board: Board;

  constructor(board: Board) {
    super();
    this.update = () => {};
    this.updatePresence = () => {};
    this.board = board;
  }

  mousedown(point: Point, panZoom: PanZoom) {
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

export default PanWorker;
