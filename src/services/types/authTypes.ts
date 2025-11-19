// ===== User =====
export interface UserName {
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName?: string;
}

export interface User {
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

// ===== Auth: Requests =====
export interface RegisterRequest {
  email: string;
  password: string;
  phoneNumber: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
  otp: string;
}

export interface VerifyOtpRequest {
  email?: string;
  phoneNumber?: string;
  otp: string;
}

export interface SendVerificationRequest {
  email: string;
  phoneNumber?: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// ===== Auth: Responses =====
export interface RegisterResponse {
  user: User;
  verificationSent: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  isVerified?: boolean;
  user: User;
}

export interface VerifyOtpResponse {
  accessToken: string;
  refreshToken: string;
  isVerified: boolean;
  verifiedUser: User;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface UpdatePasswordResponse {
  acknowledged: boolean;
  modifiedCount: number;
}

export interface OtpResponse {}
