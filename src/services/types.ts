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
  email: string;
  otp: string;
}

export interface SendVerificationRequest {
  email: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// ===== Generic API Response =====
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  error?: string;
}

// ===== Auth: Responses =====
export interface RegisterResponse {
  user: User;
  verificationSent: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
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

// ===== Wishlist =====
export interface WishlistItem {
  _id: string;
  courseId: string;
  userId: string;
  createdAt?: string;
}

export interface WishlistResponse {
  items: WishlistItem[];
  total: number;
  page: number;
  limit: number;
}

export interface WishlistStats {
  totalItems: number;
  lastAdded?: string;
}

// Useful for throwing API errors with a known shape
export interface ErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  error: string;
}
