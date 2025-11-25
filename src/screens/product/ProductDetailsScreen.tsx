import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/context/ThemeProvider";
import { goBack } from "@/utils/NavigationUtils";
import ProductSelection from "@/components/product/ProductSelection";

// Mock data - replace with useAppSelector
const selectedProduct = {
  _id: "69135cf83162fa4052120bc2",
  name: "Premium Cotton T-Shirt",
  description: "Soft and comfortable 100% cotton t-shirt",
  services: [
    { _id: "690ed4c311dcf7f5740abb7b", name: "Express Wash" },
    { _id: "srv001", name: "Dry Cleaning" },
    { _id: "srv002", name: "Premium Ironing" },
    { _id: "srv003", name: "Fabric Softener" },
  ],
  variations: [
    {
      serviceId: { _id: "690ed4c311dcf7f5740abb7b", name: "Express Wash" },
      price: 59,
      discount: { type: "percent" as const, value: 15 },
      isAvailable: true,
      _id: "v1",
      attributeValues: [],
    },
    {
      serviceId: { _id: "srv001", name: "Dry Cleaning" },
      price: 99,
      discount: { type: "flat" as const, value: 10 },
      isAvailable: true,
      _id: "v2",
      attributeValues: [],
    },
    {
      serviceId: { _id: "srv002", name: "Premium Ironing" },
      price: 29,
      discount: { type: "percent" as const, value: 5 },
      isAvailable: true,
      _id: "v3",
      attributeValues: [],
    },
    {
      serviceId: { _id: "srv003", name: "Fabric Softener" },
      price: 19,
      discount: { type: "flat" as const, value: 2 },
      isAvailable: false,
      _id: "v4",
      attributeValues: [],
    },
  ],
  id: "69135cf83162fa4052120bc2",
};

const ProductDetailsScreen = () => {
  if (!selectedProduct) {
    return (
      <View className="flex-1 items-center justify-center bg-foreground">
        <Ionicons name="alert-circle-outline" size={48} color="#9CA3AF" />
        <Text className="mt-4 text-gray-500">Product not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background px-4 gap-4">
      {/* Header */}
      <View className=" pb-4 flex-row items-center border-b border-border">
        <Pressable onPress={() => goBack()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-100">
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </Pressable>
        <Text className="flex-1 text-center text-lg font-semibold text-heading">Product Details</Text>
        <Pressable className="w-10 h-10 items-center justify-center rounded-full bg-gray-100">
          <Ionicons name="heart-outline" size={24} color="#374151" />
        </Pressable>
      </View>
      <ProductSelection />
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
