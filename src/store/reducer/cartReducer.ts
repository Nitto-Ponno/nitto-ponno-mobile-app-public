import { CartItem } from "@/services/types/cartTypes";
import { calculateItemSubtotal, generateSimpleUniqueId } from "@/utils/commonFunction";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cartItems: CartItem[];
  selectedCart: string[];
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
      if (!state.cartItems) {
        state.cartItems = [];
      }
      const exists = state.cartItems.find((item) => item.productId === action.payload.productId);
      const p1 = exists?.productId ? exists : null;
      const check = checkExistence(p1, action.payload);
      if (check === "ADD_NEW") {
        state.cartItems.push({
          ...action.payload,
          subtotal: calculateItemSubtotal(action.payload),
          cartId: generateSimpleUniqueId(),
        });
      }
      if (check === "UPDATE") {
        const idx = state.cartItems.findIndex((i) => i.productId === action.payload.productId);
        const item = state.cartItems[idx];
        state.cartItems[idx] = {
          ...item,
          quantity: item.quantity + action.payload.quantity,
          subtotal: item.subtotal + action.payload.subtotal,
        };
      }
    },

    updateQuantity: (state, action: PayloadAction<{ cartId: string; type: "inc" | "dec" }>) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.cartId === action.payload.cartId) {
          const qty = action.payload.type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
          const updatedItem = { ...item, quantity: qty };
          updatedItem.subtotal = calculateItemSubtotal(updatedItem);
          return updatedItem;
        }
        return item;
      });
    },

    removeCartItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((i) => i.cartId !== action.payload);
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

export const checkExistence = (p1: CartItem | null, p2: CartItem) => {
  if (Boolean(!p1)) {
    return "ADD_NEW";
  }
  if (
    JSON.stringify(p1?.variations) === JSON.stringify(p2.variations) &&
    p1?.productId === p2.productId &&
    JSON.stringify(p1.attributeValues) === JSON.stringify(p2.attributeValues)
  ) {
    return "UPDATE";
  }
  return "ADD_NEW";
};
