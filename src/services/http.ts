import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import env from "@/services/env";
import store, { clearStore, dispatch } from "../store";
import { setAccessToken } from "@/store/reducer/authReducer";
import { token } from "@/utils/commonFunction";

const API_BASE_URL = env.ENDPOINT;

// ❌ REMOVE THESE LINES
// const { accessToken, refreshToken } = store.getState().auth;

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
  await clearStore();
};

const refreshAccessToken = async (api: AxiosInstance): Promise<string | null> => {
  // ✅ Get fresh refreshToken here
  const { refreshToken } = store.getState().auth;

  if (!refreshToken) throw new Error("No refresh token available");

  const resp = await api.post("/auth/refresh-token", {}, { headers: { Authorization: `Bearer ${refreshToken}` } });

  const newAccessToken = resp.data?.data?.accessToken;
  if (!newAccessToken) throw new Error("No access token in refresh response");

  dispatch(setAccessToken(newAccessToken));
  return newAccessToken;
};

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ----- Request Interceptor -----
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // ✅ Get fresh accessToken on EVERY request

    console.log("token", token ? "exists" : "missing");

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ----- Response Interceptor (unchanged) -----
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest?.url?.includes("/auth/refresh-token") || originalRequest._retry) {
      await handleLogout();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

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
