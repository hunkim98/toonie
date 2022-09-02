import React, { useEffect, useState } from "react";
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

const Bottom = () => {
  const [isMoreToolsOpen, setIsMoreToolsOpen] = useState<boolean>(false);
  const toolType = useSelector((state: RootState) => state.boardState.toolType);
  const dispatch = useDispatch();
  useEffect(() => {
    const activatePanEvent = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        dispatch(setTool(ToolType.Pan));
      }
    };
    const activatePenEvent = (event: KeyboardEvent) => {
      if (event.key === "p") {
        dispatch(setTool(ToolType.Pen));
      }
    };
    const activateRectEvent = (event: KeyboardEvent) => {
      if (event.key === "r") {
        dispatch(setTool(ToolType.Rect));
      }
    };
    const activateEraserEvent = (event: KeyboardEvent) => {
      if (event.key === "e") {
        dispatch(setTool(ToolType.Eraser));
      }
    };
    window.addEventListener("keydown", activatePanEvent);
    window.addEventListener("keydown", activatePenEvent);
    window.addEventListener("keydown", activateRectEvent);
    window.addEventListener("keydown", activateEraserEvent);
    return () => {
      window.removeEventListener("keydown", activatePanEvent);
      window.removeEventListener("keydown", activatePenEvent);
      window.removeEventListener("keydown", activateRectEvent);
      window.removeEventListener("keydown", activateEraserEvent);
    };
  }, [dispatch]);
  return (
    <>
      <S.PanningButton
        isSelected={toolType === ToolType.Pan}
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
        isSelected={toolType === ToolType.Rect}
        onClick={() => {
          dispatch(setTool(ToolType.Rect));
        }}
      >
        <RectangleIcon />
      </S.CanvasButton>
      <S.CanvasButton
        isSelected={toolType === ToolType.Eraser}
        onClick={() => {
          dispatch(setTool(ToolType.Eraser));
        }}
      >
        <EraserIcon />
      </S.CanvasButton>
      <S.MoreToolsButton
        isSelected={false}
        onClick={() => {
          setIsMoreToolsOpen(true);
        }}
      >
        {isMoreToolsOpen && (
          <S.MoreToolsPopupContainer>hi</S.MoreToolsPopupContainer>
        )}
        <MoreToolsIcon />
      </S.MoreToolsButton>
    </>
  );
};

export default Bottom;
