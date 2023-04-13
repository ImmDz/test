import type { RootStore } from "src/store/store";
import type { State } from "./slice";

export const getCategories = (store: RootStore): State["categories"] =>
  store.categories.categories;

export const getCategoriesLoadStatus = (
  store: RootStore
): State["loadStatus"] => store.categories.loadStatus;
