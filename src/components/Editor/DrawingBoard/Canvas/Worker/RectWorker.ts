import { TimeTicket } from "yorkie-js-sdk";
import Worker, { Options } from "./Worker";
import * as scheduler from "../../../../../utils/scheduler";
import { ToolType } from "../../../../../store/slices/boardSlices";
import Board from "../Board";
import { Point } from "../../../../../types/canvasTypes";
import { adjustRectBox, createRect } from "../rect";
import { Rect, Root } from "../../../../../store/slices/docSlices";

class RectWorker extends Worker {
  type = ToolType.Rect;

  update: Function;

  board: Board;

  private createID?: TimeTicket;

  constructor(update: Function, board: Board, options: Options) {
    super(options);
    this.update = update;
    this.board = board;
  }

  mousedown(point: Point): void {
    let timeTicket: TimeTicket;

    this.update((root: Root) => {
      const shape = createRect(point, this.options!);
      root.shapes.push(shape);

      const lastShape = root.shapes.getLast();
      timeTicket = lastShape.getID();
    });

    this.createID = timeTicket!;
  }

  mousemove(point: Point) {
    scheduler.reserveTask(point, (tasks: Array<scheduler.Task>) => {
      if (tasks.length < 2) {
        return;
      }

      this.update((root: Root) => {
        const lastPoint = tasks[tasks.length - 1];
        const lastShape = this.getElementByID(root, this.createID!) as Rect;
        if (!lastShape) {
          return;
        }

        const box = adjustRectBox(lastShape, lastPoint);
        lastShape.box = box;

        this.board.drawAll(root.shapes);
      });
    });
  }

  mouseup() {
    this.flushTask();
  }

  flushTask() {
    scheduler.flushTask();
  }
}

export default RectWorker;
