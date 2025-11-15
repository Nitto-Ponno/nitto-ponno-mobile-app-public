// ===== Generic API Response =====
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  error?: string;
}

export interface ErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  error: string;
}
