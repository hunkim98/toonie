import styled, { css } from "styled-components";
import { device } from "../../../utils/cssMedia";

export const Container = styled.button<{ isToolActivated: boolean }>`
  background: none;
  border: none;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 35px;
  padding: 15px 30px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1em;
  min-width: 180px;
  color: ${({ isToolActivated }) => (isToolActivated ? "#ffffff" : "#000000")};
  background-color: ${({ isToolActivated }) =>
    isToolActivated ? "#000000" : "#d9d9d9"};
  &:after {
    ${({ isToolActivated }) =>
      isToolActivated
        ? css`
            content: "DRAWING MODE!";
          `
        : css`
            content: "Press To Draw";
          `}
  }
  @media ${device.laptop} {
    &:after {
      ${({ isToolActivated }) =>
        isToolActivated
          ? css`
              content: "DRAWING MODE!";
            `
          : css`
              content: "Press or the Spacebar or this button to start drawing";
            `}
    }
  }
`;
