import { ImageElement, Shape } from "store/slices/docSlices";
import {
  StrokeWidthType,
  ToolType,
} from "../../../../store/slices/boardSlices";
import { Metadata } from "../../../../store/slices/peerSlices";
import { PanZoom, Point } from "../../../../types/canvasTypes";
import {
  addPoints,
  diffPoints,
  getScreenPoint,
  getWorldPoint,
} from "../../../../utils/canvas";
import { returnScrollOffsetFromMouseOffset } from "../../../../utils/canvas.zoom";
import {
  addEvent,
  removeEvent,
  touchy,
  TouchyEvent,
} from "../../../../utils/dom";
import EventDispatcher from "../../../../utils/eventDispatcher";
import CanvasWrapper from "./CanvasWrapper";
import { drawEraser } from "./eraser";
import { drawImageElement } from "./image";
import { drawLine, drawSmoothLine } from "./line";
import { drawRect } from "./rect";
import EraserWorker from "./Worker/EraserWorker";
import PanWorker from "./Worker/PanWorker";
import PenWorker from "./Worker/PenWorker";
import PointerWorker from "./Worker/PointerWorker";
import RectWorker from "./Worker/RectWorker";
import Worker, { BoardMetadata } from "./Worker/Worker";

enum DragStatus {
  Drag = "Drag",
  Stop = "Stop",
}

export default class Board extends EventDispatcher {
  private MAX_SCALE = 5;
  private MIN_SCALE = 0.6;
  private ZOOM_SENSITIVITY = 300;
  private color: string = "#000000";
  private imgUrl: string | undefined;
  private HTMLImageElements: HTMLImageElement[] = [];
  private images: (ImageElement & { HTMLImageElement: HTMLImageElement })[] =
    [];
  private presenceImages: (ImageElement & {
    HTMLImageElement: HTMLImageElement;
  })[] = [];
  private imageElement: HTMLImageElement | undefined;
  private strokeWidth: number = StrokeWidthType[0];
  private dragStatus: DragStatus = DragStatus.Stop;
  private imageInfo:
    | { x: number; y: number; width: number; height: number }
    | undefined;

  private documentCanvasWrapper: CanvasWrapper;
  private presenceCanvasWrapper: CanvasWrapper;
  private pinchZoomPrevDiff: number | undefined;

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
    this.initialize();
    this.pinchZoomPrevDiff = 0;
  }

  setImages(docImages: ImageElement[]) {
    //initialize the array
    this.images = [];
    //add image to the elements
    for (const docImage of docImages) {
      let imageObject = new Image();
      imageObject.crossOrigin = "Anonymous";
      imageObject.onload = () => {
        //draw image
        drawImageElement(
          this.documentCanvasWrapper.getContext(),
          imageObject,
          this.panZoom,
          docImage.position,
          docImage.width,
          docImage.height
        );
        this.images.push({ ...docImage, HTMLImageElement: imageObject });
        this.drawShapes();
      };
      // imageObject.onerror = () => {
      //   imageObject = new Image();
      //   imageObject.crossOrigin = "Anonymous";
      //   imageObject.onload = () => {
      //     this.HTMLImageElements.push(imageObject);
      //   };
      //   imageObject.src = image.url;
      // };
      imageObject.src = docImage.url;
    }
  }

  setImageInfo(
    info: { x: number; y: number; width: number; height: number } | undefined
  ) {
    this.imageInfo = info;
  }

  setPanZoomStoreHandler(handler: (panzoom: PanZoom) => void) {
    this.updatePanZoomStore = handler;
  }

  createPresenceCanvasWrapper(): CanvasWrapper {
    const canvas = document.createElement("canvas");
    const wrapper = new CanvasWrapper(canvas);
    canvas.style.position = "absolute";
    canvas.style.touchAction = "none";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "1";

    wrapper.setWidth(this.documentCanvasWrapper.getWidth());
    wrapper.setHeight(this.documentCanvasWrapper.getHeight());

    this.documentCanvasWrapper.getCanvas().parentNode?.appendChild(canvas);
    return wrapper;
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
    // this.presenceCanvasWrapper
    //   .getCanvas()
    //   .addEventListener("touchstart", () => {
    //     alert("hi");
    //   });
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
      "mousemove",
      this.onMouseMove
    );
    touchy(
      this.presenceCanvasWrapper.getCanvas(),
      removeEvent,
      "mousedown",
      this.onMouseDown
    );
    touchy(
      this.presenceCanvasWrapper.getCanvas(),
      removeEvent,
      "mousemove",
      this.handlePinchZoom
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
    if (tool === ToolType.Pan) {
      return new PanWorker(this);
    }
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
    if (tool === ToolType.Pointer) {
      return new PointerWorker(this.update, this);
    }
    throw new TypeError(`Undefined tool: ${tool}`);
  }

  getImages() {
    return this.images;
  }

  getPointFromTouch(touch: Touch) {
    let originY;
    let originX;
    let offsetX;
    let offsetY;
    const r = this.presenceCanvasWrapper.getCanvas().getBoundingClientRect();
    originY = touch.clientY;
    originX = touch.clientX;
    offsetX = touch.clientX - r.left;
    offsetY = touch.clientY - r.top;
    return {
      x: originX - this.panZoom.offset.x,
      y: originY - this.panZoom.offset.y,
      offsetX: offsetX,
      offsetY: offsetY,
    };
  }

  getPointFromTouchyEvent(
    evt: TouchyEvent
  ): Point & { offsetX: number; offsetY: number } {
    let originY;
    let originX;
    let offsetX;
    let offsetY;
    if (window.TouchEvent && evt instanceof TouchEvent) {
      //this is for tablet or mobile
      let isCanvasTouchIncluded = false;
      let firstCanvasTouchIndex = 0;
      for (let i = 0; i < evt.touches.length; i++) {
        const target = evt.touches.item(i)!.target;
        if (target instanceof HTMLCanvasElement) {
          isCanvasTouchIncluded = true;
          firstCanvasTouchIndex = i;
          break;
        }
      }
      if (isCanvasTouchIncluded) {
        return this.getPointFromTouch(evt.touches[firstCanvasTouchIndex]);
      } else {
        return this.getPointFromTouch(evt.touches[0]);
      }
    } else {
      //this is for PC
      originY = evt.clientY;
      originX = evt.clientX;
      offsetX = evt.offsetX;
      offsetY = evt.offsetY;
    }
    originY += window.scrollY;
    originX += window.scrollX;
    return {
      y: originY - this.panZoom.offset.y,
      x: originX - this.panZoom.offset.x,
      offsetX: offsetX,
      offsetY: offsetY,
    };
  }

  handlePinchZoom = (evt: TouchyEvent) => {
    if (window.TouchEvent && evt instanceof TouchEvent) {
      const touchCount = evt.touches.length;
      if (touchCount < 2) {
        return;
      }
      const canvasTouchEventIndexes = [];
      for (let i = 0; i < touchCount; i++) {
        const target = evt.touches.item(i)!.target;
        if (target instanceof HTMLCanvasElement) {
          canvasTouchEventIndexes.push(i);
        }
      }
      if (canvasTouchEventIndexes.length !== 2) {
        return;
      }
      const firstTouch = evt.touches[canvasTouchEventIndexes[0]];
      const secondTouch = evt.touches[canvasTouchEventIndexes[1]];
      const pinchZoomCurrentDiff =
        Math.abs(firstTouch.clientX - secondTouch.clientX) +
        Math.abs(firstTouch.clientY - secondTouch.clientY);
      const firstTouchPoint = this.getPointFromTouch(firstTouch);
      const secondTouchPoint = this.getPointFromTouch(secondTouch);
      const touchCenterPos = {
        x: (firstTouchPoint.offsetX + secondTouchPoint.offsetY) / 2,
        y: (firstTouchPoint.offsetY + secondTouchPoint.offsetY) / 2,
      };

      if (!this.pinchZoomPrevDiff) {
        this.pinchZoomPrevDiff = pinchZoomCurrentDiff;
        return;
      }

      const deltaX = this.pinchZoomPrevDiff - pinchZoomCurrentDiff;
      const zoom = 1 - (deltaX * 2) / this.ZOOM_SENSITIVITY;
      const newScale = this.panZoom.scale * zoom;
      if (this.MIN_SCALE > newScale || newScale > this.MAX_SCALE) {
        return;
      }
      const worldPos = getWorldPoint(touchCenterPos, {
        scale: this.panZoom.scale,
        offset: this.panZoom.offset,
      });
      const newTouchCenterPos = getScreenPoint(worldPos, {
        scale: newScale,
        offset: this.panZoom.offset,
      });
      const scaleOffset = diffPoints(touchCenterPos, newTouchCenterPos);
      const offset = addPoints(this.panZoom.offset, scaleOffset);
      this.updatePanZoomStore!({ offset, scale: newScale });
      this.pinchZoomPrevDiff = pinchZoomCurrentDiff;
    }
  };

  handlePanning = (evt: TouchyEvent) => {
    const lastMousePos = this.panPoint.lastMousePos;
    const point = this.getPointFromTouchyEvent(evt);
    const currentMousePos: Point = { x: point.offsetX, y: point.offsetY };
    this.panPoint.lastMousePos = currentMousePos;
    const mouseDiff = diffPoints(lastMousePos, currentMousePos);
    const offset = diffPoints(this.panZoom.offset, mouseDiff);
    this.panZoom.offset = offset;
    this.presenceCanvasWrapper.setPanZoom({ offset });
    this.documentCanvasWrapper.setPanZoom({ offset });
    this.updatePanZoomStore!({ ...this.panZoom, offset });
    return;
  };

  updateWrapperPanZoom(scale: number, offset: Point) {
    this.panZoom.offset = offset;
    this.panZoom.scale = scale;
    this.presenceCanvasWrapper.setPanZoom(this.panZoom);
    this.documentCanvasWrapper.setPanZoom(this.panZoom);
    this.drawShapes();
  }

  handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    if (e.ctrlKey) {
      const zoom = 1 - e.deltaY / this.ZOOM_SENSITIVITY;
      const newScale = this.panZoom.scale * zoom;

      if (this.MIN_SCALE > newScale || newScale > this.MAX_SCALE) {
        return;
      }

      const mouseOffset = { x: e.offsetX, y: e.offsetY };
      const newOffset = returnScrollOffsetFromMouseOffset(
        mouseOffset,
        this.panZoom,
        newScale
      );
      this.updatePanZoomStore!({ offset: newOffset, scale: newScale });
    } else {
      const offset = diffPoints(this.panZoom.offset, {
        x: e.deltaX,
        y: e.deltaY,
      });
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
    const mousePos = {
      x: point.offsetX,
      y: point.offsetY,
    };

    if (this.worker.shouldAllowPanning(evt, this.panZoom)) {
      this.panPoint.lastMousePos = mousePos;
      touchy(
        this.presenceCanvasWrapper.getCanvas(),
        addEvent,
        "mousemove",
        this.handlePanning
      );
      touchy(
        this.presenceCanvasWrapper.getCanvas(),
        addEvent,
        "mousemove",
        this.handlePinchZoom
      );
    }
    this.worker.mousedown(
      { x: point.offsetX, y: point.offsetY },
      this.panZoom,
      (boardMetadata: BoardMetadata) => {
        this.emit("mousedown", boardMetadata);
      }
    );
  }

  findImageTargetIndex(evt: TouchyEvent): number | undefined {
    const pointerOffset = { x: evt.offsetX, y: evt.offsetY };
    const screenPoint = getWorldPoint(pointerOffset, this.panZoom);
    for (let i = 0; i < this.images.length; i++) {
      const image = this.images[i];
      const leftTopPointOfImage = {
        x: image.position.x,
        y: image.position.y,
      };
      const rightBottomOfImage = {
        x: image.position.x + image.width,
        y: image.position.y + image.height,
      };
      if (
        screenPoint.x > leftTopPointOfImage.x &&
        screenPoint.x < rightBottomOfImage.x &&
        screenPoint.y > leftTopPointOfImage.y &&
        screenPoint.y < rightBottomOfImage.y
      ) {
        return i;
      }
    }
    return undefined;
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

    this.worker.mousemove(
      { x: point.offsetX, y: point.offsetY },
      this.panZoom,
      (boardMetadata: BoardMetadata) => {
        this.emit("mousemove", boardMetadata);
      }
    );
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
    touchy(
      this.presenceCanvasWrapper.getCanvas(),
      removeEvent,
      "mousemove",
      this.handlePinchZoom
    );
    this.dragStatus = DragStatus.Stop;
    this.worker.mouseup((boardMetadata: BoardMetadata) => {
      this.emit("mouseup", boardMetadata);
    });
    this.pinchZoomPrevDiff = undefined;
    this.emit("mouseup");
    // this.presenceCanvasWrapper.clear();
  }

  onMouseOut() {
    this.dragStatus = DragStatus.Stop;
    this.worker.flushTask();
    this.presenceCanvasWrapper.clear();
    this.pinchZoomPrevDiff = undefined;
    this.emit("mouseout");
  }

  updateMetadata(peerKey: string, metadata: Metadata) {
    //JSON.parse changes string value board to an array
    //anything can be passed to board meta data
    this.metadataMap.set(peerKey, JSON.parse(metadata.board || "{}"));
    this.presenceCanvasWrapper.clear();
    for (const boardMetadata of this.metadataMap.values()) {
      const { eraserPoints, penPoints, rectShape, imageElement } =
        boardMetadata;
      if (eraserPoints) {
        if (eraserPoints.length === 0) {
        } else {
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
        drawRect(
          this.presenceCanvasWrapper.getContext(),
          { ...rectShape },
          this.panZoom
        );
      }

      if (imageElement) {
        let presenceImageElement: ImageElement & {
          HTMLImageElement: HTMLImageElement;
        };
        const existingPresenceImageIndex = this.presenceImages.findIndex(
          (element) => element.url === imageElement.url
        );
        if (existingPresenceImageIndex === -1) {
          let imageObject = new Image();
          imageObject.crossOrigin = "Anonymous";
          imageObject.src = imageElement.url;
          presenceImageElement = {
            ...imageElement,
            HTMLImageElement: imageObject,
          };
          this.presenceImages.push({
            ...imageElement,
            HTMLImageElement: imageObject,
          });
          return;
        }
        presenceImageElement = this.presenceImages[existingPresenceImageIndex];

        //draw image
        this.drawImage(
          presenceImageElement.HTMLImageElement,
          imageElement.position,
          imageElement.width,
          imageElement.height,
          this.presenceCanvasWrapper
        );
      }
      // if (!eraserPoints && !penPoints && !rectShape && !imageElement) {
      //   this.clear(this.presenceCanvasWrapper);
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

  drawImage(
    htmlImageElement: HTMLImageElement,
    position: Point,
    width: number,
    height: number,
    wrapper: CanvasWrapper = this.presenceCanvasWrapper
  ) {
    drawImageElement(
      wrapper.getContext(),
      htmlImageElement,
      this.panZoom,
      position,
      width,
      height
    );
  }

  drawShapes() {
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
    for (const image of this.images) {
      drawImageElement(
        wrapper.getContext(),
        image.HTMLImageElement,
        this.panZoom,
        image.position,
        image.width,
        image.height
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
        offset: { x: 0, y: 0 },
      };
      if (this.imageElement) {
        // drawImage(
        //   imageContext,
        //   this.imageElement,
        //   customizedPanZoom,
        //   this.imgUrl
        // );
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
