import React, { createContext, useState } from "react";

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
}
const EditorContext = createContext<EditorContextElements>(
  {} as EditorContextElements
);

const EditorContextProvider: React.FC<Props> = ({ children }) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  return (
    <EditorContext.Provider value={{ width, height, setWidth, setHeight }}>
      {children}
    </EditorContext.Provider>
  );
};

export { EditorContext, EditorContextProvider };
