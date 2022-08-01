import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";

interface Props {
  children: React.ReactNode;
  extendDirection: "TOP" | "BOTTOM";
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popover = ({
  children,
  extendDirection,
  isVisible,
  setIsVisible,
}: Props) => {
  const wrapperRef = useRef<any>(null);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsVisible(false);
        // alert("You clicked outside of me!");
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <S.Container
      isVisible={isVisible}
      onClick={() => {
        setIsVisible(true);
      }}
      extendDirection={extendDirection}
      ref={wrapperRef}
    >
      {children}
    </S.Container>
  );
};

export default Popover;
