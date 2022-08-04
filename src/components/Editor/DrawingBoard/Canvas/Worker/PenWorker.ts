import { TimeTicket } from "yorkie-js-sdk";
import { ToolType } from "../../../../../store/slices/boardSlices";
import { Root } from "../../../../../store/slices/docSlices";
import { Point } from "../../../../../types/canvasTypes";
import Board from "../Board";
import { createLine } from "../line";
import Worker, { Options } from "./Worker";
import * as scheduler from "../../../../../utils/scheduler";

class PenWorker extends Worker {
  type = ToolType.Pen;

  update: Function; //this is doc update

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
      const shape = createLine(point, this.options?.color!);
      root.shapes.push(shape);

      const lastShape = root.shapes.getLast();
      timeTicket = lastShape.getID();
    });

    this.createID = timeTicket!;
  }

  mousemove(point: Point) {
    // scheduler.reserveTask(point, (tasks: Array<scheduler.Task>) => {
    //   const points = compressPoints(tasks);
    //   if (tasks.length < 2) {
    //     return;
    //   }
    //   this.update((root: Root) => {
    //     const lastShape = this.getElementByID(root, this.createID!);
    //     if (!lastShape) {
    //       return;
    //     }
    //     lastShape.points.push(...points);
    //     this.board.drawAll(root.shapes);
    //   });
    // });
  }

  mouseup() {
    this.flushTask();
  }

  flushTask() {
    scheduler.flushTask();

    this.update((root: Root) => {
      if (!this.createID) {
        return;
      }

      const shape = this.getElementByID(root, this.createID!);
      if (!shape) {
        return;
      }

      // When erasing a line, it checks that the lines overlap, so do not save if there are two points below
      if (shape.points.length < 2) {
        this.deleteByID(root, this.createID!);
      }

      this.board.drawAll(root.shapes);
    });
  }
}

export default PenWorker;
