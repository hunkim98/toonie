import React, { useEffect, useRef } from "react";
import * as S from "./styles";

interface Props {
  children: React.ReactNode;
  extendDirection: "TOP" | "BOTTOM";
  isVisible: boolean;
  makeVisible: () => void;
  makeInvisible: () => void;
}

const Popover = ({
  children,
  extendDirection,
  isVisible,
  makeVisible,
  makeInvisible,
}: Props) => {
  const wrapperRef = useRef<any>(null);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        makeInvisible();
        // alert("You clicked outside of me!");
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, makeInvisible, makeVisible]);

  return (
    <S.Container
      isVisible={isVisible}
      onClick={() => {
        makeVisible();
      }}
      extendDirection={extendDirection}
      ref={wrapperRef}
    >
      {children}
    </S.Container>
  );
};

export default Popover;
