import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ToolType {
  None = "None",
  Pen = "Pen",
  Eraser = "Eraser",
  Rect = "Rect",
}

export interface BoardState {
  toolType: ToolType;
}

const initialBoardState: BoardState = { toolType: ToolType.Pen };

const boardSlice = createSlice({
  name: "board",
  initialState: initialBoardState,
  reducers: {
    setTool(state, action: PayloadAction<ToolType>) {
      state.toolType = action.payload;
    },
  },
});

export const { setTool } = boardSlice.actions;
export default boardSlice.reducer;
