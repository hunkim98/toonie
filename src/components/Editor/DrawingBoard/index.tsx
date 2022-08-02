import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/slices";
import Canvas from "./Canvas/Canvas";

export default ({ width, height }: { width: number; height: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<Canvas | null>(null);

  const dispatch = useDispatch();
  const client = useSelector((state: RootState) => state.docState.client);
  const doc = useSelector((state: RootState) => state.docState.doc);
  const tool = useSelector((state: RootState) => state.boardState.toolType);

  useEffect(() => {
    if (!canvasRef.current) {
      return () => {};
    }
    const board = new Canvas(canvasRef.current);
    boardRef.current = board;
    return () => {
      //   board.destroy();
    };
  }, [doc]);
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    boardRef.current?.setWidth(width);
    boardRef.current?.setHeight(height);
    console.log(width, height);
    // boardRef.current?.drawAll(doc!.getRoot().shapes);
  }, [doc, width, height]);

  return <canvas ref={canvasRef} />;
};
