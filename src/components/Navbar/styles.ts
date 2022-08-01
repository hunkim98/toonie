import styled from "styled-components";
import { CaveatFont, CommonPadding, ThemeColor } from "../../styles/common";
import { device } from "../../utils/cssMedia";

export const Container = styled(CommonPadding)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SideWidthLaptop = 300;
const SideWidthMobile = 100;
const SideContainer = styled.div`
  width: ${SideWidthMobile}px;
  @media ${device.laptop} {
    width: ${SideWidthLaptop}px;
  }
`;
export const LogoContainer = styled(SideContainer)``;

export const LogoName = styled(CaveatFont)`
  font-size: 2.5em;
  font-weight: bold;
`;

export const UserColor = styled.div<{ color: string }>`
  width: 100px;
  height: 40px;
  background-color: ${({ color }) => {
    return color;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  border-radius: 10px;
  position: relative;
  @media ${device.mobileL} {
    width: 150px;
  }
  @media ${device.laptop} {
    width: 200px;
  }
`;
export const PeersControlContainer = styled(SideContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ShareButton = styled.button`
  ::before {
    content: "🖂";
  }
  @media ${device.laptop} {
    ::before {
      content: "share";
    }
    border-radius: 30px;
  }

  background: none;
  background-color: ${ThemeColor};
  border: none;
  width: 40%;
  height: 35px;
  font-weight: bold;
  font-size: 1em;
  border-radius: 10px;
`;

const PeersContainerLaptopWidth = 100;
const PeersContainerMobileWidth = 50;

export const PeersContainer = styled.div`
  position: relative;
  width: ${PeersContainerMobileWidth}px;
  z-index: 2;
  display: flex;
  height: 100%;
  justify-content: flex-end;
  @media ${device.laptop} {
    width: ${PeersContainerLaptopWidth}px;
  }
`;

const PeerStatusDiameter = 40;
export const PeerStatus = styled.div<{
  color: string;
  peerCount: number;
  index: number;
}>`
  color: black;
  width: ${PeerStatusDiameter}px;
  height: ${PeerStatusDiameter}px;
  border-radius: 50%;
  display: flex;
  margin-left: ${({ index, peerCount }) => {
    const consideredPeerCount = peerCount > 3 ? 4 : peerCount;
    let totalSkewAmount = 0;
    if (consideredPeerCount * PeerStatusDiameter > PeersContainerMobileWidth) {
      totalSkewAmount =
        consideredPeerCount * PeerStatusDiameter - PeersContainerMobileWidth;
    }
    const skewAmount = totalSkewAmount / (consideredPeerCount - 1);
    return index !== 0 && `-${skewAmount}px`;
  }};
  @media ${device.laptop} {
    margin-left: ${({ index, peerCount }) => {
      const consideredPeerCount = peerCount > 3 ? 4 : peerCount;
      let totalSkewAmount = 0;
      if (
        consideredPeerCount * PeerStatusDiameter >
        PeersContainerLaptopWidth
      ) {
        totalSkewAmount =
          consideredPeerCount * PeerStatusDiameter - PeersContainerLaptopWidth;
      }
      const skewAmount = totalSkewAmount / (consideredPeerCount - 1);
      return index !== 0 && `-${skewAmount}px`;
    }};
  }

  z-index: ${({ index }) => {
    return -index;
  }};
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => {
    return color;
  }};
`;
