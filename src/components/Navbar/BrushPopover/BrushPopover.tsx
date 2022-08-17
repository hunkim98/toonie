import { useEffect, useState } from "react";
import * as S from "./styles";
import { ChromePicker, ColorChangeHandler, ColorResult } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/slices";
import { Peer } from "../../../store/slices/peerSlices";
import {
  setStrokeWidth,
  StrokeWidthType,
} from "../../../store/slices/boardSlices";

interface Props {
  user: Peer | undefined;
}

const BrushPopover = ({ user }: Props) => {
  const dispatch = useDispatch();
  const [brushColor, setBrushColor] = useState(user!.metadata.color);
  const client = useSelector((state: RootState) => state.docState.client);
  const doc = useSelector((state: RootState) => state.docState.doc);
  const strokeWidth = useSelector(
    (state: RootState) => state.boardState.strokeWidth
  );
  const onChangeColor: ColorChangeHandler = (color: ColorResult) => {
    setBrushColor(color.hex);
  };
  useEffect(() => {
    const handleUpdateColor = (color: string) => {
      client?.updatePresence("color", color);
    };
    handleUpdateColor(brushColor);
  }, [doc, brushColor, client]);

  const sizes = StrokeWidthType;

  const onChangeStrokeSize = (size: number) => {
    dispatch(setStrokeWidth(size));
  };

  if (!user || !client || !doc) {
    return null;
  }
  return (
    <S.Container>
      <S.Arrow />
      <ChromePicker
        // color={user.metadata.color}
        color={brushColor}
        onChangeComplete={onChangeColor}
        disableAlpha={true}
        styles={{
          default: {
            saturation: { borderRadius: 5 },
            body: { boxShadow: "none" },
            picker: { boxShadow: "none" },
          },
        }}
      />
      <S.SizesPicker>
        {sizes.map((size) => {
          return (
            <S.SizeContainer
              key={size}
              isSelected={size === strokeWidth}
              onClick={() => {
                onChangeStrokeSize(size);
              }}
            >
              <S.Size
                size={size}
                key={size}
                isSelected={size === strokeWidth}
              ></S.Size>
            </S.SizeContainer>
          );
        })}
      </S.SizesPicker>
    </S.Container>
  );
};

export default BrushPopover;
