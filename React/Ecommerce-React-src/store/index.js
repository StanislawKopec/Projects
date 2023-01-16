import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import productsSlice from "./products-slice";
import { apiSlice } from "../api/apiSlice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
