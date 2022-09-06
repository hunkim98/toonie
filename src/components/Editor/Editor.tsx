import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/slices";
import { setImgUrl } from "../../store/slices/boardSlices";
import DrawingBoard from "./DrawingBoard";
import { Toolbars } from "./Toolbars";
import * as S from "./styles";
import { UploadScreen } from "./UploadScreen";
import { EditorContext } from "./Context";
import useAlert from "components/Alert/useAlert";
import { ThemeColor } from "styles/common";

const Editor = () => {
  const alert = useAlert();
  const { setWidth, setHeight } = useContext(EditorContext);
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const doc = useSelector((state: RootState) => state.docState.doc);
  const imgUrl = useSelector((state: RootState) => state.boardState.imgUrl);

  useEffect(() => {
    if (!doc) {
      return () => {};
    }
    const imgOriginal = doc.getRoot().imgUrl;
    if (!imgOriginal) {
      alert.open({
        message:
          "The document does not seem to have an image! Would you like to upload an image?",
        buttons: [
          {
            label: "Upload Image",
            onClick: () => {},
            style: { backgroundColor: ThemeColor },
          },
          {
            label: "No, I'm fine",
            onClick: () => {
              alert.close();
            },
          },
        ],
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
      <Toolbars />
      <S.BoardContainer ref={divRef}>
        <DrawingBoard />
      </S.BoardContainer>
      {/* )} */}
    </S.Container>
  );
};

export default Editor;
