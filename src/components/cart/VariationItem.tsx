import { View, Text } from "react-native";
import React from "react";
import { CartItem } from "@/services/types/cartTypes";
import { calculateVariationPrice } from "@/utils/commonFunction";

// Variation Item Component
const VariationItem = ({ variation }: { variation: CartItem["variations"][0] }) => {
  const finalPrice = calculateVariationPrice(variation);

  return (
    <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
      <Text className="text-heading font-semibold flex-1" numberOfLines={1}>
        {variation.serviceId.name}
      </Text>

      <View className="flex-row items-center gap-2">
        <Text className="text-heading font-semibold">৳{finalPrice.toFixed(2)}</Text>

        {variation.discount && (
          <View className="bg-green-50 px-2 py-0.5 rounded">
            <Text className="text-xs text-green-600 font-medium">
              {variation.discount.type === "percent" ? `${variation.discount.value}%` : `৳${variation.discount.value}`}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default VariationItem;
