import { combineReducers } from "@reduxjs/toolkit"; // Use RTK's combineReducers
import type { AnyAction } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import { RESET_APP } from "..";

const appReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState | undefined, action: AnyAction): RootState => {
  if (action.type === RESET_APP) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
