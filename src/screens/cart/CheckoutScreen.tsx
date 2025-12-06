import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";

import AddressSection from "@/components/checkout/AddressSection";
import SelectedItemsSection from "@/components/checkout/SelectedItemsSection";
import { TouchableOpacity } from "react-native";
import { OrderInfo, OrderInfoSection } from "@/components/cart/OrderInfoSection";
import { dispatch, useAppSelector } from "@/store";
import { updateOrderPayload } from "@/store/reducer/orderReducer";
import { KeyboardAvoiderScrollView } from "@good-react-native/keyboard-avoider";
import NText from "@/components/global/NText";
import { handleCreateOrder } from "@/services/api/orderApi";

const CheckoutScreen = () => {
  const { paymentMethod, preferredPickupSlot, specialInstructions, preferredDeliverySlot, perfume, foldOnly, totalWeightKg, source } =
    useAppSelector((state) => state.order);
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
  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <CheckoutHeader />
      <KeyboardAvoiderScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <AddressSection />
        <SelectedItemsSection />
        <OrderInfoSection value={value} onChange={handleChange} />
      </KeyboardAvoiderScrollView>
      <TouchableOpacity onPress={handleCreateOrder} className="h-12 justify-center items-center bg-primary rounded-2xl mt-2">
        <NText className="font-semibold text-white">Confirm Order</NText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
