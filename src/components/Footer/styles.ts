import styled from "styled-components";
import { CommonPadding } from "../../styles/common";

export const FooterHeight = 30;

export const Container = styled(CommonPadding)`
  display: flex;
  opacity: 0.8;
  font-size: 0.8em;
  justify-content: space-between;
  background-color: #f1f1f1;
  height: ${FooterHeight}px;
`;

export const Copyright = styled.div`
  padding: 10px 0;
`;

export const About = styled.div`
  cursor: pointer;
  padding: 10px 0;
`;
