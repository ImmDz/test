import { LOAD_STATUSES } from "src/types/loadStatuses";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PopularCategories } from "src/types/general";
import { api } from "src/api/api";

export interface State {
  loadStatus: LOAD_STATUSES;
  popularItems: PopularCategories[];
}

const initialState: State = {
  loadStatus: LOAD_STATUSES.UNKNOWN,
  popularItems: [],
};

const SLICE_NAME = "popular_categories";

const serverRequest = createAsyncThunk(SLICE_NAME, api.getPopularCategories);

const { reducer, actions: popularActions } = createSlice({
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
      state.popularItems = action.payload;
    });
  },
});

export { reducer };
export const actions = { ...popularActions, serverRequest };
