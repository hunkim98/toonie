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

  private previewPoints: Point[];

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
    this.previewPoints = [];
  }

  mousedown(point: Point, callback: MouseDownCallback): void {
    // let timeTicket: TimeTicket;
    this.selectPoint = [point, point];
    this.previewPoints = [point, point];
    // callback({ penPoints: [...this.selectPoint] });
    // this.update((root: Root) => {
    //   const shape = createLine(point, this.options?.color!);
    //   root.shapes.push(shape);

    //   const lastShape = root.shapes.getLast();
    //   timeTicket = lastShape.getID();
    // });

    // this.createID = timeTicket!;
  }

  mousemove(point: Point, callback: MouseDownCallback) {
    // this.previewPoints.push(point);
    // this.board.drawAllPreview([
    //   { type: "line", points: this.previewPoints, color: "#000000" } as Line,
    // ]);
    this.previewPoints.push(point);
    callback({ penPoints: [...this.previewPoints] });
    // scheduler.reserveTask(point, (tasks: Array<scheduler.Task>) => {
    // compressPoints(tasks);
    // if (tasks.length < 1) {
    //   return;
    // }
    // this.board.drawAllPreview(points);
    // this.update((root: Root) => {
    //   const lastShape = this.getElementByID(root, this.createID!);
    //   if (!lastShape) {
    //     return;
    //   }
    //   lastShape.points.push(...points);
    //   this.board.drawAll(root.shapes);
    // });
    // });
  }

  mouseup(callback: MouseDownCallback) {
    //send data from presence to document
    this.flushTask();
    this.previewPoints = [];
    callback({}); //initialize
  }

  flushTask() {
    // scheduler.flushTask();

    if (this.previewPoints.length !== 0) {
      const points = compressPoints(this.previewPoints);
      this.update((root: Root) => {
        let timeTicket: TimeTicket;
        console.log(this.previewPoints);
        root.shapes.push({
          type: "line",
          color: "#000000",
          points: points,
        } as Line);
        const lastShape = root.shapes.getLast();
        console.log(points);
        timeTicket = lastShape.getID();
        this.createID = timeTicket;
        root.shapes[root.shapes.length - 1].points.map((element) => {
          console.log(element);
        });
        this.board.drawAll(root.shapes);
      });
    }

    // this.update((root: Root) => {
    //   if (!this.createID) {
    //     return;
    //   }

    //   const shape = this.getElementByID(root, this.createID!);
    //   if (!shape) {
    //     return;
    //   }

    //   // When erasing a line, it checks that the lines overlap, so do not save if there are two points below
    //   if (shape.points.length < 2) {
    //     this.deleteByID(root, this.createID!);
    //   }

    //   this.board.drawAll(root.shapes);
    // });
    this.previewPoints = [];
  }
}

export default PenWorker;
