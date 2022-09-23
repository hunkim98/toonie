import { useContext, useEffect, useRef } from "react";
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
  const { setWidth, setHeight, uploadImage, MAXIMUM_FILE_UPLOADS } =
    useContext(EditorContext);
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const doc = useSelector((state: RootState) => state.docState.doc);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = event.target.files!;
    if (filesArray.length < MAXIMUM_FILE_UPLOADS) {
      alert.open({
        message: "The images is being uploaded...",
        type: AlertType.LOADING,
      });
      Promise.all(
        Array.from(filesArray).map((file) => {
          return uploadImage(file);
        })
      )
        .then(() => {
          alert.close();
        })
        .catch((err) => {
          alert.open({ message: err.message });
          console.log(err);
        });
    } else {
      alert.open({ message: "You cannot upload more than 5 files!" });
    }
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
    const images = doc.getRoot().images;
    if (!images || images.length === 0) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        multiple
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
