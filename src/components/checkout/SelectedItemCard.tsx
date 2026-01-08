import { View, Text } from "react-native";
import React from "react";
import { CartItem } from "@/services/types/cartTypes";

import { cn } from "@/utils/cn";
import AttributeDisplay from "../cart/AttributeDisplay";
import VariationItem from "../cart/VariationItem";

const SelectedItemCard = ({ item }: { item: CartItem }) => (
  <View className={cn("bg-foreground border border-border mb-3 rounded-2xl shadow-sm overflow-hidden")}>
    {/* Header with Checkbox and Product Name */}
    <View className="flex-row items-center p-4 border-b border-border">
      <Text className="font-bold text-heading text-base flex-1" numberOfLines={2}>
        {item.productName}
      </Text>
    </View>

    <View className="p-4">
      {/* Attributes */}
      <AttributeDisplay attributeValues={item.attributeValues} />

      {/* Variations */}
      {item.variations.length > 0 && (
        <View className="mb-4">
          <Text className="text-xs font-semibold text-gray-500 uppercase mb-2">Services</Text>
          {item.variations.map((v) => (
            <VariationItem key={v._id} variation={v} />
          ))}
        </View>
      )}

      {/* Subtotal */}
      <View className="flex-row justify-end items-center">
        <Text className="text-gray-600 mr-2">Subtotal:</Text>
        <Text className="text-primary font-bold text-lg">৳{item.subtotal.toFixed(2)}</Text>
      </View>
    </View>
  </View>
);

export default SelectedItemCard;
