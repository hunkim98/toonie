import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/slices";
import { setPanZoom } from "../../../../store/slices/boardSlices";
import { MAX_SCALE, MIN_SCALE } from "../../../../utils/canvas";
import { returnScrollOffsetFromMouseOffset } from "../../../../utils/canvas.zoom";
import { EditorContext } from "../../Context";
import * as S from "./styles";

function Left() {
  const { width, height } = useContext(EditorContext);
  const panZoom = useSelector((state: RootState) => state.boardState.panZoom);
  const dispatch = useDispatch();
  const updatePanZoom = (newScale: number) => {
    dispatch(
      setPanZoom({
        offset: returnScrollOffsetFromMouseOffset(
          { x: width / 2, y: height / 2 },
          panZoom,
          newScale
        ),
        scale: newScale,
      })
    );
  };
  return (
    <>
      <S.ScaleContainer>
        <S.ZoomIn
          onClick={(e) => {
            e.preventDefault();
            const newScale = panZoom.scale + 0.2;
            if (newScale > MAX_SCALE || newScale < MIN_SCALE) {
              return;
            }
            updatePanZoom(newScale);
          }}
        >
          +
        </S.ZoomIn>
        <S.ScaleDegreeLine></S.ScaleDegreeLine>
        <S.ZoomOut
          onClick={(e) => {
            e.preventDefault();
            const newScale = panZoom.scale - 0.2;
            if (newScale > MAX_SCALE || newScale < MIN_SCALE) {
              return;
            }

            updatePanZoom(newScale);
          }}
        >
          -
        </S.ZoomOut>
      </S.ScaleContainer>
    </>
  );
}

export default Left;
