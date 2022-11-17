import { ToolType } from "../../../../../store/slices/boardSlices";
import { Box, Root } from "../../../../../store/slices/docSlices";
import { PanZoom, Point } from "../../../../../types/canvasTypes";
import { getWorldPoint } from "../../../../../utils/canvas";
import { isInnerBox, isSelectable } from "../../../../../utils/canvas.box";
import {
  checkLineIntersection,
  compressPoints,
} from "../../../../../utils/canvas.line";
import * as scheduler from "../../../../../utils/scheduler";
import Board from "../Board";
import { fixEraserPoint } from "../eraser";
import Worker, { MouseDownCallback, MouseMoveCallback } from "./Worker";

class EraserWorker extends Worker {
  type = ToolType.Eraser;

  update: Function;

  updatePresence: Function;

  board: Board;

  private eraserBoxSize: number = 24;

  private selectPoint: Point[] = [];

  constructor(updatePresence: Function, update: Function, board: Board) {
    super();
    this.update = update;
    this.updatePresence = updatePresence;
    this.board = board;
  }

  shouldAllowPanning(point: Point, panZoom: PanZoom): boolean {
    return false;
  }

  mousedown(point: Point, panZoom: PanZoom, callback: MouseDownCallback): void {
    this.selectPoint = [
      getWorldPoint(point, panZoom),
      getWorldPoint(point, panZoom),
    ];
    callback({ eraserPoints: [...this.selectPoint] });
  }

  mousemove(point: Point, panZoom: PanZoom, callback: MouseMoveCallback) {
    scheduler.reserveTask(point, (tasks: Array<scheduler.Task>) => {
      const points = compressPoints(tasks);

      if (tasks.length < 2) {
        return;
      }

      //this should be changed to using metadata
      this.update((root: Root) => {
        const pointStart = fixEraserPoint(getWorldPoint(points[0], panZoom));
        const pointEnd = fixEraserPoint(
          getWorldPoint(points[points.length - 1], panZoom)
        );

        const findAndRemoveShape = (point1: Point, point2: Point) => {
          for (const shape of root.shapes) {
            if (shape.type === "eraser") {
              continue;
            }
            if (isSelectable(shape)) {
              if (isInnerBox(shape.box, point2)) {
                this.deleteShapeByID(root, shape.getID());
              }
            } else {
              for (let i = 1; i < shape.points.length; i += 1) {
                const shapePoint1 = shape.points[i - 1];
                const shapePoint2 = shape.points[i];
                if (isInnerBox(this.eraserBox(point2), shapePoint2)) {
                  this.deleteShapeByID(root, shape.getID());
                  break;
                }

                if (isInnerBox(this.eraserBox(point1), shapePoint2)) {
                  this.deleteShapeByID(root, shape.getID());
                  break;
                }

                const result = checkLineIntersection(
                  point1,
                  point2,
                  shapePoint1,
                  shapePoint2
                );
                if (result.onLine1 && result.onLine2) {
                  this.deleteShapeByID(root, shape.getID());
                  break;
                }
              }
            }
          }
        };

        if (this.selectPoint.length > 0) {
          const lastPoint = this.selectPoint[this.selectPoint.length - 1];
          findAndRemoveShape(lastPoint, pointStart);
        }

        findAndRemoveShape(pointStart, pointEnd);

        this.board.drawAll(root.shapes);
        this.selectPoint = [pointStart, pointEnd];

        callback({ eraserPoints: [...this.selectPoint] });
      });
    });
  }

  mouseup(callback: MouseMoveCallback) {
    this.flushTask();
    callback({});
  }

  flushTask() {
    scheduler.flushTask();
    this.selectPoint = [];
  }

  eraserBox(point: Point): Box {
    const x = point.x - this.eraserBoxSize / 2;
    const y = point.y - this.eraserBoxSize / 2;
    const width = this.eraserBoxSize;
    const height = this.eraserBoxSize;

    return { y, x, width, height };
  }
}

export default EraserWorker;
