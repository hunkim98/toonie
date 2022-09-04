import styled from "styled-components";
import {
  CommonSidePaddingMobile,
  CommonSidePaddingLaptop,
} from "../../styles/common";
import { device } from "../../utils/cssMedia";

export const FooterHeight = 30;

export const Container = styled.div`
  display: flex;
  opacity: 0.8;
  font-size: 0.8em;
  width: 100%;
  position: absolute;
  bottom: 0;
  justify-content: space-between;
  background-color: #f1f1f1;
  height: ${FooterHeight}px;
`;

export const Copyright = styled.div`
  cursor: pointer;
  padding: 10px ${CommonSidePaddingMobile}px;
  @media ${device.laptop} {
    /* max-width: calc(33.33% - 10px); */
    padding: 10px ${CommonSidePaddingLaptop}px;
  }
`;

export const About = styled.div`
  cursor: pointer;
  padding: 10px ${CommonSidePaddingMobile}px;
  @media ${device.laptop} {
    /* max-width: calc(33.33% - 10px); */
    padding: 10px ${CommonSidePaddingLaptop}px;
  }
`;
