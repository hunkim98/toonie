import React from "react";
import { Bottom } from "./Bottom";
import { Left } from "./Left";
import { Right } from "./Right";
import * as S from "./styles";

const Toolbars = () => {
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
