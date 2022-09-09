import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/slices";
import DrawingBoard from "./DrawingBoard";
import { Toolbars } from "./Toolbars";
import * as S from "./styles";
import { EditorContext } from "./Context";
import useAlert from "components/Alert/useAlert";
import { ThemeColor } from "styles/common";
import React from "react";
import { AlertType } from "components/Alert/AlertContext";

const Editor = () => {
  const alert = useAlert();
  const { setWidth, setHeight, uploadImage } = useContext(EditorContext);
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const doc = useSelector((state: RootState) => state.docState.doc);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files![0];
    alert.open({
      message: "The image is being uploaded...",
      type: AlertType.LOADING,
    });
    uploadImage(fileUploaded)
      .then(() => {
        alert.close();
      })
      .catch(() => {
        alert.close();
      });
  };

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  useEffect(() => {
    if (!doc) {
      return () => {};
    }
    const imgOriginal = doc.getRoot().imgUrl;
    if (!imgOriginal) {
      alert.open({
        message:
          "This document does not seem to have an image to review on! Would you like to upload an image?",
        buttons: [
          {
            label: "Upload Image",
            onClick: handleClick,
            style: { backgroundColor: ThemeColor },
          },
          {
            label: "No, I'm fine",
            onClick: () => {
              alert.close();
            },
          },
        ],
        description:
          "Toonie is a collaborative space for reviewing images together",
      });
    }
  }, [doc]);

  useEffect(() => {
    const onResize = () => {
      if (!divRef.current) {
        return;
      }
      const rect = divRef.current?.getBoundingClientRect();
      setWidth(rect.width);
      setHeight(rect.height);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [dispatch, setWidth, setHeight]);
  return (
    <S.Container>
      {/* {imgUrl === undefined ? (
        <UploadScreen />
      ) : ( */}

      <input
        type="file"
        accept="image/*"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      ></input>
      <Toolbars />
      <S.BoardContainer ref={divRef}>
        <DrawingBoard />
      </S.BoardContainer>
      {/* )} */}
    </S.Container>
  );
};

export default Editor;
