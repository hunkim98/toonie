import { NavbarHeight } from "../components/Navbar/styles";
import { PanZoom, Point } from "../types/canvasTypes";

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
    //you must consider the navbarheight
    y: point.y * scale + offset.y - NavbarHeight,
  };
}
