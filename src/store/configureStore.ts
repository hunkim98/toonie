import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import rootReducer from "./slices";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutablCheck: {
        ignoredPaths: ["docState.client", "docState.doc"],
      },
      serializableCheck: {
        ignoredActions: ["doc/attach/fulfilled", "doc/activate/fulfilled"],
        ignoredPaths: ["docState.client", "docState.doc"],
      },
    }),
  // .concat(logger),
});
