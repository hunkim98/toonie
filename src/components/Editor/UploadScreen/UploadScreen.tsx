import React, { useEffect, useMemo } from "react";
import * as S from "./styles";
import Dropzone, { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setImgUrl } from "../../../store/slices/boardSlices";
import axios from "axios";
import { CloudinaryResponse } from "../../../utils/cloudinary.dto";
import { uuidv4 } from "../../../utils/uuid";
import { RootState } from "../../../store/slices";

interface Props {}

const UploadScreen: React.FC<Props> = () => {
  const doc = useSelector((state: RootState) => state.docState.doc);
  const dispatch = useDispatch();
  const cloudinary_url = useMemo(
    () =>
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
    []
  );
  const uploadImgToServer = (file: File) => {
    var fd = new FormData();
    fd.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET_NAME!);
    fd.append("file", file);
    axios
      .post(cloudinary_url, fd, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      })
      .then((res) => {
        const data = res.data as CloudinaryResponse;
        console.log(data);
        const url = data.url;
        dispatch(setImgUrl(url));
        doc?.update((root) => {
          root.imgUrl = url;
        });
      });
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
            doc?.update((root) => {
              root.imgUrl = "";
            });
          }}
        >
          Use blank paper
        </S.StartAsBlank>
      </S.ContentContainer>
    </S.Container>
  );
};

export default UploadScreen;
