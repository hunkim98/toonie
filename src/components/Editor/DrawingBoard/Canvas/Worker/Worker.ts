import { TimeTicket } from "yorkie-js-sdk";
import { ToolType } from "../../../../../store/slices/boardSlices";
import {
  Root,
  Shape,
  Rect,
  ImageElement,
} from "../../../../../store/slices/docSlices";
import { PanZoom, Point } from "../../../../../types/canvasTypes";

export type Options = { color: string; strokeWidth: number };

export type BoardMetadata = {
  eraserPoints?: Point[];
  penPoints?: { points: Point[]; color: string; strokeWidth: number };
  rectShape?: Rect;
  imageElement?: ImageElement;
};

export type MouseDownCallback = (boardMetadata: BoardMetadata) => void;

export type MouseMoveCallback = (boardMetadata: BoardMetadata) => void;

export type MouseUpCallback = (BoardMetadata: BoardMetadata) => void;

abstract class Worker {
  constructor(options?: Options) {
    this.options = options;
  }

  options?: Options;

  abstract type: ToolType;

  abstract update: Function;

  abstract updatePresence: Function;

  abstract shouldAllowPanning(point: Point, panZoom: PanZoom): boolean;

  abstract mousedown(
    point: Point,
    panZoom: PanZoom,
    callback?: MouseDownCallback
  ): void;

  abstract mousemove(
    point: Point,
    panZoom: PanZoom,
    callback?: MouseMoveCallback
  ): void;

  abstract mouseup(callback?: MouseUpCallback): void;

  abstract flushTask(): void;

  getElementByID(root: Root, createID: TimeTicket): Shape | undefined {
    return root.shapes.getElementByID(createID);
  }

  deleteShapeByID(root: Root, createID: TimeTicket): Shape | undefined {
    return root.shapes.deleteByID(createID);
  }

  deleteImageByID(root: Root, createID: TimeTicket): ImageElement | undefined {
    return root.images.deleteByID(createID);
  }

  clearAll() {
    this.update((root: Root) => {
      for (const shape of root.shapes) {
        this.deleteShapeByID(root, shape.getID());
      }
    });
  }

  setOption(options: Options) {
    this.options = {
      ...this.options,
      ...options,
    };
  }
}

export default Worker;
