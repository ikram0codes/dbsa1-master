import { configureStore, } from "@reduxjs/toolkit";
import { apiSlice } from "./Api/ApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSliceReducer from "./features/authSlice";
import favoriteSliceReducer from "./features/Favorite/favoriteSlice";
import cartSliceReducer from "./features/cartSlice";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";

// Fetch initial favorites from localStorage
const initialFavorites = getFavoritesFromLocalStorage() || [];

// Configure Redux store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    favorites: favoriteSliceReducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  preloadedState: {
    favorites: initialFavorites,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Set up API listeners
setupListeners(store.dispatch);
