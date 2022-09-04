import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/slices";
import { setImgUrl } from "../../store/slices/boardSlices";
import DrawingBoard from "./DrawingBoard";
import { Toolbars } from "./Toolbars";
import * as S from "./styles";
import { UploadScreen } from "./UploadScreen";
import { EditorContext } from "./Context";

const Editor = () => {
  const { setWidth, setHeight } = useContext(EditorContext);
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const doc = useSelector((state: RootState) => state.docState.doc);
  const imgUrl = useSelector((state: RootState) => state.boardState.imgUrl);

  useEffect(() => {
    if (!doc) {
      return () => {};
    }
    const imgOriginal = doc.getRoot().imgUrl;
    dispatch(setImgUrl(imgOriginal));

    const unsubscribe = doc.subscribe((event) => {
      if (event.type === "remote-change" || event.type === "local-change") {
        const imgSrc = doc.getRoot().imgUrl;
        if (imgSrc) {
          dispatch(setImgUrl(imgSrc));
        } else {
          if (imgSrc === null || imgSrc === undefined) {
            dispatch(setImgUrl(undefined));
          } else {
            dispatch(setImgUrl(""));
          }
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [doc, dispatch]);

  useEffect(() => {
    const onResize = () => {
      if (!divRef.current) {
        return;
      }
      const rect = divRef.current?.getBoundingClientRect();
      setWidth(rect.width);
      setHeight(rect.height);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [dispatch]);
  return (
    <S.Container>
      {imgUrl === undefined ? (
        <UploadScreen />
      ) : (
        <>
          <Toolbars />
          <S.BoardContainer ref={divRef}>
            <DrawingBoard />
          </S.BoardContainer>
        </>
      )}
    </S.Container>
  );
};

export default Editor;
