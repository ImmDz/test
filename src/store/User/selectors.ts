import type { RootStore } from "src/store/store";
import type { State } from "./slice";

export const getIsAuthValue = (store: RootStore): State["isAuth"] =>
  store.user.isAuth;
export const getUserLogin = (store: RootStore): State["login"] =>
  store.user.login;
export const getUserLoadStatus = (store: RootStore): State["loadStatus"] =>
  store.user.loadStatus;
