import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the auth state
interface AuthState {
  user: any | null;
  token: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  authInfo: {
    selectedMethod: "email" | "phone";
    chooseMethodVisible: boolean;
    email: string;
    password: string;
    phoneNumber: string;
    name: {
      firstName: string;
      middleName: string;
      lastName: string;
    };
  } | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  authInfo: null,
  accessToken: null,
  refreshToken: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload;
    },
    setAuthInfo: (state, action: PayloadAction<any | null>) => {
      if (action.payload === null) {
        state.authInfo = null;
      }
      state.authInfo = { ...state.authInfo, ...action.payload };
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
export const { setUser, updateUser, setToken, removeToken, setAuthInfo, setAccessToken, setRefreshToken } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
