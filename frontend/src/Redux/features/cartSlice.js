import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../Utils/cart";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "paypal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, review, ...item } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (x) => x._id === item._id
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex] = item;
      } else {
        state.cartItems.push(item);
      }

      updateCart(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== itemIdToRemove
      );

      updateCart(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },

    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCart,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
