import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PanZoom } from "../../types/canvasTypes";

export enum ToolType {
  Pen = "Pen",
  Eraser = "Eraser",
  Rect = "Rect",
}

export const StrokeWidthType = [3, 5, 10, 20];

export interface BoardState {
  toolType: ToolType;
  color: string;
  isToolActivated: boolean;
  isSpacePressed: boolean;
  panZoom: PanZoom;
  strokeWidth: number;
  imgUrl: string | undefined;
}

const initialBoardState: BoardState = {
  toolType: ToolType.Pen,
  color: "#000000",
  isToolActivated: false,
  isSpacePressed: false,
  panZoom: {
    scale: 1,
    offset: { x: 0, y: 0 },
  },
  strokeWidth: StrokeWidthType[0],
  imgUrl: "",
};

const boardSlice = createSlice({
  name: "board",
  initialState: initialBoardState,
  reducers: {
    setTool(state, action: PayloadAction<ToolType>) {
      state.toolType = action.payload;
    },
    activateTool(state) {
      state.isToolActivated = true;
    },
    deactivateTool(state) {
      state.isToolActivated = false;
    },
    activateSpaceKey(state) {
      state.isSpacePressed = true;
    },
    deactivateSpaceKey(state) {
      state.isSpacePressed = false;
    },
    setPanZoom(state, action: PayloadAction<PanZoom>) {
      state.panZoom = action.payload;
    },
    setStrokeWidth(state, action: PayloadAction<number>) {
      state.strokeWidth = action.payload;
    },
    setImgUrl(state, action: PayloadAction<string | undefined>) {
      state.imgUrl = action.payload;
    },
  },
});

export const {
  setTool,
  activateTool,
  deactivateTool,
  activateSpaceKey,
  deactivateSpaceKey,
  setStrokeWidth,
  setImgUrl,
  setPanZoom,
} = boardSlice.actions;
export default boardSlice.reducer;
