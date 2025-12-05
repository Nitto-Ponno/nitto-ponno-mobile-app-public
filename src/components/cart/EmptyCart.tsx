import { View, Text } from "react-native";
import React from "react";

// Empty Cart Component
const EmptyCart = () => (
  <View className="flex-1 items-center justify-center px-8">
    <Text className="text-6xl mb-4">🛒</Text>
    <Text className="text-xl font-bold text-heading mb-2">Your cart is empty</Text>
    <Text className="text-gray-500 text-center">Add items to get started with your order</Text>
  </View>
);

export default EmptyCart;
