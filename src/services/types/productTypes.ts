// Types based on API response
export interface Discount {
  type: "percent" | "flat";
  value: number;
}

export interface AttributeValue {
  attributeId: {
    name: string;
    id: string | null;
  };
  value: string;
}

export interface Variation {
  serviceId: {
    _id: string;
    name: string;
    id: string;
  };
  attributeValues: AttributeValue[];
  price: number;
  discount?: Discount;
  sku: string;
  isAvailable: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: Discount;
  services: { _id: string; name: string }[];
  attributes: { _id: string; name: string }[];
  variations: Variation[];
  createdAt: string;
  updatedAt: string;
  finalPrice: number;
  id: string;
}

export interface Pagination {
  currentPage: string;
  limit: string;
  total: number;
}

export interface ProductListResponse {
  data: Product[];
  pagination: Pagination;
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  serviceId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "createdAt" | "price" | "name";
  sortOrder?: "asc" | "desc";
}
