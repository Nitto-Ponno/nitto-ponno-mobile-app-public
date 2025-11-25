type Discount = {
  type: "percent";
  value: number; // 0-100
};

interface Service {
  _id: string;
  name: string;
}

interface Variation {
  serviceId: Service;
  price: number;
  discount?: Discount;
  isAvailable: boolean;
  _id: string;
}

interface AttributeValue {
  attributeId: string;
  attributeName: string;
  optionId: string;
  // optionName?: string; // optional if you have it
}

export interface CartItem {
  productId: string;
  productName: string;
  variations: Variation[];
  quantity: number;
  attributeValues: AttributeValue[];
  subtotal: number;
}
