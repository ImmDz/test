import type { Good } from "src/types/general";
import { LOAD_STATUSES } from "src/types/loadStatuses";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/api/api";

export interface State {
  loadStatus: LOAD_STATUSES;
  goods: Good[];
  total: number;
}

const initialState: State = {
  loadStatus: LOAD_STATUSES.UNKNOWN,
  goods: [],
  total: 0,
};

const SLICE_NAME = "goods";
const serverRequest = createAsyncThunk(SLICE_NAME, api.getGoods);

const { reducer, actions: goodsActions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(serverRequest.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING;
    });
    builder.addCase(serverRequest.rejected, (state) => {
      state.loadStatus = LOAD_STATUSES.ERROR;
    });
    builder.addCase(serverRequest.fulfilled, (state, action) => {
      state.loadStatus = LOAD_STATUSES.LOADED;
      state.goods = action.payload.items;
      state.total = action.payload.total;
    });
  },
});

export { reducer };
export const actions = { ...goodsActions, serverRequest };
