import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/slices";
import {
  activateSpaceKey,
  activateTool,
  deactivateSpaceKey,
  deactivateTool,
  setImgUrl,
} from "../../store/slices/boardSlices";
import DrawingBoard from "./DrawingBoard";
import { PressStatusButton } from "./PressStatusButton";
import { Toolbars } from "./Toolbars";
import * as S from "./styles";
import { UploadScreen } from "./UploadScreen";

const Editor = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
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

    const activateToolEvent = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        dispatch(activateTool());
        dispatch(activateSpaceKey());
      }
    };

    const deactivateToolEvent = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        dispatch(deactivateTool());
        dispatch(deactivateSpaceKey());
      }
    };

    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", activateToolEvent);
    window.addEventListener("keyup", deactivateToolEvent);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", activateToolEvent);
      window.removeEventListener("keyup", deactivateToolEvent);
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
            <DrawingBoard width={width} height={height} />
          </S.BoardContainer>
          {/* <PressStatusButton /> */}
        </>
      )}
    </S.Container>
  );
};

export default Editor;
