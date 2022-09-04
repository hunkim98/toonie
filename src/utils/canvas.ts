import { NavbarHeight } from "../components/Navbar/styles";
import { PanZoom, Point } from "../types/canvasTypes";

export const MAX_SCALE = 5;
export const MIN_SCALE = 0.6;

export function diffPoints(p1: Point, p2: Point): Point {
  return {
    x: p1.x - p2.x,
    y: p1.y - p2.y,
  };
}

export function scalePoint(p1: Point, scale: number) {
  return { x: p1.x / scale, y: p1.y / scale };
}

export function getScreenPoint(point: Point, panZoom: PanZoom) {
  const { offset, scale } = panZoom;

  return {
    x: point.x * scale + offset.x,
    y: point.y * scale + offset.y,
  };
}

export function getWorldPoint(point: Point, panZoom: PanZoom) {
  //world point from e.offsetX, e.offsetY
  const { offset, scale } = panZoom;

  return {
    x: (point.x - offset.x) / scale,
    y: (point.y - offset.y) / scale,
  };
}

export function addPoints(p1: Point, p2: Point): Point {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y,
  };
}
