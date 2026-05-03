import { View, Text } from "react-native";
import React from "react";
import { CartItem } from "@/services/types/cartTypes";

const AttributeDisplay = ({ attributeValues }: { attributeValues: CartItem["attributeValues"] }) => {
  if (!attributeValues || attributeValues.length === 0) return null;

  return (
    <View className="flex-row flex-wrap gap-2 mb-3">
      {attributeValues.map((attr) => (
        <View key={attr.attributeId} className="bg-gray-100 px-3 py-1 rounded-full">
          <Text className="text-xs text-gray-600">
            {attr.attributeName}: <Text className="font-semibold">{attr.optionId}</Text>
          </Text>
        </View>
      ))}
    </View>
  );
};
export default AttributeDisplay;
