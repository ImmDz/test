import { LOAD_STATUSES } from "src/types/loadStatuses";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Category } from "src/types/general";
import { api } from "src/api/api";

export interface State {
  loadStatus: LOAD_STATUSES;
  categories: Category[];
}

const initialState: State = {
  loadStatus: LOAD_STATUSES.UNKNOWN,
  categories: [],
};

const SLICE_NAME = "categories";
const serverRequest = createAsyncThunk(SLICE_NAME, api.getCategories);

const { reducer, actions: categoryActions } = createSlice({
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
      state.categories = action.payload.categories;
    });
  },
});

export { reducer };
export const actions = { ...categoryActions, serverRequest };
