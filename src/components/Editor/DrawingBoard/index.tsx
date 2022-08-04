import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/slices";
import { setTool, ToolType } from "../../../store/slices/boardSlices";
import { Metadata } from "../../../store/slices/peerSlices";
import Board from "./Canvas/Board";
import { BoardMetadata } from "./Canvas/Worker/Worker";

export default ({ width, height }: { width: number; height: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<Board | null>(null);
  const color = useSelector((state: RootState) => state.boardState.color);

  const dispatch = useDispatch();
  const client = useSelector((state: RootState) => state.docState.client);
  const doc = useSelector((state: RootState) => state.docState.doc);
  const tool = useSelector((state: RootState) => state.boardState.toolType);
  const isToolActivated = useSelector(
    (state: RootState) => state.boardState.isToolActivated
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return () => {};
    }
    const board = new Board(canvasRef.current, doc!.update.bind(doc));
    boardRef.current = board;
    return () => {
      board.destroy();
    };
  }, [doc]);

  useEffect(() => {
    //this is for tracking remote change (doc-change)
    if (!doc) {
      return () => {};
    }
    const unsubscribe = doc.subscribe((event) => {
      if (event.type === "remote-change") {
        boardRef.current?.drawAll(doc.getRoot().shapes);
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

    const unsubscribe = client.subscribe((event) => {
      if (event.type === "peers-changed") {
        const documentKey = doc.getKey();
        const changedPeers = event.value[documentKey];

        for (const peerKey of Object.keys(changedPeers)) {
          boardRef.current?.updateMetadata(peerKey, changedPeers[peerKey]);
        }
      }
    });

    const clientId = client.getID()!;
    const handleUpdateMeta = (data: BoardMetadata) => {
      const board = JSON.stringify(data || "");
      boardRef.current?.updateMetadata(clientId, {
        board,
      } as Metadata);
      client?.updatePresence("board", board);
    };

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
  }, [doc]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    boardRef.current?.setWidth(width);
    boardRef.current?.setHeight(height);
    boardRef.current?.drawAll(doc!.getRoot().shapes);
  }, [doc, width, height]);

  useEffect(() => {
    boardRef.current?.setTool(tool);
  }, [doc, tool]);

  useEffect(() => {
    boardRef.current?.setColor(color);
  }, [doc, color]);

  useEffect(() => {
    if (isToolActivated) {
      boardRef.current?.activateTools();
    } else {
      boardRef.current?.deactivateTools();
    }
  }, [doc, isToolActivated]);

  return <canvas style={{ position: "absolute", zIndex: 0 }} ref={canvasRef} />;
};
