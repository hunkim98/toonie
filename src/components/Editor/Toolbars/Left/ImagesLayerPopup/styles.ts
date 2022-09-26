import styled from "styled-components";

export const PopupContainer = styled.div`
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

export const PopupTitle = styled.div`
  pointer-events: none;
  font-size: 0.5em;
  font-weight: bold;
  padding: 10px 10px;
`;

export const LayerContainer = styled.div`
  overflow-y: scroll;
  flex: 1;
`;

export const Layer = styled.div`
  cursor: pointer;
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;
`;

export const ImageName = styled.div`
  flex: 3;
  font-size: 0.5em;
  overflow-x: hidden;
  /* width: 100%; */
  /* padding-top: 10; */
  display: inline;
  line-height: 1.5em;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  //for line clamp the height should be a fixed pixel unit not em
`;

export const Remove = styled.button`
  flex: 1;
  color: black;
  background: none;
  border: none;
  opacity: 0.5;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

export const UploadButton = styled.button`
  pointer-events: auto;
  width: 100%;
  height: 30px;
  font-size: 0.5em;
  font-weight: bold;
  color: black;
  background: none;
  border: none;
  cursor: pointer;
  background-color: #d9d9d9;
`;
