import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  OtpResponse,
  ResetPasswordRequest,
  User,
  SendVerificationRequest,
  VerifyOtpRequest,
  VerifyOtpResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from "@/services/types/authTypes";
import { http } from "@/services/http";
import { ApiResponse } from "../types/genericTypes";

export const AuthApi = {
  async customerRegister(payload: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    return await http.post<ApiResponse<RegisterResponse>>("/auth/customer-register", payload);
  },

  async adminLogin(payload: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return await http.post<ApiResponse<LoginResponse>>("/auth/admin-login", payload);
  },

  async customerLogin(payload: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return await http.post<ApiResponse<LoginResponse>>("/auth/login", payload);
  },

  async refreshToken(): Promise<ApiResponse<RefreshTokenResponse>> {
    return await http.post<ApiResponse<RefreshTokenResponse>>("/auth/refresh-token");
  },

  async forgotPassword(payload: ForgotPasswordRequest): Promise<ApiResponse<OtpResponse>> {
    return await http.post<ApiResponse<OtpResponse>>("/auth/forgot-password", payload);
  },

  async resetPassword(payload: ResetPasswordRequest): Promise<ApiResponse<User>> {
    return await http.post<ApiResponse<User>>("/auth/reset-password", payload);
  },

  async sendVerification(payload: { email?: string; phoneNumber?: string }): Promise<ApiResponse<OtpResponse>> {
    return await http.post<ApiResponse<OtpResponse>>("/auth/send-verification", payload);
  },

  async verifyOtp(payload: { email?: string; phoneNumber?: string }): Promise<ApiResponse<VerifyOtpResponse>> {
    return await http.post<ApiResponse<VerifyOtpResponse>>("/auth/verify-otp", payload);
  },

  async getMyData(select?: string): Promise<ApiResponse<User>> {
    const config = select ? { params: { select } } : undefined;
    return await http.get<ApiResponse<User>>("/auth/getMyData", config);
  },

  async updatePassword(payload: UpdatePasswordRequest): Promise<ApiResponse<UpdatePasswordResponse>> {
    return await http.post<ApiResponse<UpdatePasswordResponse>>("/auth/update-password", payload);
  },
};
