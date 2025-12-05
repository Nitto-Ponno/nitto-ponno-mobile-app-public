import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

// Order Summary Component
const OrderSummary = ({ selectedCount, total, onCheckout }: { selectedCount: number; total: string; onCheckout: () => void }) => (
  <View className="bg-white border-t border-border px-4 py-5 shadow-2xl">
    <View className="flex-row justify-between items-center mb-3">
      <View>
        <Text className="text-xs text-gray-500 uppercase mb-1">Selected Items</Text>
        <Text className="text-2xl font-bold text-heading">{selectedCount}</Text>
      </View>

      <View className="items-end">
        <Text className="text-xs text-gray-500 uppercase mb-1">Total Amount</Text>
        <Text className="text-2xl font-bold text-primary">₹{total}</Text>
      </View>
    </View>

    <TouchableOpacity
      onPress={onCheckout}
      disabled={selectedCount === 0}
      className={`py-4 rounded-xl items-center ${selectedCount === 0 ? "bg-gray-300" : "bg-primary active:bg-primary/90"}`}
    >
      <Text className="text-white font-bold text-base">{selectedCount === 0 ? "Select items to checkout" : "Proceed to Checkout"}</Text>
    </TouchableOpacity>
  </View>
);

export default OrderSummary;
