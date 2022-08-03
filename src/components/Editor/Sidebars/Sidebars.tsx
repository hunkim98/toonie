import React from "react";
import { Left } from "./Left";
import { Right } from "./Right";
import * as S from "./styles";

const Sidebars = () => {
  return (
    <>
      <S.RightContainer>
        <Right />
      </S.RightContainer>
      <S.LeftContainer>
        <Left />
      </S.LeftContainer>
    </>
  );
};

export default Sidebars;
