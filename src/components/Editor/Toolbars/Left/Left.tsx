import { AlertType } from "components/Alert/AlertContext";
import useAlert from "components/Alert/useAlert";
import React, { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeColor } from "styles/common";
import { RootState } from "../../../../store/slices";
import { setPanZoom } from "../../../../store/slices/boardSlices";
import { MAX_SCALE, MIN_SCALE } from "../../../../utils/canvas";
import { returnScrollOffsetFromMouseOffset } from "../../../../utils/canvas.zoom";
import { EditorContext } from "../../Context";
import { ImageIcon, PlusIcon } from "../icons";
import { ImagesLayerPopup } from "./ImagesLayerPopup";
import * as S from "./styles";

function Left() {
  const alert = useAlert();
  const { width, height, uploadImage, MAXIMUM_FILE_UPLOADS } =
    useContext(EditorContext);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const panZoom = useSelector((state: RootState) => state.boardState.panZoom);
  const wrapperRef = useRef<any>(null);
  const [isImagesLayerOpen, setIsImagesLayerOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const updatePanZoom = (newScale: number) => {
    dispatch(
      setPanZoom({
        offset: returnScrollOffsetFromMouseOffset(
          { x: width / 2, y: height / 2 },
          panZoom,
          newScale
        ),
        scale: newScale,
      })
    );
  };
  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //       setIsImagesLayerOpen(false);
  //     }
  //   }
  //   window.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     window.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

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
          alert.close();
          console.log(err);
        });
    } else {
      alert.open({ message: "You cannot upload more than 5 files!" });
    }
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      ></input>
      <S.ImagesButton
        ref={wrapperRef}
        onClick={(e) => {
          setIsImagesLayerOpen(true);
        }}
      >
        <ImageIcon style={{ cursor: "pointer" }} />
        <S.ImagePlusButton>
          <PlusIcon
            fill={ThemeColor}
            style={{
              cursor: "pointer",
              right: 0,
              bottom: 0,
              position: "absolute",
            }}
          />
        </S.ImagePlusButton>
        {isImagesLayerOpen && (
          <ImagesLayerPopup
            inputRef={hiddenFileInput}
            setIsImagesLayerOpen={setIsImagesLayerOpen}
          />
        )}
      </S.ImagesButton>
      <S.ScaleContainer>
        <S.ZoomIn
          onClick={(e) => {
            e.preventDefault();
            const newScale = panZoom.scale + 0.2;
            if (newScale > MAX_SCALE || newScale < MIN_SCALE) {
              return;
            }
            updatePanZoom(newScale);
          }}
        >
          +
        </S.ZoomIn>
        <S.ScaleDegreeLine></S.ScaleDegreeLine>
        <S.ZoomOut
          onClick={(e) => {
            e.preventDefault();
            const newScale = panZoom.scale - 0.2;
            if (newScale > MAX_SCALE || newScale < MIN_SCALE) {
              return;
            }

            updatePanZoom(newScale);
          }}
        >
          -
        </S.ZoomOut>
      </S.ScaleContainer>
    </>
  );
}

export default Left;
