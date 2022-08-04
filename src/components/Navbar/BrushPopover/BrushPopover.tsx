import React, { useEffect, useMemo, useState } from "react";
import * as S from "./styles";
import { ChromePicker, ColorChangeHandler, ColorResult } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/slices";
import { Peer } from "../../../store/slices/peerSlices";

interface Props {
  user: Peer | undefined;
}

const BrushPopover = ({ user }: Props) => {
  const dispatch = useDispatch();
  const [brushColor, setBrushColor] = useState("#ff0000");
  const client = useSelector((state: RootState) => state.docState.client);
  const doc = useSelector((state: RootState) => state.docState.doc);
  const onChangeColor: ColorChangeHandler = (color: ColorResult) => {
    setBrushColor(color.hex);
  };
  useEffect(() => {
    const handleUpdateColor = (color: string) => {
      client?.updatePresence("color", color);
    };
    handleUpdateColor(brushColor);
  }, [doc, brushColor]);

  const sizes = useMemo(() => {
    return [1, 3, 5, 8];
  }, []);

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
            <S.SizeContainer key={size}>
              <S.Size size={size} key={size}></S.Size>
            </S.SizeContainer>
          );
        })}
      </S.SizesPicker>
    </S.Container>
  );
};

export default BrushPopover;
