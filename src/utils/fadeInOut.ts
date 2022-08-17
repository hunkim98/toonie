import { css, keyframes } from "styled-components";

export const FadeInOutSettings = (isVisible: boolean) => css`
  transition: visibility 0.15s linear;
  visibility: ${isVisible ? "visible" : "hidden"};
  z-index: 15;
  animation: ${isVisible ? fadeIn : fadeOut} 0.15s ease-out;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
