export type Point = {
  y: number;
  x: number;
};

export type PanZoom = {
  scale: number;
  offset: Point;
};

export type RequireFragment = {
  strokeWidth: number;
};

export type OptionalFragment = {
  roughness: number;
  fill: string;
  fillStyle: string;
  stroke: string;
};

export type Fragment = RequireFragment & Partial<OptionalFragment>;

export type Panzoom = {
  scale: number;
  offset: Point;
};
