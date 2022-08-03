import React, { useEffect, useRef, useState } from "react";
import DrawingBoard from "./DrawingBoard";
import { Sidebars } from "./Sidebars";
import * as S from "./styles";

const Editor = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => {
      if (!divRef.current) {
        return;
      }

      const rect = divRef.current?.getBoundingClientRect();
      console.log(rect.width, rect.height);
      setWidth(rect.width);
      setHeight(rect.height);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <S.Container>
      <Sidebars />
      <S.BoardContainer ref={divRef}>
        <DrawingBoard width={width} height={height} />
      </S.BoardContainer>
    </S.Container>
  );
};

export default Editor;
