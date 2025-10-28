import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "./constants";

export const tokenStorage = {
  getAccessToken: () => AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  getRefreshToken: () => AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
  setAccessToken: (token: string) => AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token),
  setRefreshToken: (token: string) => AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token),
  clearAll: () => AsyncStorage.multiRemove([STORAGE_KEYS.ACCESS_TOKEN, STORAGE_KEYS.REFRESH_TOKEN]),
  isLoggedIn: async () => !!(await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)),
};
