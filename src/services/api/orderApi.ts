import { http } from "../http";
import { ApiResponse } from "../types/genericTypes";
import { OrderRequest } from "../types/orderTypes";
import store from "@/store";
import { showErrorToast } from "@/utils/commonFunction";
import { Variation } from "../types/productTypes";
type TProduct = {
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
};
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
  async placeOrder(payload: OrderRequest): Promise<ApiResponse<any>> {
    return await http.post<ApiResponse<any>>("/orders", payload);
  },

  //   async getSingle(id: string): Promise<ApiResponse<GetSingleCategoryResponse>> {
  //     return await http.get<ApiResponse<GetSingleCategoryResponse>>(`/category/single/${id}`);
  //   },
};

const validateOrderData = (order: any): order is OrderRequest => {
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

export const handleCreateOrder = async () => {
  const order = store.getState().order;
  const { user } = store.getState().auth;

  const { cartItems, selectedCart } = store.getState().cart;
  const finalItems = cartItems.filter((i) => selectedCart?.includes(i?.cartId));

  if (!validateOrderData(order)) {
    return;
  }
  console.log("finalItems", JSON.stringify(finalItems, null, 2));
  // TypeScript now knows `order` is of type OrderRequest
  let payload: OrderRequest = order;
  if (finalItems.length > 0 && finalItems && user) {
    payload = { ...payload, paymentMethod: "cod", ...transformCart(finalItems), user: user?._id };
  }

  console.log("payload", JSON.stringify(payload, null, 2));
  try {
    const response = await OrderApi.placeOrder(payload);
    console.log("response", JSON.stringify(response, null, 2));
  } catch (err: any) {
    // handleErrorResponse(err, "Order place");
    console.log("err.response.data.message", JSON.stringify(err.response.data, null, 2));
  }
};
