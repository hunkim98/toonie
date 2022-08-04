import { ToolType } from "../../../../store/slices/boardSlices";
import { Root, Shape } from "../../../../store/slices/docSlices";
import { Metadata } from "../../../../store/slices/peerSlices";
import { PanZoom, Point } from "../../../../types/canvasTypes";
import {
  addEvent,
  removeEvent,
  touchy,
  TouchyEvent,
} from "../../../../utils/dom";
import EventDispatcher from "../../../../utils/eventDispatcher";
import CanvasWrapper from "./CanvasWrapper";
import { drawEraser } from "./eraser";
import { drawLine } from "./line";
import { drawRect } from "./rect";
import EraserWorker from "./Worker/EraserWorker";
import PenWorker from "./Worker/PenWorker";
import RectWorker from "./Worker/RectWorker";
import Worker, { BoardMetadata } from "./Worker/Worker";

enum DragStatus {
  Drag = "Drag",
  Stop = "Stop",
}

export default class Board extends EventDispatcher {
  private offSetY: number = 0;
  private offSetX: number = 0;
  private color: string = "#000000";
  private isToolActivated: boolean;
  private dragStatus: DragStatus = DragStatus.Stop;

  private documentCanvasWrapper: CanvasWrapper;
  private presenceCanvasWrapper: CanvasWrapper;

  private metadataMap: Map<string, BoardMetadata> = new Map();

  panZoom: PanZoom = {
    scale: 1,
    offset: { x: 0, y: 0 },
  };

  update: Function;
  updatePresence: Function;
  worker!: Worker;

  constructor(
    element: HTMLCanvasElement,
    update: Function,
    updatePresence: Function
  ) {
    super();
    this.documentCanvasWrapper = new CanvasWrapper(element);
    this.presenceCanvasWrapper = this.createPresenceCanvasWrapper();
    this.update = update;
    this.updatePresence = updatePresence;
    this.isToolActivated = false;
    this.initialize();
  }

  createPresenceCanvasWrapper(): CanvasWrapper {
    const canvas = document.createElement("canvas");
    const wrapper = new CanvasWrapper(canvas);
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "1";

    wrapper.setWidth(this.documentCanvasWrapper.getWidth());
    wrapper.setHeight(this.documentCanvasWrapper.getHeight());

    this.documentCanvasWrapper.getCanvas().parentNode?.appendChild(canvas);
    return wrapper;
  }

  activateTools() {
    this.isToolActivated = true;
  }

  deactivateTools() {
    this.isToolActivated = false;
    this.worker.flushTask();
  }

  initialize() {
    this.initializeSize();
    this.initializeOffset();
    this.emit = this.emit.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.worker = new PenWorker(this.updatePresence, this.update, this, {
      color: "#000000",
    });

    touchy(
      this.presenceCanvasWrapper.getCanvas(),
      addEvent,
      "mouseup",
      this.onMouseUp
    );
    touchy(
      this.presenceCanvasWrapper.getCanvas(),
      addEvent,
      "mouseout",
      this.onMouseOut
    );
    touchy(
      this.presenceCanvasWrapper.getCanvas(),
      addEvent,
      "mousedown",
      this.onMouseDown
    );

    this.addEventListener("renderAll", this.drawAll);
  }

  initializeOffset() {
    const { y, x } = this.documentCanvasWrapper
      .getCanvas()
      .getBoundingClientRect();
    this.panZoom.offset.y = y;
    this.panZoom.offset.x = x;
  }

  initializeSize() {
    this.documentCanvasWrapper.resize();
    this.presenceCanvasWrapper.resize();
  }

  destroy() {
    touchy(
      this.presenceCanvasWrapper.getCanvas(),
      removeEvent,
      "mouseup",
      this.onMouseUp
    );
    touchy(
      this.presenceCanvasWrapper.getCanvas(),
      removeEvent,
      "mouseout",
      this.onMouseOut
    );
    touchy(
      this.presenceCanvasWrapper.getCanvas(),
      removeEvent,
      "mousedown",
      this.onMouseDown
    );
    this.destroyPresenceCanvas();
    this.removeEventListener("renderAll");
  }

  destroyPresenceCanvas() {
    const presenceCanvas = this.presenceCanvasWrapper?.getCanvas();

    if (presenceCanvas) {
      presenceCanvas.parentNode?.removeChild(presenceCanvas);
    }
  }

  setColor(color: string) {
    this.color = color;
    this.worker.setOption({ color });
  }

  setWidth(width: number) {
    this.documentCanvasWrapper.setWidth(width);
    this.presenceCanvasWrapper.setWidth(width);
    this.resize();
  }

  setHeight(height: number) {
    this.documentCanvasWrapper.setHeight(height);
    this.presenceCanvasWrapper.setHeight(height);
    this.resize();
  }

  resize() {
    this.documentCanvasWrapper.resize();
    this.presenceCanvasWrapper.resize();
  }

  setTool(tool: ToolType) {
    if (this.worker.type === tool) {
      return;
    }
    this.worker.flushTask();
    this.worker = this.createWorker(tool);
  }

  createWorker(tool: ToolType) {
    if (tool === ToolType.Pen) {
      return new PenWorker(this.updatePresence, this.update, this, {
        color: this.color,
      });
    }
    if (tool === ToolType.Eraser) {
      return new EraserWorker(this.updatePresence, this.update, this);
    }
    if (tool === ToolType.Rect) {
      return new RectWorker(this.updatePresence, this.update, this, {
        color: this.color,
      });
    }
    throw new TypeError(`Undefined tool: ${tool}`);
  }

  getPointFromTouchyEvent(evt: TouchyEvent): Point {
    let originY;
    let originX;
    if (window.TouchEvent && evt instanceof TouchEvent) {
      originY = evt.touches[0].clientY;
      originX = evt.touches[0].clientX;
    } else {
      originY = evt.clientY;
      originX = evt.clientX;
    }
    originY += window.scrollY;
    originX += window.scrollX;
    return {
      y: originY - this.panZoom.offset.y,
      x: originX - this.panZoom.offset.x,
    };
  }

  onMouseDown(evt: TouchyEvent) {
    touchy(
      this.presenceCanvasWrapper.getCanvas(),
      addEvent,
      "mousemove",
      this.onMouseMove
    );
    this.dragStatus = DragStatus.Drag;

    const point = this.getPointFromTouchyEvent(evt);

    if (this.isToolActivated) {
      this.worker.mousedown(point, (boardMetadata: BoardMetadata) => {
        this.emit("mousedown", boardMetadata);
      });
    }
  }

  onMouseMove(evt: TouchyEvent) {
    const point = this.getPointFromTouchyEvent(evt);
    if (this.isOutside(point)) {
      this.onMouseUp();
      return;
    }

    if (this.dragStatus === DragStatus.Stop) {
      return;
    }

    if (this.isToolActivated) {
      this.worker.mousemove(point, (boardMetadata: BoardMetadata) => {
        this.emit("mousemove", boardMetadata);
      });
    } else {
      //pan control, zoom
    }
  }

  onMouseUp() {
    touchy(
      this.presenceCanvasWrapper.getCanvas(),
      removeEvent,
      "mousemove",
      this.onMouseMove
    );
    this.dragStatus = DragStatus.Stop;

    if (this.isToolActivated) {
      this.worker.mouseup();
    } else {
      //panZoom
    }
    this.emit("mouseup");
  }

  onMouseOut() {
    this.dragStatus = DragStatus.Stop;
    if (this.isToolActivated) {
      this.worker.flushTask();
    }
    this.emit("mouseout");
  }

  updateMetadata(peerKey: string, metadata: Metadata) {
    this.clear(this.documentCanvasWrapper);

    this.update((root: Root) => {
      this.drawAll(root.shapes);
    });

    this.metadataMap.set(peerKey, JSON.parse(metadata.board || "{}"));

    for (const boardMetadata of Array.from(this.metadataMap.values())) {
      const { eraserPoints } = boardMetadata;
      // if (eraserPoints && eraserPoints.length > 0) {
      //   drawEraser(this.lowerWrapper.getContext(), {
      //     type: "eraser",
      //     points: eraserPoints,
      //   });
      // }
    }
  }

  isOutside(point: Point): boolean {
    if (
      point.y < 0 ||
      point.x < 0 ||
      point.y > this.documentCanvasWrapper.getHeight() ||
      point.x > this.documentCanvasWrapper.getWidth()
    ) {
      return true;
    }
    return false;
  }

  drawAll(
    shapes: Array<Shape>,
    //remember we drawAll only on the document canvas not the presence canvas
    wrapper: CanvasWrapper = this.documentCanvasWrapper
  ) {
    this.clear(wrapper);
    for (const shape of shapes) {
      if (shape.type === "line") {
        drawLine(wrapper.getContext(), shape);
      } else if (shape.type === "eraser") {
        drawEraser(wrapper.getContext(), shape);
      } else if (shape.type === "rect") {
        drawRect(wrapper.getContext(), shape);
      }
    }
  }

  clear(wrapper: CanvasWrapper = this.documentCanvasWrapper) {
    wrapper.clear();
  }

  clearBoard() {}
}
