import React, { useEffect, useMemo } from "react";
import * as S from "./styles";
import { ChromePicker, ColorChangeHandler, ColorResult } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/slices";
import { Peer, syncPeer } from "../../../store/slices/peerSlices";

interface Props {
  user: Peer | undefined;
}

const BrushPopover = ({ user }: Props) => {
  const dispatch = useDispatch();
  const client = useSelector((state: RootState) => state.docState.client);
  const doc = useSelector((state: RootState) => state.docState.doc);
  const peers = useSelector((state: RootState) => state.peerState.peers);
  const onChangeColor: ColorChangeHandler = (color: ColorResult) => {
    if (client && doc) {
      client.updatePresence("color", color.hex);
      client.subscribe((event) => {
        if (event.type === "peers-changed") {
          console.log("hello???");
          const documentKey = doc.getKey();
          const changedPeers = event.value[documentKey];
          dispatch(syncPeer({ myClientID: client.getID()!, changedPeers }));
        }
      });
    }
  };
  //   useEffect(() => {
  //     if (doc) {
  //       client?.subscribe((event) => {
  //         if (event.type === "peers-changed") {
  //           const documentKey = doc.getKey();
  //           const changedPeers = event.value[documentKey];
  //           dispatch(
  //             syncPeer({
  //               myClientID: client.getID()!,
  //               changedPeers: event.value[documentKey],
  //             })
  //           );
  //           console.log("peers changed", event.value);
  //         }
  //       });
  //     }
  //   }, [peers, client]);
  const sizes = useMemo(() => {
    return [1, 3, 5, 8];
  }, []);

  if (!user) {
    return null;
  }
  return (
    <S.Container>
      <S.Arrow />
      <ChromePicker
        color={user.metadata.color}
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
      <S.SizesContainer>
        {sizes.map((size) => {
          return <div key={size}>{size}</div>;
        })}
      </S.SizesContainer>
    </S.Container>
  );
};

export default BrushPopover;
