import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the auth state
interface AuthState {
  user: any | null;
  token: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
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
export const { setUser, updateUser, setToken, removeToken } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
