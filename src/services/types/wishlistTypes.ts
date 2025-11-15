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
