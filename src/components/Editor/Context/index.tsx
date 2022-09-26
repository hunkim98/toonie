import axios from "axios";
import React, { createContext, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/slices";
import { CloudinaryResponse } from "utils/cloudinary.dto";
import {
  imageBetweenDistance,
  maxImageSideLength,
} from "../DrawingBoard/Canvas/image";

interface Props {
  //Starting from React 18 children prop is implicityl removed
  //https://solverfox.dev/writing/no-implicit-children/
  children: React.ReactNode;
}

interface EditorContextElements {
  width: number;
  height: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  uploadImage: (file: File) => Promise<void>;
  MAXIMUM_FILE_UPLOADS: number;
}
const EditorContext = createContext<EditorContextElements>(
  {} as EditorContextElements
);

const EditorContextProvider: React.FC<Props> = ({ children }) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const MAXIMUM_FILE_UPLOADS = useMemo(() => 5, []);
  const doc = useSelector((state: RootState) => state.docState.doc);
  const cloudinary_url = useMemo(
    () =>
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
    []
  );
  const uploadImage = useCallback(
    async (file: File) => {
      console.log(file.size, file.name);
      if (file.size > 3 * 1000000) {
        throw new Error("File size cannot exceed 3MB");
      }
      var fd = new FormData();
      fd.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET_NAME!);
      fd.append("file", file);
      return axios
        .post(cloudinary_url, fd, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then((res) => {
          const data = res.data as CloudinaryResponse;
          const url = data.secure_url; //secure_url gives us https not http
          const img = new Image();
          img.src = data.secure_url;
          img.onload = () => {
            doc?.update((root) => {
              let imageWidth = img.naturalWidth;
              let imageHeight = img.naturalHeight;
              const isWidthLonger = imageWidth > imageHeight;
              if (isWidthLonger) {
                if (imageWidth > maxImageSideLength) {
                  imageHeight = (maxImageSideLength * imageHeight) / imageWidth;
                  imageWidth = maxImageSideLength;
                }
              } else {
                if (imageHeight > maxImageSideLength) {
                  imageWidth = (maxImageSideLength * imageWidth) / imageHeight;
                  imageHeight = maxImageSideLength;
                }
              }

              const imagesCount = root.images.length;
              let imageYPosition = 0;
              for (let i = 0; i < imagesCount; i++) {
                const firstImageYPosition = root.images[i].position.y;
                const secondImageYPosition =
                  i + 1 >= imagesCount ? null : root.images[i + 1].position.y;
                if (
                  !secondImageYPosition ||
                  secondImageYPosition - firstImageYPosition >
                    maxImageSideLength + 2 * imageBetweenDistance
                ) {
                  imageYPosition =
                    firstImageYPosition +
                    root.images[i].height +
                    imageBetweenDistance;
                  break;
                }
              }
              root.images.push({
                name: file.name,
                url,
                width: imageWidth,
                height: imageHeight,
                //vertical aligning
                position: { x: 0, y: imageYPosition },
              });
            });
          };
        });
    },
    [doc, cloudinary_url]
  );
  return (
    <EditorContext.Provider
      value={{
        width,
        height,
        setWidth,
        setHeight,
        uploadImage,
        MAXIMUM_FILE_UPLOADS,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export { EditorContext, EditorContextProvider };
