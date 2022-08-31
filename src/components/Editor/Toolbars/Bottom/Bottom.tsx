import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/slices";
import { ToolType, setTool } from "../../../../store/slices/boardSlices";
import {
  EraserIcon,
  MoreToolsIcon,
  PanningIcon,
  PenIcon,
  RectangleIcon,
} from "../icons";
import * as S from "./styles";

function Bottom() {
  const [isMoreToolsOpen, setIsMoreToolsOpen] = useState<boolean>(false);
  const toolType = useSelector((state: RootState) => state.boardState.toolType);
  const dispatch = useDispatch();
  return (
    <>
      <S.PanningButton
        isSelected={toolType == ToolType.Pan}
        onClick={() => {
          dispatch(setTool(ToolType.Pan));
        }}
      >
        <PanningIcon />
      </S.PanningButton>
      <S.CanvasButton
        isSelected={toolType === ToolType.Pen}
        onClick={() => {
          dispatch(setTool(ToolType.Pen));
        }}
      >
        <PenIcon />
      </S.CanvasButton>
      <S.CanvasButton
        isSelected={toolType == ToolType.Rect}
        onClick={() => {
          dispatch(setTool(ToolType.Rect));
        }}
      >
        <RectangleIcon />
      </S.CanvasButton>
      <S.CanvasButton
        isSelected={toolType == ToolType.Eraser}
        onClick={() => {
          dispatch(setTool(ToolType.Eraser));
        }}
      >
        <EraserIcon />
      </S.CanvasButton>
      <S.MoreToolsButton isSelected={false}>
        <MoreToolsIcon />
      </S.MoreToolsButton>
    </>
  );
}

export default Bottom;
