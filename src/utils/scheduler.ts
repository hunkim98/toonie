import { Point } from "../types/canvasTypes";

export type Task = Point;

const INTERVAL_TIME = 50;
let tasks: Array<Task> = [];
let timeout: ReturnType<typeof setTimeout>;
let work: Function | undefined;

const doWork = () => {
  if (typeof work === "function") {
    //work is a function that takes in an array
    work(tasks);
    tasks = [];
  }
};

function requestTask(isDone: Boolean) {
  if (isDone) {
    doWork();
    return;
  }

  //after some time after call from requestTask, doWork will be automatically calle
  timeout = setTimeout(() => {
    doWork();
    requestTask(false);
  }, INTERVAL_TIME);
}

export function reserveTask(task: Task, _work: Function) {
  tasks.push(task);

  if (work === undefined) {
    work = _work;
    requestTask(false);
  }
}

export function flushTask() {
  clearTimeout(timeout);

  //when flushTask is called, all the reserved tasks will be committed in do Work
  if (typeof work === "function") {
    requestTask(true);
  }
  work = undefined;
}
