import { Fragment, PanZoom } from "../../../../types/canvasTyps";

type OnMouseEventListener = (e: MouseEvent) => void;

enum DragStatus {
  Drag = "Drag",
  Stop = "Stop",
}

type CanvasData = {
  width: number;
  height: number;
  bgColor?: string;
  fragment: Fragment;
};

export default class Canvas {
  private element: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private mouseDownListener?: OnMouseEventListener;
  private mouseUpListener?: OnMouseEventListener;
  private mouseMoveListener?: OnMouseEventListener;
  private mouseOutListener?: OnMouseEventListener;

  private width = 0;
  private height = 0;
  panZoom: PanZoom = {
    scale: 1,
    offset: { x: 0, y: 0 },
  };

  constructor(canvas: HTMLCanvasElement) {
    this.element = canvas;
    this.context = canvas.getContext("2d")!;
    this.context.lineWidth = 3;

    this.context.lineCap = "round";
  }

  getCanvas() {
    return this.element;
  }

  getContext() {
    return this.context;
  }

  getWidth() {
    return this.width;
  }
  setWidth(width: number) {
    this.width = width;
    this.element.width = width;
  }

  setHeight(height: number) {
    this.height = height;
    this.element.height = height;
  }
}
