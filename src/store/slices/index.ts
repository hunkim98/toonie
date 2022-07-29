import { combineReducers } from "@reduxjs/toolkit";
import docReducer from "./docSlices";
import peerReducer from "./peerSlices";

const rootReducer = combineReducers({
  docState: docReducer,
  peerState: peerReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
