import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/slices";
import {
  BoardState,
  setImgUrl,
  setPanZoom,
  setTool,
  ToolType,
} from "../../../store/slices/boardSlices";
import { Metadata } from "../../../store/slices/peerSlices";
import { PanZoom } from "../../../types/canvasTypes";
import { urlToObject } from "../../../utils/images";
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
  const panZoom = useSelector((state: RootState) => state.boardState.panZoom);
  const strokeWidth = useSelector(
    (state: RootState) => state.boardState.strokeWidth
  );
  const isToolActivated = useSelector(
    (state: RootState) => state.boardState.isToolActivated
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return () => {};
    }

    const board = new Board(
      canvasRef.current,
      doc!.update.bind(doc),
      client!.updatePresence.bind(client)
    );
    boardRef.current = board;

    return () => {
      board.destroy();
    };
  }, [doc]);

  useEffect(() => {
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
    //this is for tracking remote change (presence-change)
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
      // console.log("board", board);
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
  }, [doc]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    boardRef.current?.setWidth(width);
    boardRef.current?.setHeight(height);
    //this has to do with drawing what is in doc

    const docImgUrl = doc!.getRoot().imgUrl;
    console.log(docImgUrl, "docimgurl");
    if (docImgUrl) {
      boardRef.current?.initializeImg(docImgUrl);
      dispatch(setImgUrl(docImgUrl));
    } else {
      if (docImgUrl === undefined) {
        dispatch(setImgUrl(undefined));
        console.log("undefined set");
      } else {
        dispatch(setImgUrl(""));
      }
    }
    boardRef.current?.drawAll(doc!.getRoot().shapes);
  }, [doc, width, height]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    boardRef.current?.updateWrapperPanZoom(panZoom.scale, panZoom.offset);
    boardRef.current?.drawAll(doc!.getRoot().shapes);
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

  useEffect(() => {
    if (isToolActivated) {
      boardRef.current?.activateTools();
    } else {
      boardRef.current?.deactivateTools();
    }
  }, [doc, isToolActivated]);

  return <canvas style={{ position: "absolute", zIndex: 0 }} ref={canvasRef} />;
};
