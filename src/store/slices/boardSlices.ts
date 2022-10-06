import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PanZoom } from "../../types/canvasTypes";

export enum ToolType {
  Pan = "Pan",
  Pen = "Pen",
  Eraser = "Eraser",
  Rect = "Rect",
  Pointer = "Pointer",
}

export const StrokeWidthType = [3, 5, 10, 20];

export interface BoardState {
  toolType: ToolType;
  color: string;
  panZoom: PanZoom;
  strokeWidth: number;
  imgUrl: string | undefined;
  isDownloadClicked: boolean;
  isBrushPopupOpen: boolean;
}

const initialBoardState: BoardState = {
  toolType: ToolType.Pan,
  color: "#000000",
  panZoom: {
    scale: 1,
    offset: { x: 0, y: 0 },
  },
  strokeWidth: StrokeWidthType[0],
  imgUrl: "",
  isDownloadClicked: false,
  isBrushPopupOpen: false,
};

const boardSlice = createSlice({
  name: "board",
  initialState: initialBoardState,
  reducers: {
    setTool(state, action: PayloadAction<ToolType>) {
      state.toolType = action.payload;
    },
    openBrushPopup(state) {
      state.isBrushPopupOpen = true;
    },
    closeBrushPopup(state) {
      state.isBrushPopupOpen = false;
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
    setIsDownloadClicked(state, action: PayloadAction<boolean>) {
      state.isDownloadClicked = action.payload;
    },
    setColor(state, action: PayloadAction<string>) {
      state.color = action.payload;
    },
  },
});

export const {
  setTool,
  setStrokeWidth,
  setImgUrl,
  setPanZoom,
  setIsDownloadClicked,
  openBrushPopup,
  closeBrushPopup,
  setColor,
} = boardSlice.actions;
export default boardSlice.reducer;
