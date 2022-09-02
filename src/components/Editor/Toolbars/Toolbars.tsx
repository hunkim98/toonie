import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/slices";
import { ToolType } from "../../../store/slices/boardSlices";
import { Bottom } from "./Bottom";
import { Left } from "./Left";
import { Right } from "./Right";
import * as S from "./styles";

const Toolbars = () => {
  const isDrawingActivated = useSelector(
    (state: RootState) => state.boardState.toolType !== ToolType.Pan
  );

  return (
    <>
      {/* <S.RightContainer
        unselectable="on"
        onSelect={() => false}
        onMouseDown={() => false}
      >
        <Right />
      </S.RightContainer> */}
      <S.LeftContainer
        unselectable="on"
        onSelect={() => false}
        onMouseDown={() => false}
      >
        <Left />
      </S.LeftContainer>
      <S.BottomContainer
        isDrawingActivated={isDrawingActivated}
        unselectable="on"
        onSelect={() => false}
        onMouseDown={() => false}
      >
        <Bottom />
      </S.BottomContainer>
    </>
  );
};

export default Toolbars;
