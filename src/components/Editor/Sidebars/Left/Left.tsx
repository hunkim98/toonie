import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/slices";
import * as S from "./styles";

function Left() {
  const doc = useSelector((state: RootState) => state.docState.doc);
  return (
    <>
      <S.Delete
        onClick={(e) => {
          e.preventDefault();
          doc?.update((root) => {
            root.shapes = [];
            root.imgUrl = undefined;
          });
        }}
      >
        🗑
      </S.Delete>
      <S.ScaleContainer>
        <S.ZoomIn>+</S.ZoomIn>
        <S.ScaleDegreeLine></S.ScaleDegreeLine>
        <S.ZoomOut>-</S.ZoomOut>
      </S.ScaleContainer>
    </>
  );
}

export default Left;
