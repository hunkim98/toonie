import styled from "styled-components";

export const RightContainer = styled.div`
  pointer-events: none;
  font-size: 2em;
  position: absolute;
  top: 25px;
  right: 10px;
  height: 100%;
  z-index: 5;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

export const LeftContainer = styled.div`
  pointer-events: none;
  font-size: 2em;
  position: absolute;
  top: 25px;
  left: 10px;
  height: 100%;
  z-index: 5;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

export const BottomContainer = styled.div`
  pointer-events: none;
  font-size: 2em;
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 5;
  border-radius: 10px;
  padding: 10px 5px;
  display: flex;
  background-color: #d9d9d9;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;
