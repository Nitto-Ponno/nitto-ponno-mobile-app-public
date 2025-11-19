import store, { dispatch } from "@/store";
import { setAccessToken, setRefreshToken } from "@/store/reducer/authReducer";

export const tokenStorage = {
  getAccessToken: store.getState().auth.accessToken,
  getRefreshToken: store.getState().auth.refreshToken,

  setAccessToken: (token: string) => dispatch(setAccessToken(token)),
  setRefreshToken: (token: string) => dispatch(setRefreshToken(token)),
  clearAll: () => {
    dispatch(setRefreshToken(null));
    dispatch(setAccessToken(null));
  },
  isLoggedIn: !!store.getState().auth.accessToken,
};
