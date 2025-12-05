import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { CartItem } from "@/services/types/cartTypes";
import Checkbox from "./Checkbox";
import AttributeDisplay from "./AttributeDisplay";
import VariationItem from "./VariationItem";
import QuantityController from "./QuantityController";
import { cn } from "@/utils/cn";

const CartItemCard = ({
  item,
  isSelected,
  onToggleSelect,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  isSelected: boolean;
  onToggleSelect: () => void;
  onUpdateQuantity: (type: "inc" | "dec") => void;
  onRemove: () => void;
}) => (
  <View className={cn("bg-foreground border border-border mx-4 mb-3 rounded-2xl shadow-sm overflow-hidden")}>
    {/* Header with Checkbox and Product Name */}
    <View className="flex-row items-center p-4 border-b border-border">
      <Checkbox isSelected={isSelected} onPress={onToggleSelect} />
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

      {/* Actions Row */}
      <View className="flex-row items-center justify-between pt-3">
        <QuantityController
          quantity={item.quantity}
          onIncrease={() => onUpdateQuantity("inc")}
          onDecrease={() => onUpdateQuantity("dec")}
        />

        <TouchableOpacity onPress={onRemove} className="px-4 py-2 bg-red-50 rounded-lg active:bg-red-100">
          <Text className="text-red-600 font-semibold text-sm">Remove</Text>
        </TouchableOpacity>
      </View>

      {/* Subtotal */}
      <View className="flex-row justify-end items-center mt-4 pt-3 border-t border-gray-100">
        <Text className="text-gray-600 mr-2">Subtotal:</Text>
        <Text className="text-primary font-bold text-lg">₹{item.subtotal.toFixed(2)}</Text>
      </View>
    </View>
  </View>
);

export default CartItemCard;
