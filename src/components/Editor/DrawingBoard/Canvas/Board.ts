import {
  StrokeWidthType,
  ToolType,
} from "../../../../store/slices/boardSlices";
import { Shape } from "../../../../store/slices/docSlices";
import { Metadata } from "../../../../store/slices/peerSlices";
import { PanZoom, Point } from "../../../../types/canvasTypes";
import {
  addPoints,
  diffPoints,
  getScreenPoint,
  getWorldPoint,
} from "../../../../utils/canvas";
import {
  addEvent,
  removeEvent,
  touchy,
  TouchyEvent,
} from "../../../../utils/dom";
import EventDispatcher from "../../../../utils/eventDispatcher";
import { NavbarHeight } from "../../../Navbar/styles";
import CanvasWrapper from "./CanvasWrapper";
import { drawEraser } from "./eraser";
import { drawImage } from "./image";
import { drawLine, drawSmoothLine } from "./line";
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
  private color: string = "#000000";
  private imgUrl: string | undefined;
  private imageElement: HTMLImageElement | undefined;
  private strokeWidth: number = StrokeWidthType[0];
  private isToolActivated: boolean;
  private dragStatus: DragStatus = DragStatus.Stop;
  private imageInfo:
    | { x: number; y: number; width: number; height: number }
    | undefined;

  private documentCanvasWrapper: CanvasWrapper;
  private presenceCanvasWrapper: CanvasWrapper;

  private metadataMap: Map<string, BoardMetadata> = new Map();

  //camearOffset
  panZoom: PanZoom = {
    scale: 1,
    offset: { x: 0, y: 0 },
  };

  panPoint: { mousePos: Point; lastMousePos: Point } = {
    mousePos: { x: 0, y: 0 },
    lastMousePos: { x: 0, y: 0 },
  };

  updatePanZoomStore?: (panZoom: PanZoom) => void;

  update: Function;
  updatePresence: Function;
  worker!: Worker;
  getRoot: Function;

  constructor(
    element: HTMLCanvasElement,
    update: Function,
    updatePresence: Function,
    getRoot: Function
  ) {
    super();
    this.documentCanvasWrapper = new CanvasWrapper(element);
    this.presenceCanvasWrapper = this.createPresenceCanvasWrapper();
    this.update = update;
    this.getRoot = getRoot;
    this.updatePresence = updatePresence;
    this.isToolActivated = false;
    this.initialize();
  }

  setImageInfo(info: { x: number; y: number; width: number; height: number }) {
    this.imageInfo = info;
  }

  setPanZoomStoreHandler(handler: (panzoom: PanZoom) => void) {
    this.updatePanZoomStore = handler;
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

  initializeImg(imgUrl: string | undefined) {
    if (imgUrl) {
      this.imgUrl = imgUrl;
      const img = new Image();
      this.imageElement = img;
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        this.setImageInfo(
          drawImage(this.documentCanvasWrapper.getContext(), img, this.panZoom)
        );
        this.render();
      };
      img.src = imgUrl;
      console.log(img);
    } else {
      if (imgUrl === undefined) {
        this.imgUrl = undefined;
      } else {
        this.imgUrl = "";
      }
    }
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
      color: this.color,
      strokeWidth: this.strokeWidth,
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
    this.presenceCanvasWrapper
      .getCanvas()
      .addEventListener("wheel", this.handleWheel);
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
    this.removeEventListener("wheel");
  }

  destroyPresenceCanvas() {
    const presenceCanvas = this.presenceCanvasWrapper?.getCanvas();

    if (presenceCanvas) {
      presenceCanvas.parentNode?.removeChild(presenceCanvas);
    }
  }

  setStrokeWith(strokeWidth: number) {
    this.strokeWidth = strokeWidth;
    this.worker.setOption({ color: this.color, strokeWidth });
  }
  setColor(color: string) {
    this.color = color;
    this.worker.setOption({ color, strokeWidth: this.strokeWidth });
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

  setImgUrl(imgUrl: string | undefined) {
    this.imgUrl = imgUrl;
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
        strokeWidth: this.strokeWidth,
      });
    }
    if (tool === ToolType.Eraser) {
      return new EraserWorker(this.updatePresence, this.update, this);
    }
    if (tool === ToolType.Rect) {
      return new RectWorker(this.updatePresence, this.update, this, {
        color: this.color,
        strokeWidth: this.strokeWidth,
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

  handlePanning = (e: MouseEvent) => {
    const lastMousePos = this.panPoint.lastMousePos;
    const currentMousePos: Point = { x: e.offsetX, y: e.offsetY };
    this.panPoint.lastMousePos = currentMousePos;
    const mouseDiff = diffPoints(lastMousePos, currentMousePos);
    const offset = diffPoints(this.panZoom.offset, mouseDiff);
    this.panZoom.offset = offset;
    this.presenceCanvasWrapper.setPanZoom({ offset });
    this.documentCanvasWrapper.setPanZoom({ offset });
    this.updatePanZoomStore!({ ...this.panZoom, offset });
    console.log(
      offset,
      this.documentCanvasWrapper.getWidth(),
      this.documentCanvasWrapper.getHeight()
    );
    return;
  };

  updateWrapperPanZoom(scale: number, offset: Point) {
    this.panZoom.offset = offset;
    this.panZoom.scale = scale;
    this.presenceCanvasWrapper.setPanZoom({
      offset,
    });
    this.documentCanvasWrapper.setPanZoom({
      offset,
    });
  }

  handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const MAX_SCALE = 5;
    const MIN_SCALE = 0.6;

    const ZOOM_SENSITIVITY = 300;
    if (e.ctrlKey) {
      const zoom = 1 - e.deltaY / ZOOM_SENSITIVITY;
      const newScale = this.panZoom.scale * zoom;

      if (MIN_SCALE > newScale || newScale > MAX_SCALE) {
        return;
      }

      const mousePos = { x: e.offsetX, y: e.offsetY };
      const worldPos = getWorldPoint(mousePos, {
        scale: this.panZoom.scale,
        offset: this.panZoom.offset,
      });
      const newMousePos = getScreenPoint(worldPos, {
        scale: newScale,
        offset: this.panZoom.offset,
      });
      const scaleOffset = diffPoints(mousePos, newMousePos);
      const offset = addPoints(this.panZoom.offset, scaleOffset);
      this.updateWrapperPanZoom(newScale, offset);
      this.updatePanZoomStore!({ ...this.panZoom, scale: newScale });
    } else {
      const offset = diffPoints(this.panZoom.offset, {
        x: e.deltaX,
        y: e.deltaY,
      });
      this.updateWrapperPanZoom(this.panZoom.scale, offset);
      this.updatePanZoomStore!({ ...this.panZoom, offset });
    }
  };

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
      this.worker.mousedown(
        point,
        this.panZoom,
        (boardMetadata: BoardMetadata) => {
          this.emit("mousedown", boardMetadata);
        }
      );
    } else {
      //this part is necessary for panning
      const mousePos = {
        x: evt.offsetX,
        y: evt.offsetY,
      };
      this.panPoint.lastMousePos = mousePos;
      touchy(
        this.presenceCanvasWrapper.getCanvas(),
        addEvent,
        "mousemove",
        this.handlePanning as EventListener
      );
    }
  }

  onMouseMove(evt: TouchyEvent) {
    const point = this.getPointFromTouchyEvent(evt);
    // if (this.isOutside(point)) {
    //   this.onMouseUp();
    //   return;
    // }

    if (this.dragStatus === DragStatus.Stop) {
      return;
    }

    if (this.isToolActivated) {
      this.worker.mousemove(
        point,
        this.panZoom,
        (boardMetadata: BoardMetadata) => {
          this.emit("mousemove", boardMetadata);
        }
      );
    } else {
    }
  }

  onMouseUp() {
    touchy(
      this.presenceCanvasWrapper.getCanvas(),
      removeEvent,
      "mousemove",
      this.onMouseMove
    );
    touchy(
      this.presenceCanvasWrapper.getCanvas(),
      removeEvent,
      "mousemove",
      this.handlePanning
    );
    this.dragStatus = DragStatus.Stop;
    this.worker.mouseup((boardMetadata: BoardMetadata) => {
      this.emit("mouseup", boardMetadata);
    });

    this.emit("mouseup");
    this.presenceCanvasWrapper.clear();
  }

  onMouseOut() {
    this.dragStatus = DragStatus.Stop;
    this.worker.flushTask();
    this.presenceCanvasWrapper.clear();
    this.emit("mouseout");
  }

  updateMetadata(peerKey: string, metadata: Metadata) {
    //JSON.parse changes string value board to an array
    //anything can be passed to board meta data
    this.metadataMap.set(peerKey, JSON.parse(metadata.board || "{}"));
    for (const boardMetadata of Array.from(this.metadataMap.values())) {
      const { eraserPoints, penPoints, rectShape } = boardMetadata;
      if (eraserPoints) {
        if (eraserPoints.length === 0) {
          this.presenceCanvasWrapper.clear();
        } else {
          this.presenceCanvasWrapper.clear();
          drawEraser(
            this.presenceCanvasWrapper.getContext(),
            {
              type: "eraser",
              points: eraserPoints,
            },
            this.panZoom
          );
        }
      }

      if (penPoints && penPoints.points.length > 0) {
        drawLine(
          this.presenceCanvasWrapper.getContext(),
          {
            type: "line",
            points: penPoints.points,
            color: penPoints.color,
            strokeWidth: penPoints.strokeWidth,
          },
          this.panZoom
        );
      }

      if (rectShape) {
        this.presenceCanvasWrapper.clear();
        drawRect(
          this.presenceCanvasWrapper.getContext(),
          { ...rectShape },
          this.panZoom
        );
      }
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

  render() {
    this.drawAll(this.getRoot().shapes);
  }

  drawAll(
    shapes: Array<Shape>,
    //remember we drawAll only on the document canvas not the presence canvas
    wrapper: CanvasWrapper = this.documentCanvasWrapper
  ) {
    this.clear(wrapper);
    this.clear(this.presenceCanvasWrapper);
    const context = wrapper.getContext();
    const canvas = wrapper.getCanvas();
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    if (this.imageElement) {
      this.setImageInfo(
        drawImage(wrapper.getContext(), this.imageElement, this.panZoom)
      );
    }
    for (const shape of shapes) {
      if (shape.type === "line") {
        drawSmoothLine(wrapper.getContext(), shape, this.panZoom);
      } else if (shape.type === "eraser") {
        drawEraser(wrapper.getContext(), shape, this.panZoom);
      } else if (shape.type === "rect") {
        drawRect(wrapper.getContext(), shape, this.panZoom);
      }
    }
  }

  downloadImage() {
    if (this.imgUrl && this.imageElement && this.imageInfo) {
      const imageCanvas = document.createElement("canvas");
      imageCanvas.width = this.imageInfo?.width;
      imageCanvas.height = this.imageInfo?.height;
      const imageContext = imageCanvas.getContext("2d")!;
      const customizedPanZoom = {
        scale: this.panZoom.scale,
        offset: { x: 0, y: NavbarHeight },
      };
      if (this.imageElement) {
        drawImage(imageContext, this.imageElement, customizedPanZoom);
      }
      const shapes = this.getRoot().shapes;
      for (const shape of shapes) {
        if (shape.type === "line") {
          drawSmoothLine(imageContext, shape, customizedPanZoom);
        } else if (shape.type === "eraser") {
          drawEraser(imageContext, shape, customizedPanZoom);
        } else if (shape.type === "rect") {
          drawRect(imageContext, shape, customizedPanZoom);
        }
      }
      const anchor = document.createElement("a");
      anchor.href = imageCanvas.toDataURL("image/png");
      anchor.download = "toonie.png";
      anchor.click();
    } else {
      const anchor = document.createElement("a");
      anchor.href = this.documentCanvasWrapper
        .getCanvas()
        .toDataURL("image/png");
      anchor.download = "toonie.png";
      anchor.click();
    }
  }

  clear(wrapper: CanvasWrapper = this.documentCanvasWrapper) {
    wrapper.clear();
  }
}
