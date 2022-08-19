import { useEffect, useRef } from "react";
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
    return () => {};
  }, [buttonRef]);
  return (
    <S.Container
      ref={buttonRef}
      draggable="false"
      onMouseLeave={(e) => {
        e.preventDefault();
        if (!isSpacePressed) {
          dispatch(deactivateTool());
        }
      }}
      onMouseUp={(e) => {
        e.preventDefault();
        if (!isSpacePressed) {
          dispatch(deactivateTool());
        }
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        dispatch(activateTool());
      }}
      // onPointerDown={(e) => {
      //   e.preventDefault();
      //   if (!isSpacePressed) {
      //     dispatch(deactivateTool());
      //   }
      // }}
      // onPointerUp={(e) => {
      //   e.preventDefault();
      //   if (!isSpacePressed) {
      //     dispatch(deactivateTool());
      //   }
      // }}
      // onTouchCancel={(e) => {
      //   e.preventDefault();
      //   if (!isSpacePressed) {
      //     dispatch(deactivateTool());
      //   }
      // }}
      onTouchStart={(e) => {
        e.preventDefault();
        dispatch(activateTool());
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        if (!isSpacePressed) {
          dispatch(deactivateTool());
        }
      }}
      isToolActivated={isToolActivated}
    ></S.Container>
  );
}

export default PressStatusButton;
