import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

// Quantity Controller Component
const QuantityController = ({ quantity, onIncrease, onDecrease }: { quantity: number; onIncrease: () => void; onDecrease: () => void }) => (
  <View className="flex-row items-center bg-gray-100 rounded-lg overflow-hidden">
    <TouchableOpacity onPress={onDecrease} className="w-10 h-10 items-center justify-center active:bg-gray-200">
      <Text className="text-xl font-bold text-gray-700">−</Text>
    </TouchableOpacity>

    <View className="w-12 h-10 items-center justify-center bg-white">
      <Text className="text-base font-bold text-heading">{quantity}</Text>
    </View>

    <TouchableOpacity onPress={onIncrease} className="w-10 h-10 items-center justify-center active:bg-gray-200">
      <Text className="text-xl font-bold text-gray-700">+</Text>
    </TouchableOpacity>
  </View>
);

export default QuantityController;
