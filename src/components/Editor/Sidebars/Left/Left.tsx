import React from "react";
import * as S from "./styles";

function Left() {
  return (
    <>
      <S.Delete>🗑</S.Delete>
      <S.ScaleContainer>
        <S.ZoomIn>+</S.ZoomIn>
        <S.ScaleDegreeLine></S.ScaleDegreeLine>
        <S.ZoomOut>-</S.ZoomOut>
      </S.ScaleContainer>
    </>
  );
}

export default Left;
