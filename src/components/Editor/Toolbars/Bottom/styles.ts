import styled from "styled-components";
import { ThemeColor } from "../../../../styles/common";

export const CanvasButton = styled.div<{ isSelected: boolean }>`
  border: none;
  background: none;
  font-size: 1em;
  width: 80px;
  height: 30px;
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
`;

export const MoreToolsPopupContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: white;
  transform: translate(-50%, -50%);
  border: 1.5px solid black;
  border-radius: 5px;

  position: absolute;
`;

export const MoreToolOption = styled.button<{ color?: string }>`
  height: 35px;
  font-weight: bold;
  font-size: 0.5em;
  background: none;
  color: ${({ color }) => (color ? color : "black")};
  border: none;
  border-bottom: 1px solid #dddddd;
  cursor: pointer;
  :last-child {
    border: none;
  }

  :hover {
    background-color: ${({ color }) => (color ? color : "black")};
    color: white;
  }
  transition: background-color 0.15s ease, color 0.15s ease;
`;
