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
