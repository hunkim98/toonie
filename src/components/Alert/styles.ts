import styled from "styled-components";
import { device } from "../../utils/cssMedia";

export const AlertBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

export const AlertContainer = styled.div`
  background-color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  align-items: center;
`;

export const AlertMessage = styled.div`
  align-self: center;
  padding-top: 10px;
  padding-bottom: 20px;
  font-size: 1.2em;
  word-break: keep-all;
  line-height: 1.3em;
`;

export const AlertButtonsContainer = styled.div`
  display: flex;
  padding: 20px 0;
  width: 100%;
  max-width: 460px;
  flex-direction: column;
  @media ${device.laptop} {
    flex-direction: row;
  }
`;

export const AlertButton = styled.button`
  cursor: pointer;
  color: black;
  background: none;
  border: none;
  margin-bottom: 10px;
  padding: 15px 0;
  font-size: 1em;
  flex: 1 0;
`;
