import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  activateSpaceKey,
  activateTool,
  deactivateSpaceKey,
  deactivateTool,
} from "../../store/slices/boardSlices";
import DrawingBoard from "./DrawingBoard";
import { PressStatusButton } from "./PressStatusButton";
import { Sidebars } from "./Sidebars";
import * as S from "./styles";

const Editor = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

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
  }, []);
  return (
    <S.Container>
      <Sidebars />
      <S.BoardContainer ref={divRef}>
        <DrawingBoard width={width} height={height} />
      </S.BoardContainer>
      <PressStatusButton />
    </S.Container>
  );
};

export default Editor;
