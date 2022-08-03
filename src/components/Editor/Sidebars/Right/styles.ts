import styled from "styled-components";
import { ThemeColor, ToolButton } from "../../../../styles/common";

export const Container = styled.div``;

export const TopTools = styled.div``;

export const SelectableTool = styled(ToolButton)<{
  isSelected: boolean;
  isToolActivated: boolean;
}>`
  background-color: ${({ isSelected }) => isSelected && ThemeColor};
  opacity: ${({ isToolActivated }) => (isToolActivated ? 1 : 0.5)};
`;

export const Pen = styled(SelectableTool)``;

export const Eraser = styled(SelectableTool)``;

export const Rect = styled(SelectableTool)``;

export const Download = styled(ToolButton)`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
`;
