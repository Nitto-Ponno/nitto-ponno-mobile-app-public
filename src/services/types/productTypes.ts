export interface AttributeValue {
  attributeId: string;
  attributeName: string;
  optionId: string;
}

// export interface Variation {
//   serviceId: {
//     _id: string;
//     name: string;
//     id: string;
//   };
//   price: number;
//   discount?: Discount;
//   sku: string;
//   isAvailable: boolean;
//   _id: string;
//   createdAt: string;
//   updatedAt: string;
// }
export interface Service {
  _id: string;
  name: string;
}

export interface Variation {
  serviceId: { _id: string; name: string };
  price: number;
  discount?: Discount;
  isAvailable: boolean;
  _id: string;
}

// Types based on API response
export interface Discount {
  type: "percent" | "flat";
  value: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: Discount;
  services: { _id: string; name: string }[];
  attributeValues: AttributeValue[];
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
