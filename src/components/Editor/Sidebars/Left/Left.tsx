import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/slices";
import { setPanZoom } from "../../../../store/slices/boardSlices";
import { MAX_SCALE, MIN_SCALE } from "../../../../utils/canvas";
import * as S from "./styles";

function Left() {
  const doc = useSelector((state: RootState) => state.docState.doc);
  const panZoom = useSelector((state: RootState) => state.boardState.panZoom);
  const dispatch = useDispatch();
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
        <S.ZoomIn
          onClick={(e) => {
            e.preventDefault();
            const newScale = panZoom.scale + 0.2;
            if (newScale > MAX_SCALE) {
              return;
            }
            if (newScale < MIN_SCALE) {
              return;
            }
            dispatch(setPanZoom({ ...panZoom, scale: newScale }));
          }}
        >
          +
        </S.ZoomIn>
        <S.ScaleDegreeLine></S.ScaleDegreeLine>
        <S.ZoomOut
          onClick={(e) => {
            e.preventDefault();
            e.preventDefault();
            const newScale = panZoom.scale - 0.2;
            if (newScale > MAX_SCALE) {
              return;
            }
            if (newScale < MIN_SCALE) {
              return;
            }
            dispatch(setPanZoom({ ...panZoom, scale: newScale }));
          }}
        >
          -
        </S.ZoomOut>
      </S.ScaleContainer>
    </>
  );
}

export default Left;
