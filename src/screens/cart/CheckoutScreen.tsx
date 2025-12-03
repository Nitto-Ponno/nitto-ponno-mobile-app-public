import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";

import AddressSection from "@/components/checkout/AddressSection";
import SelectedItemsSection from "@/components/checkout/SelectedItemsSection";
import { ScrollView } from "react-native";
import { OrderInfo, OrderInfoSection } from "@/components/cart/OrderInfoSection";
import { dispatch, useAppSelector } from "@/store";
import { updateOrderPayload } from "@/store/reducer/orderReducer";
import { KeyboardAvoiderScrollView } from "@good-react-native/keyboard-avoider";

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
    </SafeAreaView>
  );
};

export default CheckoutScreen;
