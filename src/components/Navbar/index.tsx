import { stringify } from "querystring";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import usePeer from "../../hooks/usePeer";
import { RootState } from "../../store/slices";
import { ConnectionStatus, Peer } from "../../store/slices/peerSlices";
import Navbar from "./Navbar";

export default () => {
  const [peers, setPeers] = useState<Peer[]>([]);
  // const peers = useSelector((state: RootState) => state.peerState.peers);
  const client = useSelector((state: RootState) => state.docState.client);
  const doc = useSelector((root: RootState) => root.docState.doc);
  const user = useMemo(() => peers.find((peer) => peer.isMine), [peers]);
  const others = useMemo(() => peers.filter((peer) => !peer.isMine), [peers]);
  useEffect(() => {
    if (!client || !doc) {
      return () => {};
    }
    const unsubscribe = client.subscribe((event) => {
      if (event.type === "peers-changed") {
        const documentKey = doc.getKey();
        const changedPeers = event.value[documentKey];
        const tempPeers = [];
        for (const [clientID, metadata] of Object.entries(changedPeers)) {
          const tempPeer = {
            id: clientID,
            status: ConnectionStatus.Connected,
            metadata,
            isMine: client.getID() === clientID,
          };
          tempPeers.push(tempPeer);
        }
        setPeers(tempPeers);
        console.log(tempPeers);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [doc, client]);

  if (!user) {
    return null;
  }

  return <Navbar activePeers={[user, ...others]} user={user} />;
};
