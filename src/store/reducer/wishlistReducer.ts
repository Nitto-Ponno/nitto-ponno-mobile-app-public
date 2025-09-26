import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface WishlistState {
  selectedList: any | null;
  wishlist: any[] | null;
}

const initialState: WishlistState = {
  selectedList: null,
  wishlist: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<any>) => {
      if (!state.wishlist) {
        state.wishlist = [];
      }

      const exists = state.wishlist.some((item) => item._id === action.payload._id);
      if (!exists) {
        state.wishlist.push(action.payload);
      }
    },
    setWishlist: (state, action: PayloadAction<any[] | null>) => {
      state.wishlist = action.payload;
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      if (state.wishlist) {
        state.wishlist = state.wishlist.filter((item) => item._id !== action.payload);
      }
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
    setSelectedList: (state, action: PayloadAction<any | null>) => {
      state.selectedList = action.payload;
    },
  },
});

export const {} = wishlistSlice.actions;

export default wishlistSlice.reducer;
