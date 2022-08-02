import React, { useEffect, useRef, useState } from "react";
import DrawingBoard from "./DrawingBoard";
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
    <S.Container ref={divRef}>
      <DrawingBoard width={width} height={height} />
    </S.Container>
  );
};

export default Editor;
