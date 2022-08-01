import styled from "styled-components";
import { device } from "../../../utils/cssMedia";

export const Container = styled.div`
  background-color: white;
  position: relative;
  width: 100%;
  left: 50%;
  height: 100%;
  transform: translate(-50%, 50%);
  width: 300px;
  display: flex;
  /* @media ${device.laptop} {
    width: 400px;
  } */
  border-radius: 10px;
  padding: 15px;
  margin-top: 30px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 6px 7px 5px -1px rgba(0, 0, 0, 0.1);
  /* justify-content: space-between; */
`;

export const Arrow = styled.div`
  ::after {
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
    content: "";
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -100%);
  }
`;

export const SizesContainer = styled.div`
  align-items: flex-end;
  flex-grow: 1;
  color: black;
  display: flex;
  flex-direction: column;
`;

export const Size = styled.div<{ size: number }>`
  background-color: rgba(0, 0, 0, 0.1);
`;
