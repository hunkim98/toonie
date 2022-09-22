import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/slices";
import {
  setIsDownloadClicked,
  setPanZoom,
} from "../../../store/slices/boardSlices";
import { Metadata } from "../../../store/slices/peerSlices";
import { PanZoom } from "../../../types/canvasTypes";
import { EditorContext } from "../Context";
import Board from "./Canvas/Board";
import { BoardMetadata } from "./Canvas/Worker/Worker";

const DrawingBoard = () => {
  const { width, height } = useContext(EditorContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<Board | null>(null);
  const color = useSelector((state: RootState) => state.boardState.color);

  const dispatch = useDispatch();
  const client = useSelector((state: RootState) => state.docState.client);
  const doc = useSelector((state: RootState) => state.docState.doc);
  const tool = useSelector((state: RootState) => state.boardState.toolType);
  const panZoom = useSelector((state: RootState) => state.boardState.panZoom);
  const strokeWidth = useSelector(
    (state: RootState) => state.boardState.strokeWidth
  );
  const isDownloadClicked = useSelector(
    (state: RootState) => state.boardState.isDownloadClicked
  );

  useEffect(() => {
    if (isDownloadClicked) {
      dispatch(setIsDownloadClicked(false));
      boardRef.current?.downloadImage();
    }
  }, [isDownloadClicked, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) {
      return () => {};
    }

    const board = new Board(
      canvasRef.current,
      doc!.update.bind(doc),
      client!.updatePresence.bind(client),
      doc!.getRoot.bind(doc)
    );
    boardRef.current = board;

    return () => {
      board.destroy();
    };
  }, [doc, client]);

  useEffect(() => {
    if (!doc) {
      return () => {};
    }
    const unsubscribe = doc.subscribe((event) => {
      if (event.type === "remote-change") {
        for (const changeInfo of event.value) {
          for (const path of changeInfo.paths) {
            if (path.startsWith(`$.images`)) {
              boardRef.current?.setImages(doc.getRoot().images);
            }
          }
        }
        boardRef.current?.drawAll(doc.getRoot().shapes);
        // const imgUrl = doc.getRoot().imgUrl;
        // syncDocImage(imgUrl);
      } else if (event.type === "local-change") {
        for (const changeInfo of event.value) {
          for (const path of changeInfo.paths) {
            if (path.startsWith(`$.images`)) {
              boardRef.current?.setImages(doc.getRoot().images);
            }
          }
        }
        boardRef.current?.drawAll(doc.getRoot().shapes);
        // const imgUrl = doc.getRoot().imgUrl;
        // syncDocImage(imgUrl);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [doc]);

  useEffect(() => {
    if (!client || !doc) {
      return () => {};
    }
    //this is for tracking remote change (presence-change)

    // const docImgUrl = doc!.getRoot().imgUrl;
    // syncDocImage(docImgUrl);

    const unsubscribe = client.subscribe((event) => {
      if (event.type === "peers-changed") {
        const documentKey = doc.getKey();
        const changedPeers = event.value[documentKey];

        for (const peerKey of Object.keys(changedPeers)) {
          boardRef.current?.updateMetadata(peerKey, changedPeers[peerKey]);
          if (client.getID() === peerKey) {
            boardRef.current?.setColor(changedPeers[peerKey].color);
          }
        }
      }
    });

    const clientId = client.getID()!;
    const handleUpdateMeta = (data: BoardMetadata) => {
      //for zooming and panning we don't update
      const board = JSON.stringify(data || "");
      boardRef.current?.updateMetadata(clientId, {
        board,
      } as Metadata);
      client?.updatePresence("board", board);
    };

    boardRef.current?.setPanZoomStoreHandler((canvasPanZoom: PanZoom) => {
      dispatch(setPanZoom(canvasPanZoom));
    });

    boardRef.current?.addEventListener("mousemove", handleUpdateMeta);
    boardRef.current?.addEventListener("mousedown", handleUpdateMeta);
    boardRef.current?.addEventListener("mouseout", handleUpdateMeta);
    boardRef.current?.addEventListener("mouseup", handleUpdateMeta);

    return () => {
      unsubscribe();
      boardRef.current?.removeEventListener("mousemove", handleUpdateMeta);
      boardRef.current?.removeEventListener("mousedown", handleUpdateMeta);
      boardRef.current?.removeEventListener("mouseout", handleUpdateMeta);
      boardRef.current?.removeEventListener("mouseup", handleUpdateMeta);
    };
  }, [doc, client, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    boardRef.current?.setWidth(width);
    boardRef.current?.setHeight(height);
    //this has to do with drawing what is in doc
    boardRef.current?.setImages(doc!.getRoot().images);
    boardRef.current?.drawAll(doc!.getRoot().shapes);
  }, [doc, width, height, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    boardRef.current?.updateWrapperPanZoom(panZoom.scale, panZoom.offset);
  }, [doc, panZoom]);

  useEffect(() => {
    boardRef.current?.setStrokeWith(strokeWidth);
  }, [doc, strokeWidth]);

  useEffect(() => {
    boardRef.current?.setTool(tool);
  }, [doc, tool]);

  useEffect(() => {
    boardRef.current?.setColor(color);
  }, [doc, color]);

  return (
    <canvas
      style={{
        position: "absolute",
        zIndex: 0,
        touchAction: "none",
        userSelect: "none",
        msUserSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
      }}
      ref={canvasRef}
    />
  );
};

export default DrawingBoard;
