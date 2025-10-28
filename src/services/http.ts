import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import env from "@/services/env";
import { STORAGE_KEYS } from "./constants";
import { tokenStorage } from "./storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearStore } from "../store"; // adjust path if needed

const API_BASE_URL = env.ENDPOINT;

// Manage queued requests while refreshing
type QueueEntry = {
  resolve: (value: string) => void;
  reject: (reason?: any) => void;
};

let isRefreshing = false;
let failedQueue: QueueEntry[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else if (token) resolve(token);
  });
  failedQueue = [];
};

const handleLogout = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  await AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  await clearStore(); // navigate to login inside your app
};

const refreshAccessToken = async (api: AxiosInstance): Promise<string | null> => {
  const refreshToken = await tokenStorage.getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");

  const resp = await api.post("/auth/refresh-token", {}, { headers: { Authorization: `Bearer ${refreshToken}` } });

  const newAccessToken = resp.data?.data?.accessToken;
  if (!newAccessToken) throw new Error("No access token in refresh response");

  await tokenStorage.setAccessToken(newAccessToken);
  return newAccessToken;
};

// Create a singleton axios instance with interceptors
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ----- Request Interceptor -----
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await tokenStorage.getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ----- Response Interceptor -----
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401s
    if (error?.response?.status !== 401) {
      return Promise.reject(error);
    }

    // If 401 from /auth/refresh-token or already retried -> logout
    if (originalRequest?.url?.includes("/auth/refresh-token") || originalRequest._retry) {
      await handleLogout();
      return Promise.reject(error);
    }

    // mark to avoid loops
    originalRequest._retry = true;

    // If a refresh is in progress, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    // Start refresh flow
    isRefreshing = true;
    try {
      const newToken = await refreshAccessToken(api);
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        return api(originalRequest);
      }
      await handleLogout();
      return Promise.reject(error);
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      await handleLogout();
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);

// ----- Minimal request helpers (optional sugar) -----
async function request<T>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const resp = await api.request<T>({ method, url: endpoint, data, ...config });
  return resp.data as T;
}

export const http = {
  get: <T = any>(endpoint: string, config?: AxiosRequestConfig) => request<T>("GET", endpoint, undefined, config),
  post: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig) => request<T>("POST", endpoint, data, config),
  put: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig) => request<T>("PUT", endpoint, data, config),
  patch: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig) => request<T>("PATCH", endpoint, data, config),
  delete: <T = any>(endpoint: string, config?: AxiosRequestConfig) => request<T>("DELETE", endpoint, undefined, config),
};

// Token helpers re-exposed for convenience
export const authTokens = {
  getAccessToken: tokenStorage.getAccessToken,
  getRefreshToken: tokenStorage.getRefreshToken,
  isLoggedIn: tokenStorage.isLoggedIn,
  clearAll: tokenStorage.clearAll,
};
