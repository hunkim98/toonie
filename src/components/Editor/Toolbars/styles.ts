import styled from "styled-components";
import { FooterHeight } from "../../Footer/styles";
import { NavbarHeight } from "../../Navbar/styles";

export const RightContainer = styled.div`
  pointer-events: none;
  font-size: 2em;
  position: absolute;
  top: 25px;
  right: 10px;
  height: 100%;
  z-index: 5;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

export const LeftContainer = styled.div`
  pointer-events: none;
  font-size: 2em;
  position: absolute;
  top: ${25 + NavbarHeight}px;
  left: 10px;
  z-index: 5;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

export const BottomContainer = styled.div<{ isDrawingActivated: boolean }>`
  pointer-events: none;
  font-size: 2em;
  position: absolute;
  bottom: ${35 + FooterHeight}px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 5;
  border-radius: 10px;
  padding: 10px 5px;
  display: flex;
  background-color: ${({ isDrawingActivated }) =>
    isDrawingActivated ? "#000000" : "#d9d9d9"};
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
  transition: background-color 0.15s ease;
`;
