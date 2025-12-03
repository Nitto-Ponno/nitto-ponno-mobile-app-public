import { AddressPayload } from "@/services/types/cartTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface OrderState {
  addresses: AddressPayload | null;
  tax: number;
  deliveryCharge: number;
  paymentMethod: "COD";
  preferredPickupSlot: {
    date: string;
    from: string;
    to: string;
  };
  preferredDeliverySlot: {
    date: string;
    from: string;
    to: string;
  };
  specialInstructions: string;
  perfume: boolean;
  foldOnly: boolean;
  totalWeightKg: number;
  source: "app" | "website" | "admin";
}

const initialState: OrderState = {
  addresses: null,
  tax: 0,
  deliveryCharge: 0,
  paymentMethod: "COD",
  preferredPickupSlot: {
    date: "",
    from: "",
    to: "",
  },
  preferredDeliverySlot: {
    date: "",
    from: "",
    to: "",
  },
  specialInstructions: "",
  perfume: false,
  foldOnly: false,
  totalWeightKg: 0,
  source: "app",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<AddressPayload>) => {
      state.addresses = action.payload;
    },
    updateOrderPayload: (state, action: PayloadAction<{ key: keyof OrderState; value: any }>) => {
      setValue(state, action.payload.key, action.payload.value);
    },
  },
});

export const { setAddress, updateOrderPayload } = orderSlice.actions;

export default orderSlice.reducer;
function setValue<T extends object>(state: T, key: keyof T, value: T[keyof T]) {
  state[key] = value;
}
