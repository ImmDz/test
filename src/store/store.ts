import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as goodsReducer } from "./Goods/slice";
import { reducer as categoriesReducer } from "./Categories/slice";
import { reducer as popularReducer } from "./PopularCategories/slice";
import { reducer as cartReducer } from "./Cart/slice";
import { reducer as userReducer } from "./User/slice";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  goods: goodsReducer,
  popularCategories: popularReducer,
  cart: cartReducer,
  user: userReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
