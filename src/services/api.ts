import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import store, { clearStore } from "../store";
import { goBack } from "@/utils/NavigationUtils";
import env from "@/services/env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = env.ENDPOINT;

// ============= CONSTANTS =============

const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

// ============= TYPE DEFINITIONS =============

// User Name
interface UserName {
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName?: string;
}

// User Data
interface User {
  _id: string;
  email: string;
  name: UserName;
  phoneNumber: string;
  role: "customer" | "admin";
  isActive: boolean;
  isVerified: boolean;
  userType: "customer" | "admin";
  profilePicture?: string;
}

// Authentication Request/Response Types
interface RegisterRequest {
  email: string;
  password: string;
  phoneNumber: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ResetPasswordRequest {
  email: string;
  password: string;
  otp: string;
}

interface VerifyOtpRequest {
  email: string;
  otp: string;
}

interface SendVerificationRequest {
  email: string;
}

interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Response Types
interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  error?: string;
}

interface RegisterResponse {
  user: User;
  verificationSent: boolean;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface VerifyOtpResponse {
  accessToken: string;
  refreshToken: string;
  isVerified: boolean;
  verifiedUser: User;
}

interface RefreshTokenResponse {
  accessToken: string;
}

interface UpdatePasswordResponse {
  acknowledged: boolean;
  modifiedCount: number;
}

interface OtpResponse {
  // Empty data object for OTP responses
}

// Wishlist Types
interface WishlistItem {
  _id: string;
  courseId: string;
  userId: string;
  createdAt?: string;
}

interface WishlistResponse {
  items: WishlistItem[];
  total: number;
  page: number;
  limit: number;
}

interface WishlistStats {
  totalItems: number;
  lastAdded?: string;
}

interface ErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  error: string;
}

// ============= API SERVICE CLASS =============

class ApiService {
  private api: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request Interceptor
    this.api.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    this.api.interceptors.response.use(
      (response) => response,
      async (error: any) => {
        const originalRequest = error.config;

        if (error.response?.status === 401) {
          // Skip refresh for refresh-token endpoint itself
          if (originalRequest.url?.includes("/auth/refresh-token")) {
            await this.handleLogout();
            return Promise.reject(error);
          }

          // Prevent retry loop
          if (originalRequest._retry) {
            await this.handleLogout();
            return Promise.reject(error);
          }

          originalRequest._retry = true;

          // If already refreshing, queue this request
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.api(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          // Start refresh process
          this.isRefreshing = true;

          try {
            const newToken = await this.refreshAccessToken();

            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              this.processQueue(null, newToken);
              return this.api(originalRequest);
            } else {
              await this.handleLogout();
              return Promise.reject(error);
            }
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            await this.handleLogout();
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Refresh access token using refresh token
   */
  private async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await this.api.post(
        "/auth/refresh-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const newAccessToken = response.data?.data?.accessToken;

      if (newAccessToken) {
        await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
        return newAccessToken;
      }

      throw new Error("No access token in refresh response");
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw error;
    }
  }

  /**
   * Process queued requests after token refresh
   */
  private processQueue(error: any, token: string | null): void {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else if (token) {
        prom.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  /**
   * Handle logout on auth failure
   */
  private async handleLogout(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    // Trigger navigation to login screen in your app
    await clearStore();
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

  // ============= GENERIC HTTP METHODS =============

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

  async patch<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>("PATCH", endpoint, data, config);
  }

  // ============= TOKEN HELPERS =============

  async getAccessToken(): Promise<string | null> {
    return AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  async getRefreshToken(): Promise<string | null> {
    return AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  async isLoggedIn(): Promise<boolean> {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    return !!token;
  }

  async clearAllTokens(): Promise<void> {
    await AsyncStorage.multiRemove([STORAGE_KEYS.ACCESS_TOKEN, STORAGE_KEYS.REFRESH_TOKEN]);
  }

  // ============= AUTHENTICATION METHODS =============

  async customerRegister(payload: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    return this.post<ApiResponse<RegisterResponse>>("/auth/customer-register", payload);
  }

  async adminLogin(payload: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.post<ApiResponse<LoginResponse>>("/auth/admin-login", payload);
  }

  async customerLogin(payload: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.post<ApiResponse<LoginResponse>>("/auth/customer-login", payload);
  }

  async refreshToken(): Promise<ApiResponse<RefreshTokenResponse>> {
    return this.post<ApiResponse<RefreshTokenResponse>>("/auth/refresh-token");
  }

  async forgotPassword(payload: ForgotPasswordRequest): Promise<ApiResponse<OtpResponse>> {
    return this.post<ApiResponse<OtpResponse>>("/auth/forgot-password", payload);
  }

  async resetPassword(payload: ResetPasswordRequest): Promise<ApiResponse<User>> {
    return this.post<ApiResponse<User>>("/auth/reset-password", payload);
  }

  async sendVerification(payload: SendVerificationRequest): Promise<ApiResponse<OtpResponse>> {
    return this.post<ApiResponse<OtpResponse>>("/auth/send-verification", payload);
  }

  async verifyOtp(payload: VerifyOtpRequest): Promise<ApiResponse<VerifyOtpResponse>> {
    return this.post<ApiResponse<VerifyOtpResponse>>("/auth/verify-otp", payload);
  }

  async getMyData(select?: string): Promise<ApiResponse<User>> {
    const config = select ? { params: { select } } : undefined;
    return this.get<ApiResponse<User>>("/auth/getMyData", config);
  }

  async updatePassword(payload: UpdatePasswordRequest): Promise<ApiResponse<UpdatePasswordResponse>> {
    return this.post<ApiResponse<UpdatePasswordResponse>>("/auth/update-password", payload);
  }

  // ============= WISHLIST METHODS =============

  async getWishlist(page: number = 1, limit: number = 50): Promise<ApiResponse<WishlistResponse>> {
    return this.get<ApiResponse<WishlistResponse>>(`/wishlist?page=${page}&limit=${limit}`);
  }

  async addToWishlist(courseId: string): Promise<ApiResponse<WishlistItem>> {
    return this.post<ApiResponse<WishlistItem>>(`/wishlist/${courseId}`);
  }

  async removeFromWishlist(courseId: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`/wishlist/${courseId}`);
  }

  async checkWishlistStatus(courseId: string): Promise<ApiResponse<{ inWishlist: boolean }>> {
    return this.get<ApiResponse<{ inWishlist: boolean }>>(`/wishlist/check/${courseId}`);
  }

  async getWishlistStats(): Promise<ApiResponse<WishlistStats>> {
    return this.get<ApiResponse<WishlistStats>>("/wishlist/stats");
  }
}

export const apiService = new ApiService();
export default apiService;
