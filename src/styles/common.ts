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

export const ThemeColor = "#00CC52";
