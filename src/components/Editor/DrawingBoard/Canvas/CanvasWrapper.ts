import { PanZoom } from "../../../../types/canvasTypes";

export default class CanvasWrapper {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private lineWidth;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;

    this.lineWidth = 3;
    this.context.lineWidth = 3;
    this.context.lineCap = "round";
  }

  changeLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
    this.context.lineWidth = lineWidth;
  }

  getCanvas() {
    return this.canvas;
  }

  getContext() {
    return this.context;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  setWidth(width: number, devicePixelRatio?: number) {
    this.width = width;
    this.canvas.width = devicePixelRatio ? width * devicePixelRatio : width;
    this.canvas.style.width = `${width}px`;
  }

  setHeight(height: number, devicePixelRatio?: number) {
    this.height = height;
    this.canvas.height = devicePixelRatio ? height * devicePixelRatio : height;
    this.canvas.style.height = `${height}px`;
  }

  setSize(width: number, height: number, devicePixelRatio?: number) {
    this.setWidth(width, devicePixelRatio);
    this.setHeight(height, devicePixelRatio);
  }

  clear() {
    this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());
  }

  resize() {
    const { devicePixelRatio } = window;
    if (devicePixelRatio) {
      this.setSize(this.width, this.height, devicePixelRatio);
      this.context.scale(devicePixelRatio, devicePixelRatio);
    } else {
      this.setSize(this.width, this.height);
    }
  }
}