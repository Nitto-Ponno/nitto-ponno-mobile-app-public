import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";

import AddressSection from "@/components/checkout/AddressSection";
import SelectedItemsSection from "@/components/checkout/SelectedItemsSection";
import { ScrollView } from "react-native";

const CheckoutScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <CheckoutHeader />
      <ScrollView>
        <AddressSection />
        <SelectedItemsSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
