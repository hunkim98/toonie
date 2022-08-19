import React from "react";
import { Left } from "./Left";
import { Right } from "./Right";
import * as S from "./styles";

const Sidebars = () => {
  return (
    <>
      <S.RightContainer
        unselectable="on"
        onSelect={() => false}
        onMouseDown={() => false}
      >
        <Right />
      </S.RightContainer>
      <S.LeftContainer
        unselectable="on"
        onSelect={() => false}
        onMouseDown={() => false}
      >
        <Left />
      </S.LeftContainer>
    </>
  );
};

export default Sidebars;
