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

export const SizesPicker = styled.div`
  align-items: flex-end;
  flex-grow: 1;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SizeContainer = styled.div<{ isSelected: boolean }>`
  width: 50px;
  height: 50px;
  background-color: ${({ isSelected }) => {
    return isSelected ? "rgba(0, 0, 0, 255)" : "rgba(0, 0, 0, 0.1)";
  }};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Size = styled.div<{ size: number; isSelected: boolean }>`
  background-color: ${({ isSelected }) => {
    return isSelected ? "rgba(255, 255, 255, 255)" : "rgba(0, 0, 0, 255)";
  }};
  width: ${({ size }) => {
    return `${size}px`;
  }};
  height: ${({ size }) => {
    return `${size}px`;
  }};
  border-radius: 50%;
`;
