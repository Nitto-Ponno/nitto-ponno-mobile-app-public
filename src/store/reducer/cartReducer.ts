import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  carts: any[];
  selectedCart: any;
}

const initialState: CartState = {
  carts: [],
  selectedCart: null,
};

const trackCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    setCarts: (state, action: PayloadAction<any[]>) => {
      state.carts = action.payload;
    },
    addToCart: (state, action: PayloadAction<any | null>) => {
      if (!action.payload || !action?.payload?._id) {
        console.warn("Invalid payload for addToCart:", action.payload);
        return;
      }

      // Ensure state.carts is initialized
      if (!state.carts) {
        state.carts = [];
      }

      // Check if item already exists in carts
      const isAvailable = state.carts.some((item) => item._id === action?.payload?._id);
      if (!isAvailable) {
        state.carts.push(action.payload);
      }
    },

    // Update cart items (replace entire array)
    updateCarts: (state, action: PayloadAction<any[]>) => {
      state.carts = action.payload || []; // Fallback to empty array
    },

    // Delete item from carts
    deleteCartItem: (state, action: PayloadAction<{ itemId: string }>) => {
      const { itemId } = action.payload;
      // Ensure state.carts is initialized
      if (!state.carts) {
        state.carts = [];
      }
      state.carts = state.carts.filter((item) => item._id !== itemId);
    },
    // Empty the cart
    emptyCart: (state) => {
      state.carts = [];
    },
  },
});

export const { setCarts, emptyCart, addToCart, updateCarts, deleteCartItem } = trackCartSlice.actions;

// Export the reducer
export default trackCartSlice.reducer;
