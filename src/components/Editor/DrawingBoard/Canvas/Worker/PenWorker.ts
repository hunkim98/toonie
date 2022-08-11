import { TimeTicket } from "yorkie-js-sdk";
import { ToolType } from "../../../../../store/slices/boardSlices";
import { Line, Root } from "../../../../../store/slices/docSlices";
import { Point } from "../../../../../types/canvasTypes";
import Board from "../Board";
import { createLine, drawLine } from "../line";
import Worker, { MouseDownCallback, MouseUpCallback, Options } from "./Worker";
import * as scheduler from "../../../../../utils/scheduler";
import { compressPoints } from "../../../../../utils/canvas.line";

class PenWorker extends Worker {
  type = ToolType.Pen;

  update: Function; //this is doc update

  updatePresence: Function;

  board: Board;

  private createID?: TimeTicket;

  private selectPoint: Point[] = [];

  private previewPoints: { points: Point[]; color: string };

  constructor(
    updatePresence: Function,
    update: Function,
    board: Board,
    options: Options
  ) {
    super(options);
    this.update = update;
    this.board = board;
    this.updatePresence = updatePresence;
    console.log(this.options!.color);
    this.previewPoints = { points: [], color: this.options!.color };
  }

  mousedown(point: Point, callback: MouseDownCallback): void {
    this.selectPoint = [point, point];
    this.previewPoints = { points: [point, point], color: this.options!.color };
  }

  mousemove(point: Point, callback: MouseDownCallback) {
    this.previewPoints.points.push(point);
    callback({ penPoints: { ...this.previewPoints } });
  }

  mouseup(callback: MouseDownCallback) {
    //send data from presence to document
    this.flushTask();
    this.previewPoints = { ...this.previewPoints, points: [] };
    callback({}); //initialize
  }

  flushTask() {
    if (this.previewPoints.points.length !== 0) {
      const points = compressPoints(this.previewPoints.points);
      this.update((root: Root) => {
        let timeTicket: TimeTicket;
        root.shapes.push({
          type: "line",
          color: this.previewPoints.color,
          points: points,
        } as Line);
        const lastShape = root.shapes.getLast();
        timeTicket = lastShape.getID();
        this.createID = timeTicket;
        this.board.drawAll(root.shapes);
      });
    }

    this.previewPoints = { ...this.previewPoints, points: [] };
  }
}

export default PenWorker;
