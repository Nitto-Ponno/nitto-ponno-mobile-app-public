import { CartItem } from "@/services/types/cartTypes";
import { calculateItemSubtotal } from "@/utils/commonFunction";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cartItems: CartItem[];
  selectedCart: string[]; // productId list
}

const initialState: CartState = {
  cartItems: [],
  selectedCart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exists = state.cartItems.some((item) => item.productId === action.payload.productId);
      if (!exists) {
        state.cartItems.push({
          ...action.payload,
          subtotal: calculateItemSubtotal(action.payload),
        });
      }
    },

    updateQuantity: (state, action: PayloadAction<{ productId: string; type: "inc" | "dec" }>) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.productId === action.payload.productId) {
          const qty = action.payload.type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1);

          const updatedItem = { ...item, quantity: qty };
          updatedItem.subtotal = calculateItemSubtotal(updatedItem);
          return updatedItem;
        }
        return item;
      });
    },

    removeCartItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((i) => i.productId !== action.payload);
      state.selectedCart = state.selectedCart.filter((id) => id !== action.payload);
    },

    toggleSelectCartItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state?.selectedCart?.includes(id)) {
        state.selectedCart = state?.selectedCart?.filter((x) => x !== id);
      } else {
        if (!state?.selectedCart) {
          state.selectedCart = [];
        }
        state.selectedCart.push(id);
      }
    },

    emptyCart: (state) => {
      state.cartItems = [];
      state.selectedCart = [];
    },
  },
});

export const { addToCart, updateQuantity, removeCartItem, toggleSelectCartItem, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
