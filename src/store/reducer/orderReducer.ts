import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface OrderState {
  pickupAddress: {
    fullAddress: string;
    apartment?: string;
  };
  deliveryAddress: {
    fullAddress: string;
    apartment?: string;
    sameAsPickup: boolean;
  };
  tax: number;
  deliveryCharge: number;
  paymentMethod: "cod";
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
  pickupAddress: {
    fullAddress: "",
    apartment: "",
  },
  deliveryAddress: {
    fullAddress: "",
    apartment: "",
    sameAsPickup: false,
  },
  tax: 0,
  deliveryCharge: 0,
  paymentMethod: "cod",
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
    updateOrderPayload: (state, action: PayloadAction<{ key: keyof OrderState; value: any }>) => {
      setValue(state, action.payload.key, action.payload.value);
    },
    clearOrderState: () => {
      return initialState;
    },
  },
});

export const { updateOrderPayload, clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;
function setValue<T extends object>(state: T, key: keyof T, value: T[keyof T]) {
  state[key] = value;
}
