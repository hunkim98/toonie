/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/slices";
import { ConnectionStatus } from "../store/slices/peerSlices";

export default function usePeer() {
  const client = useSelector((state: RootState) => state.docState.client);
  const peers = useSelector((state: RootState) => state.peerState.peers);

  const activePeers = useMemo(() => {
    if (!client) {
      return [];
    }
    return Object.values(peers).filter(
      (peer) => peer.status === ConnectionStatus.Connected
    );
  }, [client, peers]);

  return { activePeers };
}
