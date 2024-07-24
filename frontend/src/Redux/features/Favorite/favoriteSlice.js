import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToFavorite: (state, action) => {
      const { payload } = action;
      if (!state.some((product) => product._id === payload._id)) {
        state.push(payload);
      }
    },

    removeFromProduct: (state, action) => {
      const { payload } = action;
      return state.filter((product) => product._id !== payload._id);
    },

    setFavorites: (state, action) => {
      // Directly setting state from payload
      return action.payload;
    },
  },
});

export const { addToFavorite, removeFromProduct, setFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
