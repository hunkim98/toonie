import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import usePeer from "../../hooks/usePeer";
import { RootState } from "../../store/slices";
import Navbar from "./Navbar";

export default () => {
  const { activePeers } = usePeer();
  const peers = useSelector((state: RootState) => state.peerState.peers);
  const client = useSelector((state: RootState) => state.docState.client);
  const doc = useSelector((root: RootState) => root.docState.doc);
  const user = useMemo(() => activePeers.find((peer) => peer.isMine), [peers]);
  const others = useMemo(
    () => activePeers.filter((peer) => !peer.isMine),
    [peers]
  );
  useEffect(() => {
    if (!client || !doc) {
      return () => {};
    }
    const unsubscribe = client.subscribe((event) => {
      if (event.type === "peers-changed") {
        const documentKey = doc.getKey();
        const changedPeers = event.value[documentKey];

        for (const peerKey of Object.keys(changedPeers)) {
          console.log(peerKey);
          //   boardRef.current?.updateMetadata(peerKey, changedPeers[peerKey]);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [doc]);
  return <Navbar activePeers={user ? [user, ...others] : others} user={user} />;
};
