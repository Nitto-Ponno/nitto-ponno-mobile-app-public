// ===== Generic API Response =====
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  error?: string;
  meta?: Pagination;
}

export interface ErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  error: string;
}

export interface Pagination {
  currentPage: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  page: number;
}
