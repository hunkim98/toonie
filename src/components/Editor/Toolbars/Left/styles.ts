import styled from "styled-components";
import { ToolButton } from "../../../../styles/common";

export const Delete = styled(ToolButton)`
  background-color: black;
  pointer-events: auto;
`;

export const ScaleContainer = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
`;

const ZoomButton = styled.button`
  width: 30px;
  height: 30px;
  background: none;
  pointer-events: auto;
  color: black;
  border: 1px solid black;
`;

export const ZoomIn = styled(ZoomButton)``;

export const ScaleDegreeLine = styled.div`
  position: relative;
  height: 130px;
  border-right: 1px solid black;
  border-left: 1px solid black;
`;

export const ZoomOut = styled(ZoomButton)``;

export const ImagesButton = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
  padding: 15px;
  border-radius: 50%;
  background-color: #d9d9d9;
  pointer-events: auto;
`;

export const ImagePlusButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
`;

export const ImagesLayerPopup = styled.div`
  pointer-events: none;
  overflow: hidden;
  top: 10px;
  left: 10px;
  position: absolute;
  background-color: white;
  /* background-color: #d9d9d9; */
  width: 200px;
  height: 150px;
  border: 1.5px solid black;
  border-radius: 17.5px;
  z-index: 3;
  display: flex;
  flex-direction: column;
`;

export const ImagesLayerContainer = styled.div`
  flex: 1;
  padding-top: 10px;
`;

export const AddImageButton = styled.button`
  pointer-events: auto;
  height: 30px;
  font-size: 0.5em;
  font-weight: bold;
  color: black;
  background: none;
  border: none;
  cursor: pointer;
  background-color: #d9d9d9;
`;

export const ImagesLayerTitle = styled.div`
  pointer-events: none;
  font-size: 0.5em;
  font-weight: bold;
  padding: 0 10px;
`;
