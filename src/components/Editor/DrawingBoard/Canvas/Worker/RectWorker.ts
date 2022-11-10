import { TimeTicket } from "yorkie-js-sdk";
import Worker, { MouseDownCallback, MouseUpCallback, Options } from "./Worker";
import { ToolType } from "../../../../../store/slices/boardSlices";
import Board from "../Board";
import { PanZoom, Point } from "../../../../../types/canvasTypes";
import { adjustRectBox, createRect } from "../rect";
import { Rect, Root } from "../../../../../store/slices/docSlices";
import { getWorldPoint } from "../../../../../utils/canvas";

class RectWorker extends Worker {
  type = ToolType.Rect;

  update: Function;

  updatePresence: Function;

  board: Board;

  private createID?: TimeTicket;

  private previewRect: Rect | undefined;

  private previewRectExtendPoint: Point | undefined;

  constructor(
    updatePresence: Function,
    update: Function,
    board: Board,
    options: Options
  ) {
    super(options);
    this.updatePresence = updatePresence;
    this.update = update;
    this.board = board;
  }

  shouldAllowPanning(point: Point, panZoom: PanZoom): boolean {
    return false;
  }
  mousedown(point: Point, panZoom: PanZoom): void {
    this.previewRect = createRect(getWorldPoint(point, panZoom), this.options!);
    // let timeTicket: TimeTicket;

    // this.update((root: Root) => {
    //   const shape = createRect(point, this.options!);
    //   root.shapes.push(shape);

    //   const lastShape = root.shapes.getLast();
    //   timeTicket = lastShape.getID();
    // });

    // this.createID = timeTicket!;
  }

  mousemove(point: Point, panZoom: PanZoom, callback: MouseDownCallback) {
    this.previewRectExtendPoint = getWorldPoint(point, panZoom);
    this.previewRect!.box = adjustRectBox(
      this.previewRect!,
      this.previewRectExtendPoint!
    );
    callback({ rectShape: { ...this.previewRect! } });
    // scheduler.reserveTask(point, (tasks: Array<scheduler.Task>) => {
    //   this.previewRect!.box = adjustRectBox(
    //     this.previewRect!,
    //     this.previewRectExtendPoint!
    //   );
    //   callback({ rectShape: { ...this.previewRect! } });
    // });
  }

  mouseup(callback: MouseUpCallback) {
    this.flushTask();
    callback({});
  }

  flushTask() {
    // scheduler.flushTask();

    if (this.previewRect) {
      this.update((root: Root) => {
        let timeTicket: TimeTicket;
        root.shapes.push({ ...this.previewRect! });
        const lastShape = root.shapes.getLast();
        timeTicket = lastShape.getID();
        this.createID = timeTicket;
        this.board.drawAll(root.shapes);
      });
    }
  }
}

export default RectWorker;
