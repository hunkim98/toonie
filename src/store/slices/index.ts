import { combineReducers } from "@reduxjs/toolkit";
import docReducer from "./docSlices";
import peerReducer from "./peerSlices";
import boardReducer from "./boardSlices";

const rootReducer = combineReducers({
  docState: docReducer,
  peerState: peerReducer,
  boardState: boardReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
