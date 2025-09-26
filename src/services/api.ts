import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import store, { clearStore } from "../store";
import { goBack } from "@/utils/NavigationUtils";
import env from "@/services/env";
import { showToast } from "@/utils/commonFunction";
const API_BASE_URL = env.ENDPOINT;

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use(
      async (config) => {
        const authState = store.getState().auth;
        const token = authState?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: any) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 401) {
            showToast({ message: "Invalid or expired token." });
            console.log("Unauthorized: Invalid or expired token", { data });
            goBack();
            await clearStore();
            showToast({ message: "Please login again" });
            return Promise.reject(error);
          } else if (status >= 500) {
            console.log("Server error:", error.response.data.error);
            showToast({ message: "Server error login again." });
          } else {
            data.message !== "No active subscription found" &&
              console.log("Request failed:", {
                status,
                data: data.error || data.message,
              });
          }
        } else if (error.request) {
          console.log("No response received:", {
            request: error.request,
            config: error.config,
          });
        } else {
          console.log("Request setup error:", {
            message: error.message,
            code: error.code,
          });
        }
        return Promise.reject(error);
      }
    );
  }

  private async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.api.request<T>({
        method,
        url: endpoint,
        data,
        ...config,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  // Generic HTTP methods
  async get<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, config);
  }

  async post<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>("POST", endpoint, data, config);
  }

  async put<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>("PUT", endpoint, data, config);
  }

  async delete<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, config);
  }

  // Wishlist methods
  async getWishlist(page: number = 1, limit: number = 50): Promise<any> {
    return this.request<any>("GET", `/wishlist?page=${page}&limit=${limit}`);
  }

  async addToWishlist(courseId: string): Promise<any> {
    return this.request<any>("POST", `/wishlist/${courseId}`);
  }

  async removeFromWishlist(courseId: string): Promise<any> {
    return this.request<any>("DELETE", `/wishlist/${courseId}`);
  }

  async checkWishlistStatus(courseId: string): Promise<any> {
    return this.request<any>("GET", `/wishlist/check/${courseId}`);
  }

  async getWishlistStats(): Promise<any> {
    return this.request<any>("GET", "/wishlist/stats");
  }
}

export const apiService = new ApiService();
export default apiService;
