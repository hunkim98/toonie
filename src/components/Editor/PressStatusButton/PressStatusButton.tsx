import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/slices";
import {
  activateTool,
  deactivateTool,
} from "../../../store/slices/boardSlices";
import * as S from "./styles";

function PressStatusButton() {
  const isToolActivated = useSelector(
    (state: RootState) => state.boardState.isToolActivated
  );
  const isSpacePressed = useSelector(
    (state: RootState) => state.boardState.isSpacePressed
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (buttonRef && buttonRef.current) {
    }
  }, [buttonRef]);
  return (
    <S.Container
      ref={buttonRef}
      draggable="false"
      onMouseLeave={() => {
        if (!isSpacePressed) {
          dispatch(deactivateTool());
        }
      }}
      onMouseUp={() => {
        if (!isSpacePressed) {
          dispatch(deactivateTool());
        }
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        dispatch(activateTool());
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        dispatch(activateTool());
      }}
      onTouchEnd={() => {
        if (!isSpacePressed) {
          dispatch(deactivateTool());
        }
      }}
      isToolActivated={isToolActivated}
    ></S.Container>
  );
}

export default PressStatusButton;
