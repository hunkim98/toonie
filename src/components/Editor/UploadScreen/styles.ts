import styled from "styled-components";
import { CaveatFont, ThemeColor } from "../../../styles/common";
import { FooterHeight } from "../../Footer/styles";
import { NavbarHeight } from "../../Navbar/styles";

export const Container = styled.section`
  display: flex;
  position: absolute;
  width: 100%;
  height: calc(100% - ${FooterHeight}px - ${NavbarHeight}px);
  flex-direction: column;
`;

export const ContentContainer = styled.div`
  flex-direction: column;
  margin: 15px;
  flex: 1 0;
  background: #f4f4f4;
  border: 4px dashed #000000;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const WelcomeMessage = styled(CaveatFont)`
  font-size: 2.2em;
  font-weight: bold;
  text-align: center;
`;

export const Symbol = styled(CaveatFont)`
  font-size: 3.5em;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Button = styled.button`
  height: 40px;
  width: 200px;
  border: none;
  background: none;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
`;
export const Upload = styled(Button)`
  background-color: ${ThemeColor};
  border-radius: 10px;
  color: black;
`;

export const StartAsBlank = styled(Button)`
  color: black;
  border: 1px solid black;
  border-radius: 10px;
  opacity: 0.5;
`;
