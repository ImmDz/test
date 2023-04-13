import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stringify } from "querystring";
import { api } from "src/api/api";
import type { GoodInCart } from "src/types/general";
import { LOAD_STATUSES } from "src/types/loadStatuses";

export interface State {
  loadStatus: LOAD_STATUSES;
  cartGoods: GoodInCart[];
}

const initialState: State = {
  loadStatus: LOAD_STATUSES.UNKNOWN,
  cartGoods: [],
};

const SLICE_NAME = "cart";

const serverRequest = createAsyncThunk(SLICE_NAME, api.getCart);

const { reducer, actions: cartActions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCart: (state) => {
      state.cartGoods.length = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(serverRequest.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING;
    });
    builder.addCase(serverRequest.rejected, (state) => {
      state.loadStatus = LOAD_STATUSES.ERROR;
    });
    builder.addCase(serverRequest.fulfilled, (state, action) => {
      state.loadStatus = LOAD_STATUSES.LOADED;
      state.cartGoods = action.payload;
    });
  },
});

export { reducer, cartActions };
export const actions = { ...cartActions, serverRequest };
