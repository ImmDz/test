import type { RootStore } from "src/store/store";
import type { State } from "./slice";

export const getGoods = (store: RootStore): State["goods"] => store.goods.goods;
export const getTotal = (store: RootStore): State["total"] => store.goods.total;
export const getGoodsLoadStatus = (store: RootStore): State["loadStatus"] =>
  store.goods.loadStatus;
