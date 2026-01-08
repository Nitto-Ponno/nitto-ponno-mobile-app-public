import React, { useState } from "react";
import AddressSection from "@/components/checkout/AddressSection";
import SelectedItemsSection from "@/components/checkout/SelectedItemsSection";
import { TouchableOpacity, View } from "react-native";
import { OrderInfo, OrderInfoSection } from "@/components/cart/OrderInfoSection";
import { dispatch, useAppSelector } from "@/store";
import { updateOrderPayload } from "@/store/reducer/orderReducer";
import { KeyboardAvoiderScrollView } from "@good-react-native/keyboard-avoider";
import NText from "@/components/global/NText";
import OrderPlacedModal from "@/components/checkout/OrderPlacedModal";
import { OrderData } from "@/services/types/orderTypes";
import { OrderApi, transformCart, validateOrderData } from "@/services/api/orderApi";
import { handleErrorResponse } from "@/utils/handlers";
import TitleHeader from "@/components/common/TitleHeader";

const CheckoutScreen = () => {
  const { paymentMethod, preferredPickupSlot, specialInstructions, preferredDeliverySlot, perfume, foldOnly, totalWeightKg, source } =
    useAppSelector((state) => state.order);

  const orderData = useAppSelector((state) => state.order);
  const { user } = useAppSelector((state) => state.auth);
  const { cartItems, selectedCart } = useAppSelector((state) => state.cart);

  const [order, setOrder] = useState<OrderData | null>(null);
  const value = {
    paymentMethod,
    preferredPickupSlot,
    specialInstructions,
    preferredDeliverySlot,
    perfume,
    foldOnly,
    totalWeightKg,
    source,
  };

  const handleChange = (key: keyof OrderInfo, value: any) => {
    // setOrderInfo((prev) => ({ ...prev, [key]: value }));
    dispatch(updateOrderPayload({ key, value }));
  };

  const handleCreateOrder = async () => {
    const finalItems = cartItems.filter((i) => selectedCart?.includes(i?.cartId));

    if (!validateOrderData(orderData)) {
      return;
    }

    let payload: any = orderData;
    if (finalItems.length > 0 && finalItems && user) {
      payload = { ...payload, totalWeightKg: 10, paymentMethod: "cod", ...transformCart(finalItems), user: user?._id };
    }
    try {
      const response = await OrderApi.placeOrder(payload);
      if (response.data) {
        // dispatch(clearOrderState());
        response.data && setOrder(response.data);
      }
      return response.data;
    } catch (err: any) {
      handleErrorResponse(err, "Order place");
      console.log("err.response.data.message", JSON.stringify(err.response.data, null, 2));
    }
  };
  return (
    <View className="flex-1 bg-background pb-6">
      <TitleHeader title="Checkout" />
      <KeyboardAvoiderScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4 mx-4">
          <AddressSection />
          <SelectedItemsSection />
          <OrderInfoSection value={value} onChange={handleChange} />
        </View>
      </KeyboardAvoiderScrollView>
      <TouchableOpacity onPress={handleCreateOrder} className="h-12 mx-4 justify-center items-center bg-primary rounded-2xl mt-2">
        <NText className="font-semibold text-white">Confirm Order</NText>
      </TouchableOpacity>
      {order?._id && (
        <OrderPlacedModal
          onClose={() => {
            setOrder(null);
          }}
          visible={Boolean(order?._id)}
          order={order}
        />
      )}
    </View>
  );
};

export default CheckoutScreen;
