import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ToolType {
  Pen = "Pen",
  Eraser = "Eraser",
  Rect = "Rect",
}

export interface BoardState {
  toolType: ToolType;
  isToolActivated: boolean;
  isSpacePressed: boolean;
}

const initialBoardState: BoardState = {
  toolType: ToolType.Pen,
  isToolActivated: false,
  isSpacePressed: false,
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
  },
});

export const {
  setTool,
  activateTool,
  deactivateTool,
  activateSpaceKey,
  deactivateSpaceKey,
} = boardSlice.actions;
export default boardSlice.reducer;
