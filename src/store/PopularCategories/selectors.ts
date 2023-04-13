import type { RootStore } from "src/store/store";
import type { State } from "./slice";

export const getPopularCategories = (store: RootStore): State["popularItems"] =>
  store.popularCategories.popularItems;

export const getPopularLoadStatus = (store: RootStore): State["loadStatus"] =>
  store.popularCategories.loadStatus;
