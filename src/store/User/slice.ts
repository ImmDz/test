import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/api/api";
import { LOAD_STATUSES } from "src/types/loadStatuses";

export interface State {
  login: string;
  token: string;
  isAuth: boolean;
  loadStatus: LOAD_STATUSES;
}

const initialState: State = {
  isAuth: localStorage.getItem("token") ? true : false,
  login: localStorage.getItem("login") ?? "",
  token: "",
  loadStatus: LOAD_STATUSES.UNKNOWN,
};

const SLICE_NAME = "user";

const login = createAsyncThunk(`${SLICE_NAME}/login`, api.login);
const registration = createAsyncThunk(
  `${SLICE_NAME}/registration`,
  api.registration
);

const { reducer, actions: userActions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    resetLogin: (state) => {
      state.login = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING;
    });
    builder.addCase(login.rejected, (state) => {
      state.loadStatus = LOAD_STATUSES.ERROR;
      state.isAuth = false;
      console.log(state.loadStatus);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loadStatus = LOAD_STATUSES.LOADED;
      state.login = action.payload.login;
      state.isAuth = true;
      localStorage.setItem("login", state.login);
    });

    builder.addCase(registration.fulfilled, (state, action) => {
      state.isAuth = true;
      localStorage.setItem("login", action.payload.user.login);
    });
  },
});

export { reducer };
export const actions = { ...userActions, login, registration };
