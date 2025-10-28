import { TAuthenticationScreens } from "@/screens/auth/AuthenticationFlow";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the auth state
interface AuthState {
  user: any | null;
  token: string | null;
  authScreen: TAuthenticationScreens;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  authScreen: "signin",
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
    },
    setAuthScreen: (state, action: PayloadAction<any>) => {
      console.log("action.payload", JSON.stringify(action.payload, null, 2));
      state.authScreen = action.payload;
    },

    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
    updateUser: (state, action: PayloadAction<Partial<any>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

// Export actions
export const { setUser, updateUser, setToken, removeToken, setAuthScreen } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
