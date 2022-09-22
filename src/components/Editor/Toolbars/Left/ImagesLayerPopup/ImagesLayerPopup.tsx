import React, { useContext, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import useAlert from "components/Alert/useAlert";
import { EditorContext } from "components/Editor/Context";
import { AlertType } from "components/Alert/AlertContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/slices";
import { ImageElement } from "store/slices/docSlices";
import { setPanZoom } from "store/slices/boardSlices";
import { returnScrollOffsetFromMouseOffset } from "utils/canvas.zoom";
import { diffPoints, getScreenPoint, getWorldPoint } from "utils/canvas";

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
  setIsImagesLayerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImagesLayerPopup: React.FC<Props> = ({
  setIsImagesLayerOpen,
  inputRef,
}) => {
  const wrapperRef = useRef<any>(null);
  const { width, height } = useContext(EditorContext);
  const panZoom = useSelector((state: RootState) => state.boardState.panZoom);
  const dispatch = useDispatch();
  const doc = useSelector((state: RootState) => state.docState.doc);
  const [docImages, setDocImages] = useState<ImageElement[]>([]);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  useEffect(() => {
    if (!doc) {
      return;
    }
    const images = doc!.getRoot().images;
    setDocImages(images);
  }, [doc]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsImagesLayerOpen(false);
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    if (!doc) {
      return () => {};
    }
    const unsubscribe = doc.subscribe((event) => {
      if (event.type === "remote-change") {
        for (const changeInfo of event.value) {
          for (const path of changeInfo.paths) {
            if (path.startsWith(`$.images`)) {
              setDocImages(doc.getRoot().images);
            }
          }
        }
      } else if (event.type === "local-change") {
        for (const changeInfo of event.value) {
          for (const path of changeInfo.paths) {
            if (path.startsWith(`$.images`)) {
              setDocImages(doc.getRoot().images);
            }
          }
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [doc]);
  return (
    <S.PopupContainer ref={wrapperRef}>
      <S.PopupTitle>Images</S.PopupTitle>
      <S.LayerContainer>
        {docImages.map((image, index) => {
          return (
            <S.Layer key={index}>
              <S.ImageName
                onClick={() => {
                  const middlePoint = returnScrollOffsetFromMouseOffset(
                    { x: width / 2, y: height / 2 },
                    panZoom,
                    panZoom.scale
                  );

                  dispatch(
                    setPanZoom({
                      offset: {
                        x:
                          image.position.x * panZoom.scale +
                          width / 2 -
                          (image.width * panZoom.scale) / 2,
                        y:
                          -image.position.y * panZoom.scale +
                          height / 2 -
                          (image.height * panZoom.scale) / 2,
                      },
                      scale: panZoom.scale,
                    })
                  );
                }}
              >
                {image.name}
              </S.ImageName>
              <S.Remove
                onClick={(e) => {
                  doc?.update((root) => {
                    root.images = docImages.filter(
                      (_, elementIndex) => index !== elementIndex
                    );
                  });
                }}
              >
                Delete
              </S.Remove>
            </S.Layer>
          );
        })}
      </S.LayerContainer>
      <S.UploadButton onClick={handleClick}>Add Image</S.UploadButton>
    </S.PopupContainer>
  );
};

export default ImagesLayerPopup;
