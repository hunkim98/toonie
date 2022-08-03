import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/slices";
import { setTool, ToolType } from "../../../../store/slices/boardSlice";
import * as S from "./styles";

const Right = () => {
  const dispatch = useDispatch();
  const toolType = useSelector((state: RootState) => state.boardState.toolType);
  const isToolActivated = useSelector(
    (state: RootState) => state.boardState.isToolActivated
  );
  return (
    <>
      <S.TopTools>
        <S.Pen
          isSelected={toolType === ToolType.Pen}
          isToolActivated={isToolActivated}
          onClick={() => {
            dispatch(setTool(ToolType.Pen));
          }}
        >
          ✎
        </S.Pen>
        <S.Rect
          isSelected={toolType === ToolType.Rect}
          isToolActivated={isToolActivated}
          onClick={() => {
            dispatch(setTool(ToolType.Rect));
          }}
        >
          ☐
        </S.Rect>
        <S.Eraser
          isSelected={toolType === ToolType.Eraser}
          isToolActivated={isToolActivated}
          onClick={() => {
            dispatch(setTool(ToolType.Eraser));
          }}
        >
          🀰
        </S.Eraser>
      </S.TopTools>
      <S.Download>📁</S.Download>
    </>
  );
};

export default Right;
