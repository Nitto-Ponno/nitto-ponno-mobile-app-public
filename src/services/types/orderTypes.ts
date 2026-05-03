import { Variation } from "./productTypes";

export type OrderRequest = {
  user: string;
  pickupAddress: {
    fullAddress: string;
    apartment?: string;
  };
  deliveryAddress: {
    fullAddress: string;
    apartment?: string;
    sameAsPickup: boolean;
  };
  paymentMethod: "cod";
  preferredPickupSlot: {
    date: string;
    from: string;
    to: string;
  };
  preferredDeliverySlot: {
    date: string;
    from: string;
    to: string;
  };
  specialInstructions?: string;
  perfume?: boolean;
  foldOnly?: boolean;
  totalWeightKg?: number;
  source: "app" | "website" | "admin";
  items: [
    {
      productId: string;
      productName: string;
      variations: Variation;
      quantity: number;
      unitPrice: number;
      subtotal: number;
      attributeValues?: [
        {
          attributeId: string;
          attributeName: string;
          optionId: string;
        },
      ];
    },
  ];
  subtotal: number;
  totalAmount: number;
};

export interface OrderResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: OrderData;
  pagination: any[]; // empty array in your example
}

export interface OrderData {
  orderId: string;
  user: string;
  pickupAddress: PickupAddress;
  deliveryAddress: DeliveryAddress;
  items: OrderItem[];
  subtotal: number;
  itemDiscountTotal: number;
  tax: number;
  deliveryCharge: number;
  totalAmount: number;
  paymentMethod: "cod" | "online" | "wallet";
  paymentStatus: "pending" | "paid" | "failed" | string;
  preferredPickupSlot: TimeSlot;
  preferredDeliverySlot: TimeSlot;
  status: string;
  timeline: TimelineEntry[];
  specialInstructions: string;
  perfume: boolean;
  foldOnly: boolean;
  totalWeightKg: number;
  source: string;
  isTest: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PickupAddress {
  fullAddress: string;
}

export interface DeliveryAddress {
  fullAddress: string;
  sameAsPickup: boolean;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  _id: string;
  variations: any[]; // empty array in your example
  attributeValues: any[]; // empty array in your example
}

export interface TimeSlot {
  date: string;
  from: string;
  to: string;
}

export interface TimelineEntry {
  status: string;
  timestamp: string;
  note: string;
  _id: string;
}
