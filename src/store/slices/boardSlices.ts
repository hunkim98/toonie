import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PanZoom } from "../../types/canvasTypes";

export enum ToolType {
  Pen = "Pen",
  Eraser = "Eraser",
  Rect = "Rect",
}

export interface BoardState {
  toolType: ToolType;
  color: string;
  isToolActivated: boolean;
  isSpacePressed: boolean;
  panZoom: PanZoom;
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
  },
});

export const {
  setTool,
  activateTool,
  deactivateTool,
  activateSpaceKey,
  deactivateSpaceKey,
  setPanZoom,
} = boardSlice.actions;
export default boardSlice.reducer;
