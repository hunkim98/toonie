import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/slices";
import {
  activateClient,
  attachDocLoading,
  createDocument,
  deactivateClient,
  detachDocument,
  DocStatus,
  setStatus,
  attachDoc,
} from "../../store/slices/docSlices";
import { syncPeer } from "../../store/slices/peerSlices";
import { EditorContextProvider } from "./Context";
import Editor from "./Editor";

const EditorComponent = ({ docKey }: { docKey: string }) => {
  const dispatch = useDispatch();
  const client = useSelector((state: RootState) => state.docState.client);
  const doc = useSelector((state: RootState) => state.docState.doc);
  const status = useSelector((state: RootState) => state.docState.status);
  //   const tool = useSelector((state: RootState) => state.boardState.toolType);
  const loading = useSelector((state: RootState) => state.docState.loading);
  const errorMessage = useSelector(
    (state: RootState) => state.docState.errorMessage
  );
  useEffect(() => {
    dispatch(activateClient());
    return () => {
      dispatch(deactivateClient());
    };
  }, [dispatch, docKey]);

  useEffect(() => {
    if (!client || !doc) {
      return () => {};
    }
    const unsubscribe = client.subscribe((event) => {
      if (event.type === "peers-changed") {
        const documentKey = doc.getKey();
        const changedPeers = event.value[documentKey];
        dispatch(syncPeer({ myClientID: client.getID()!, changedPeers }));
      }
      if (
        status === DocStatus.Connect &&
        ((event.type === "status-changed" && event.value === "deactivated") ||
          (event.type === "stream-connection-status-changed" &&
            event.value === "disconnected") ||
          (event.type === "document-synced" && event.value === "sync-failed"))
      ) {
        dispatch(setStatus(DocStatus.Disconnect));
      } else if (
        status === DocStatus.Disconnect &&
        (event.type === "peers-changed" ||
          event.type === "documents-changed" ||
          (event.type === "status-changed" && event.value === "activated") ||
          (event.type === "stream-connection-status-changed" &&
            event.value === "connected") ||
          (event.type === "document-synced" && event.value === "synced"))
      ) {
        dispatch(setStatus(DocStatus.Connect));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [client, doc, status, dispatch, docKey]);

  useEffect(() => {
    dispatch(createDocument(docKey));
    return () => {
      dispatch(detachDocument());
    };
  }, [docKey, dispatch]);

  useEffect(() => {
    async function attachDocAsync() {
      if (!client || !doc) {
        return;
      }

      dispatch(attachDocLoading(true));
      await dispatch(attachDoc({ client, doc }));
      dispatch(attachDocLoading(false));
    }

    attachDocAsync();
    return () => {
      dispatch(attachDocLoading(true));
    };
  }, [docKey, client, doc, dispatch]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  if (loading || !client || !doc) {
    return <div>loading</div>;
  }
  return (
    <EditorContextProvider>
      <Editor />
    </EditorContextProvider>
  );
};

export default EditorComponent;
