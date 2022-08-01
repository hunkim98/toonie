import styled, { css, keyframes } from "styled-components";
import { FadeInOutSettings } from "../../../utils/fadeInOut";

export const Container = styled.div<{
  extendDirection: "TOP" | "BOTTOM";
  isVisible: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  flex-grow: 1;
  width: 100%;
  max-width: 500px;
  transform: translate(-50%, -50%);
  ${(props) => FadeInOutSettings(props.isVisible)}
`;
