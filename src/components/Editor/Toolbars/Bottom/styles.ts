import styled from "styled-components";
import { ThemeColor } from "../../../../styles/common";

export const CanvasButton = styled.button<{ isSelected: boolean }>`
  border: none;
  background: none;
  font-size: 1em;
  width: 80px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  margin: 0 5px;
  background-color: #f1f1f1;
  cursor: pointer;
  pointer-events: auto;
  padding: 10px;
  background-color: ${({ isSelected }) => isSelected && ThemeColor};
`;

export const PanningButton = styled(CanvasButton)`
  width: 150px;
`;

export const MoreToolsButton = styled(CanvasButton)`
  background-color: #f1f1f1;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  position: relative;
`;

export const MoreToolsPopupContainer = styled.div`
  top: -15px;
  width: 100px;
  background-color: white;
  position: absolute;
`;
