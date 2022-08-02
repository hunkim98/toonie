import EventDispatcher from "../../../../utils/eventDispatcher";

enum DragStatus {
  Drag = "Drag",
  Stop = "Stop",
}

export default class Board extends EventDispatcher {
  private offSetY: number = 0;
  private offSetX: number = 0;
}
