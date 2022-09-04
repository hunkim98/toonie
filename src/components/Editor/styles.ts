import styled from "styled-components";
import { FooterHeight } from "../Footer/styles";
import { NavbarHeight } from "../Navbar/styles";

export const Container = styled.div`
  flex: 1 0;
`;

export const BoardContainer = styled.div`
  top: ${NavbarHeight}px;
  height: calc(100% - ${NavbarHeight}px - ${FooterHeight}px);
  width: calc(100%);
  position: fixed;
`;
