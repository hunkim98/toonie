import styled from "styled-components";
import { FooterHeight } from "../Footer/styles";
import { NavbarHeight } from "../Navbar/styles";

export const Container = styled.div`
  flex-grow: 1;
  position: relative;
`;

export const BoardContainer = styled.div`
  top: ${NavbarHeight}px;
  height: calc(100vh - ${NavbarHeight}px - ${FooterHeight});
  width: calc(100%);
  position: fixed;
`;
