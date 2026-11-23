import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: [],

  reducers: {

    addWishlist: (state, action) => {

      const exists = state.find(
        product =>
          product.id === action.payload.id
      );

      if (!exists) {
        state.push(action.payload);
        alert('added to wishlist');
      }

    },

    removeWishlist: (state, action) => {

      return state.filter(
        product =>
          product.id !== action.payload
      );

    }

  }
});

export const {
  addWishlist,
  removeWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
