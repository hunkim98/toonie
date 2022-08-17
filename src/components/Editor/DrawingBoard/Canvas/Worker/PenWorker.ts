import { TimeTicket } from "yorkie-js-sdk";
import { ToolType } from "../../../../../store/slices/boardSlices";
import { Line, Root } from "../../../../../store/slices/docSlices";
import { PanZoom, Point } from "../../../../../types/canvasTypes";
import Board from "../Board";
import Worker, { MouseDownCallback, MouseUpCallback, Options } from "./Worker";
import { compressPoints } from "../../../../../utils/canvas.line";
import { scalePoint } from "../../../../../utils/canvas";

class PenWorker extends Worker {
  type = ToolType.Pen;

  update: Function; //this is doc update

  updatePresence: Function;

  board: Board;

  private createID?: TimeTicket;

  private previewPoints: {
    points: Point[];
    color: string;
    strokeWidth: number;
  };

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
    this.previewPoints = {
      points: [],
      color: this.options!.color,
      strokeWidth: this.options!.strokeWidth,
    };
  }

  mousedown(point: Point, panZoom: PanZoom, callback: MouseDownCallback): void {
    this.previewPoints = {
      points: [
        scalePoint(point, panZoom.scale),
        scalePoint(point, panZoom.scale),
      ],
      color: this.options!.color,
      strokeWidth: this.options!.strokeWidth,
    };
  }

  mousemove(point: Point, panZoom: PanZoom, callback: MouseDownCallback) {
    this.previewPoints.points.push(scalePoint(point, panZoom.scale));
    callback({ penPoints: { ...this.previewPoints } });
  }

  mouseup(callback: MouseUpCallback) {
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
          strokeWidth: this.previewPoints.strokeWidth,
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
