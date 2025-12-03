import { View } from "react-native";
import React from "react";
import { useAppSelector } from "@/store";
import SelectedItemCard from "./SelectedItemCard";
import NText from "../global/NText";
import { MousePointerClick } from "lucide-react-native";

const SelectedItemsSection = () => {
  const { cartItems, selectedCart } = useAppSelector((state) => state.cart);
  const selectedItems = cartItems?.filter((item) => selectedCart?.includes(item?.cartId));

  return (
    <View className="px-4 pb-2 pt-4 bg-surface rounded-xl border border-outline">
      <View className="flex-row items-center gap-2">
        <MousePointerClick />
        <NText className="text-xl font-bold text-heading">Selected Items</NText>
      </View>
      <View className="mt-4">
        {selectedItems.map((item) => (
          <SelectedItemCard key={item.cartId} item={item} />
        ))}
      </View>
    </View>
  );
};

export default SelectedItemsSection;
