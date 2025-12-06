import { http } from "../http";
import { ApiResponse } from "../types/genericTypes";
import { OrderData, OrderRequest, OrderResponse } from "../types/orderTypes";
import store from "@/store";
import { showErrorToast } from "@/utils/commonFunction";

export function transformCart(data: any[]) {
  const items = data.map((item) => {
    const variation = item.variations[0];

    return {
      productId: item.productId,
      serviceId: variation.serviceId._id, // backend expects string!
      quantity: item.quantity,
      unitPrice: variation.price,
      subtotal: item.subtotal,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    items,
    subtotal,
    totalAmount: subtotal, // or apply delivery charge, discounts etc.
  };
}

export const OrderApi = {
  async placeOrder(payload: OrderRequest): Promise<ApiResponse<OrderData>> {
    return await http.post<ApiResponse<OrderData>>("/orders", payload);
  },

  async getAllOrders(): Promise<ApiResponse<any>> {
    return await http.get<ApiResponse<any>>(`/orders/my`);
  },
  //   async getSingle(id: string): Promise<ApiResponse<GetSingleCategoryResponse>> {
  //     return await http.get<ApiResponse<GetSingleCategoryResponse>>(`/category/single/${id}`);
  //   },
};

export const validateOrderData = (order: any): order is OrderRequest => {
  if (!order.pickupAddress || !order.pickupAddress.fullAddress) {
    showErrorToast({ message: "Invalid pickup address" });
    return false;
  }

  if (!order.deliveryAddress || !order.deliveryAddress.fullAddress || typeof order.deliveryAddress.sameAsPickup !== "boolean") {
    showErrorToast({ message: "Invalid delivery address" });
    return false;
  }

  if (!order.paymentMethod) {
    showErrorToast({ message: "Missing payment method" });
    return false;
  }

  if (!order.preferredPickupSlot?.date || !order.preferredPickupSlot.from || !order.preferredPickupSlot.to) {
    showErrorToast({ message: "Invalid pickup slot" });
    return false;
  }

  if (!order.preferredDeliverySlot?.date || !order.preferredDeliverySlot.from || !order.preferredDeliverySlot.to) {
    showErrorToast({ message: "Invalid delivery slot" });
    return false;
  }

  if (!order.source) {
    showErrorToast({ message: "Missing source" });
    return false;
  }

  return true;
};
