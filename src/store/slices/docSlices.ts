import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import yorkie, { Client, Document, Text, TimeTicket } from "yorkie-js-sdk";
import { Metadata } from "./peerSlices";
import randomColor from "randomcolor";
import anonymous from "anonymous-animals-gen";

export type Point = {
  y: number;
  x: number;
};

export interface Root {
  shapes: Shapes & Array<Shape>;
}

export interface BaseShape {
  type: string;
  getID(): TimeTicket;
}
export interface Line extends BaseShape {
  type: "line";
  color: string;
  points: Array<Point>;
}

export interface Box {
  y: number;
  x: number;
  width: number;
  height: number;
}

export interface Line extends BaseShape {
  type: "line";
  color: string;
  points: Array<Point>;
}

export interface Rect extends BaseShape {
  type: "rect";
  color: string;
  points: Array<Point>;
  box: Box;
}

export interface EraserLine extends BaseShape {
  type: "eraser";
  points: Array<Point>;
}

export type Shape = Line | EraserLine | Rect;

export type ShapeType = Shape["type"];

export type ToonieDoc = {
  profiles: Record<string, string>;
  shapes: Array<Shape>;
  imgUrl: string;
};

export interface Shapes {
  push(shape: Shape): number;
  getLast(): Shape;
  getElementByID(createdAt: TimeTicket): Shape;
  deleteByID(createdAt: TimeTicket): Shape;
  length: number;
  [index: number]: Shape;
  [Symbol.iterator](): IterableIterator<Shape>;
}

// export interface Root {
//   shapes: Shapes & Array<Shape>;
// }

export enum DocStatus {
  Disconnect = "disconnect",
  Connect = "connect",
}

export interface DocState {
  client?: Client<Metadata>;
  doc?: Document<ToonieDoc>;
  loading: boolean;
  errorMessage: string;
  status: DocStatus;
}

export const activateClient = createAsyncThunk<
  ActivateClientResult,
  undefined,
  { rejectValue: string }
>("doc/activate", async (_: undefined, thunkApi) => {
  try {
    const { name, animal } = anonymous.generate();
    const options = {
      apiKey: "",
      presence: {
        username: name,
        color: randomColor(),
        board: "",
      },
    };

    if (`${process.env.REACT_APP_YORKIE_API_KEY}`) {
      options.apiKey = `${process.env.REACT_APP_YORKIE_API_KEY}`;
    }

    const client = new yorkie.Client(
      `${process.env.REACT_APP_YORKIE_RPC_ADDR}`,
      options
    );

    await client.activate();
    return { client };
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export const attachDoc = createAsyncThunk<
  AttachDocResult,
  AttachDocArgs,
  { rejectValue: string }
>("doc/attach", async ({ client, doc }, thunkApi) => {
  try {
    await client.attach(doc);

    doc.update((root) => {
      const userId = client.getID()!;
      if (!root.profiles) {
        root.profiles = {};
        root.profiles[userId] = randomColor();
      }
      // codeEditor
      //   if (!root.content) {
      //     root.content = new yorkie.Text();
      //   }
      // board
      if (!root.shapes) {
        root.shapes = [];
      }
    });
    await client.sync();
    return { doc, client };
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const initialState: DocState = {
  loading: true,
  errorMessage: "",
  status: DocStatus.Connect,
};

const docSlice = createSlice({
  name: "doc",
  initialState,
  reducers: {
    deactivateClient(state) {
      const { client } = state;
      state.client = undefined;
      client?.deactivate();
    },
    createDocument(state, action: PayloadAction<string>) {
      state.doc = new yorkie.Document<ToonieDoc>(`toonies$${action.payload}`);
    },
    detachDocument(state) {
      const { doc, client } = state;
      state.doc = undefined;
      client?.detach(doc as Document<ToonieDoc>);
    },
    attachDocLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setStatus(state, action: PayloadAction<DocStatus>) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(activateClient.fulfilled, (state, { payload }) => {
      state.client = payload.client;
    });
    builder.addCase(activateClient.rejected, (state, { payload }) => {
      state.errorMessage = payload!;
    });
    builder.addCase(attachDoc.fulfilled, (state, { payload }) => {
      state.doc = payload.doc;
      state.client = payload.client;
    });
    builder.addCase(attachDoc.rejected, (state, { payload }) => {
      state.errorMessage = payload!;
    });
  },
});

export const {
  deactivateClient,
  createDocument,
  detachDocument,
  attachDocLoading,
  setStatus,
} = docSlice.actions;
export default docSlice.reducer;

type ActivateClientResult = { client: Client<Metadata> };
type AttachDocArgs = { doc: Document<ToonieDoc>; client: Client<Metadata> };
type AttachDocResult = { doc: Document<ToonieDoc>; client: Client<Metadata> };
