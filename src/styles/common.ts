import styled from "styled-components";
import { device } from "../utils/cssMedia";

export const CaveatFont = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Space+Mono&display=swap");
  font-family: "Caveat", cursive;
`;

export const CommonSidePaddingLaptop = 40;
export const CommonSidePaddingMobile = 10;

export const CommonPadding = styled.div`
  padding: 0 ${CommonSidePaddingMobile}px;
  @media ${device.laptop} {
    /* max-width: calc(33.33% - 10px); */
    padding: 0 ${CommonSidePaddingLaptop}px;
  }
  min-width: 300px;
`;

export const ThemeColor = "#78DEA1";

export const ToolButton = styled.button`
  border: none;
  background: none;
  font-size: 1em;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f1f1f1;
  margin-bottom: 15px;
  cursor: pointer;
`;
