import axios from "axios";
import React, { createContext, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/slices";
import { ImageElement, Root } from "store/slices/docSlices";
import { CloudinaryResponse } from "utils/cloudinary.dto";

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
}
const EditorContext = createContext<EditorContextElements>(
  {} as EditorContextElements
);

const EditorContextProvider: React.FC<Props> = ({ children }) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const doc = useSelector((state: RootState) => state.docState.doc);
  const cloudinary_url = useMemo(
    () =>
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
    []
  );
  const uploadImage = useCallback(
    async (file: File) => {
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
          doc?.update((root) => {
            const imagesCount = root.images.length;
            root.images.push({
              name: file.name,
              url,
              //vertical aligning
              position: { x: 0, y: imagesCount * 1000 },
            });
          });
        });
    },
    [doc]
  );
  return (
    <EditorContext.Provider
      value={{ width, height, setWidth, setHeight, uploadImage }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export { EditorContext, EditorContextProvider };
