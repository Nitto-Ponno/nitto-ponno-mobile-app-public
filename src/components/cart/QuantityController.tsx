import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

// Quantity Controller Component
const QuantityController = ({ quantity, onIncrease, onDecrease }: { quantity: number; onIncrease: () => void; onDecrease: () => void }) => (
  <View className="flex-row items-center bg-accent rounded-lg overflow-hidden">
    <TouchableOpacity onPress={onDecrease} className="w-10 h-10 items-center justify-center active:bg-gray-200">
      <Text className="text-xl font-bold text-heading">−</Text>
    </TouchableOpacity>

    <View className="w-12 h-10 items-center justify-center bg-accent">
      <Text className="text-base font-bold text-heading">{quantity}</Text>
    </View>

    <TouchableOpacity onPress={onIncrease} className="w-10 h-10 items-center justify-center active:bg-gray-200">
      <Text className="text-xl font-bold text-heading">+</Text>
    </TouchableOpacity>
  </View>
);

export default QuantityController;
