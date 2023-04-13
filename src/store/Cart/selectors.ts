import type { RootStore } from "src/store/store";
import type { State } from "./slice";

export const getCartGoods = (store: RootStore): State["cartGoods"] =>
  store.cart.cartGoods;

export const getCartLoadStatus = (store: RootStore): State["loadStatus"] =>
  store.cart.loadStatus;
