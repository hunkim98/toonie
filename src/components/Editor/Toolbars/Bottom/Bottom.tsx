import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/slices";
import {
  ToolType,
  setTool,
  openBrushPopup,
  setIsDownloadClicked,
} from "../../../../store/slices/boardSlices";
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
  const doc = useSelector((state: RootState) => state.docState.doc);
  const dispatch = useDispatch();
  const wrapperRef = useRef<any>(null);
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
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsMoreToolsOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", activatePanEvent);
    window.addEventListener("keydown", activatePenEvent);
    window.addEventListener("keydown", activateRectEvent);
    window.addEventListener("keydown", activateEraserEvent);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", activatePanEvent);
      window.removeEventListener("keydown", activatePenEvent);
      window.removeEventListener("keydown", activateRectEvent);
      window.removeEventListener("keydown", activateEraserEvent);
    };
  }, [dispatch, wrapperRef]);

  const onChangeColorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(openBrushPopup());
    setIsMoreToolsOpen(false);
  };
  const onDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMoreToolsOpen(false);
    dispatch(setIsDownloadClicked(true));
  };
  const onResetCanvasClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMoreToolsOpen(false);
    doc?.update((root) => {
      root.shapes = [];
      root.imgUrl = undefined;
    });
  };
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
        ref={wrapperRef}
        isSelected={false}
        onClick={(e) => {
          e.preventDefault();
          setIsMoreToolsOpen(true);
        }}
      >
        {isMoreToolsOpen && (
          <S.MoreToolsPopupContainer>
            <S.MoreToolOption onClick={onChangeColorClick}>
              Change color
            </S.MoreToolOption>
            <S.MoreToolOption onClick={onDownloadClick}>
              Download Snapshot
            </S.MoreToolOption>
            <S.MoreToolOption color="red" onClick={onResetCanvasClick}>
              Reset Canvas
            </S.MoreToolOption>
          </S.MoreToolsPopupContainer>
        )}
        <MoreToolsIcon />
      </S.MoreToolsButton>
    </>
  );
};

export default Bottom;
