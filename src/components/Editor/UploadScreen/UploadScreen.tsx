import React, { useEffect } from "react";
import * as S from "./styles";
import Dropzone, { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { setImgUrl } from "../../../store/slices/boardSlices";

const UploadScreen = ({}) => {
  const dispatch = useDispatch();
  const uploadImgToServer = (file: File) => {
    dispatch(setImgUrl("https://cataas.com/cat"));
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
    maxFiles: 1,
    maxSize: 3 * 1000000,
  });

  const accepted = acceptedFiles.map((file) => {
    uploadImgToServer(file);
    console.log(file.name);
  });
  const rejected = fileRejections.map((file) =>
    alert(`${file.file.name}의 용량이 3MB를 초과합니다`)
  );

  return (
    <S.Container>
      <S.ContentContainer {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <S.WelcomeMessage>Welcome to</S.WelcomeMessage>
        <S.Symbol>toonie</S.Symbol>
        <S.Upload>Upload Image</S.Upload>
        <S.StartAsBlank
          onClick={(e) => {
            e.stopPropagation();

            console.log("hihih");
          }}
        >
          Use blank paper
        </S.StartAsBlank>
      </S.ContentContainer>
    </S.Container>
  );
};

export default UploadScreen;
