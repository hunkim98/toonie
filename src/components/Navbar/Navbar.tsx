import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/slices";
import {
  closeBrushPopup,
  openBrushPopup,
} from "../../store/slices/boardSlices";
import { Peer } from "../../store/slices/peerSlices";
import { PopoverContainer } from "../Common/PopoverContainer";
import { BrushPopover } from "./BrushPopover";
import * as S from "./styles";
interface Props {
  activePeers: Peer[];
  user: Peer;
}

const Navbar = ({ activePeers, user }: Props) => {
  const dispatch = useDispatch();
  const isBrushPopupOpen = useSelector(
    (state: RootState) => state.boardState.isBrushPopupOpen
  );
  const navigateTo = useNavigate();
  return (
    <S.Container>
      <S.LogoContainer>
        <S.LogoName
          onClick={() => {
            navigateTo("/");
            window.location.reload();
          }}
        >
          {/* <Link to="/" style={{ textDecoration: "none", color: "#000000" }}> */}
          toonie
          {/* </Link> */}
        </S.LogoName>
      </S.LogoContainer>
      <S.UserColor
        color={user.metadata.color}
        onClick={() => {
          dispatch(openBrushPopup());
        }}
      >
        brush
        <PopoverContainer
          isVisible={isBrushPopupOpen}
          makeInvisible={() => dispatch(closeBrushPopup())}
          makeVisible={() => {
            dispatch(openBrushPopup());
          }}
          extendDirection="BOTTOM"
        >
          <BrushPopover user={user} />
        </PopoverContainer>
      </S.UserColor>
      <S.PeersControlContainer>
        {/* <S.ShareButton
          onClick={() => {
            const dummy = document.createElement("input"),
              text = window.location.href;
            document.body.appendChild(dummy);
            dummy.value = text;
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
            alert(
              "The share link has been copied. Please deliver it to your peer!"
            );
          }}
        ></S.ShareButton> */}
        <S.PeersContainer>
          {activePeers
            .filter((element, index) => index < 3)
            .map((peer, index) => {
              return (
                <S.PeerStatus
                  key={peer.id}
                  index={index}
                  color={peer.metadata.color}
                  peerCount={activePeers.length}
                >
                  {peer.metadata.username[0]}
                </S.PeerStatus>
              );
            })}
          {activePeers.length > 3 && (
            <S.PeerStatus
              index={4}
              color={"#ffffff"}
              peerCount={activePeers.length}
              style={{ color: "black", boxShadow: `0 0 0 2px #000 inset` }}
            >
              {"..."}
            </S.PeerStatus>
          )}
        </S.PeersContainer>
      </S.PeersControlContainer>
    </S.Container>
  );
};

export default Navbar;
