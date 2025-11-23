import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/context/ThemeProvider";
import { calculateDiscountedPrice } from "@/utils/commonFunction";

interface Service {
  _id: string;
  name: string;
}

interface Discount {
  type: "percent" | "flat";
  value: number;
}

interface Variation {
  serviceId: { _id: string; name: string };
  attributeValues: { attributeId: { name: string }; value: string }[];
  price: number;
  discount?: Discount;
  isAvailable: boolean;
  _id: string;
}

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
  const navigation = useNavigation();
  // const { selectedProduct } = useAppSelector((state) => state.product);

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const toggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) => (prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]));
  };

  const selectedVariations = useMemo(() => {
    if (!selectedProduct?.variations) return [];
    return selectedProduct.variations.filter((v: Variation) => selectedServiceIds.includes(v.serviceId._id));
  }, [selectedServiceIds]);

  const orderSummary = useMemo(() => {
    let subtotal = 0;
    let totalDiscount = 0;
    const items = selectedVariations.map((v: Variation) => {
      const calc = calculateDiscountedPrice(v.price, v.discount);
      subtotal += calc.original;
      totalDiscount += calc.discountAmt;
      return { name: v.serviceId.name, ...calc };
    });
    const finalTotal = (subtotal - totalDiscount) * quantity;
    return { items, subtotal, totalDiscount, finalTotal, quantity };
  }, [selectedVariations, quantity]);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (selectedServiceIds.length === 0) return;
    const cartItem = {
      productId: selectedProduct?.id,
      productName: selectedProduct?.name,
      services: selectedVariations.map((v: Variation) => ({
        serviceId: v.serviceId._id,
        serviceName: v.serviceId.name,
        variationId: v._id,
        unitPrice: calculateDiscountedPrice(v.price, v.discount).final,
      })),
      quantity,
      totalPrice: orderSummary.finalTotal,
    };
    console.log("Adding to cart:", cartItem);
  };

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
        <Pressable onPress={() => navigation.goBack()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-100">
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </Pressable>
        <Text className="flex-1 text-center text-lg font-semibold text-heading">Product Details</Text>
        <Pressable className="w-10 h-10 items-center justify-center rounded-full bg-gray-100">
          <Ionicons name="heart-outline" size={24} color="#374151" />
        </Pressable>
      </View>
      <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-1 gap-4">
            {/* Product Image */}
            <View className="p-6 items-center">
              <View className="w-40 h-40 bg-green-50 rounded-2xl items-center justify-center">
                <Ionicons name="shirt-outline" size={72} color={Colors.primary} />
              </View>
            </View>

            {/* Product Info */}
            <View className="mt-2">
              <Text className="text-2xl font-bold text-heading">{selectedProduct.name}</Text>
              <Text className=" text-body">{selectedProduct.description}</Text>
            </View>
            {/* Quantity Selector */}
            <View className="gap-2">
              <Text className="text-lg font-semibold text-heading">Quantity</Text>
              <View className="flex-row items-center">
                <Pressable
                  onPress={() => handleQuantityChange(-1)}
                  className="w-12 h-12 rounded-xl bg-gray-100 items-center justify-center"
                >
                  <Ionicons name="remove" size={24} color="#374151" />
                </Pressable>
                <Text className="mx-6 text-xl font-bold text-heading min-w-[40px] text-center">{quantity}</Text>
                <Pressable onPress={() => handleQuantityChange(1)} className="w-12 h-12 rounded-xl bg-primary items-center justify-center">
                  <Ionicons name="add" size={24} color="white" />
                </Pressable>
              </View>
            </View>
            {/* Service Selection */}
            <View className="">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-semibold text-heading">Select Services</Text>
                <Text className="text-sm text-primary">{selectedServiceIds.length} selected</Text>
              </View>

              <View className="gap-3">
                {selectedProduct.services?.map((service: Service) => {
                  const isSelected = selectedServiceIds.includes(service._id);
                  const variation = selectedProduct.variations?.find((v: Variation) => v.serviceId._id === service._id);
                  const isAvailable = variation?.isAvailable ?? false;
                  const pricing = variation ? calculateDiscountedPrice(variation.price, variation.discount) : null;

                  return (
                    <Pressable
                      key={service._id}
                      onPress={() => isAvailable && toggleService(service._id)}
                      disabled={!isAvailable}
                      className={`p-4 rounded-2xl border-2 ${
                        isSelected
                          ? "border-primary bg-green-200/20"
                          : isAvailable
                            ? "border-gray-200 bg-foreground"
                            : "border-border bg-background"
                      }`}
                    >
                      <View className="flex-row items-start justify-between">
                        <View className="flex-1">
                          <View className="flex-row items-center">
                            {/* Checkbox */}
                            <View
                              className={`w-6 h-6 rounded-md border-2 items-center justify-center mr-3 ${
                                isSelected ? "bg-primary border-primary" : "border-gray-300 bg-foreground"
                              }`}
                            >
                              {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
                            </View>
                            <Text
                              className={`text-base font-semibold ${
                                isSelected ? "text-primary" : isAvailable ? "text-heading" : "text-gray-400"
                              }`}
                            >
                              {service.name}
                            </Text>
                          </View>

                          {!isAvailable && (
                            <View className="ml-9 mt-1 flex-row items-center">
                              <Ionicons name="close-circle" size={14} color="#EF4444" />
                              <Text className="text-xs text-red-500 ml-1">Currently Unavailable</Text>
                            </View>
                          )}
                        </View>

                        {/* Pricing */}
                        {pricing && isAvailable && (
                          <View className="items-end">
                            {pricing.discountAmt > 0 && (
                              <View className="bg-green-500 px-2 py-0.5 rounded mb-1">
                                <Text className="text-xs font-bold text-white">{pricing.discountLabel}</Text>
                              </View>
                            )}
                            <Text className={`text-lg font-bold ${isSelected ? "text-primary" : "text-heading"}`}>
                              ${pricing.final.toFixed(2)}
                            </Text>
                            {pricing.discountAmt > 0 && (
                              <Text className="text-sm text-gray-400 line-through">${pricing.original.toFixed(2)}</Text>
                            )}
                          </View>
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Order Summary */}
            {selectedServiceIds.length > 0 && (
              <View className="mb-20">
                <Text className="text-lg font-semibold text-heading mb-4">Order Summary</Text>

                {/* Selected Services */}
                <View className="bg-foreground border border-border rounded-xl p-4 mb-4">
                  {orderSummary.items.map((item, idx) => (
                    <View
                      key={idx}
                      className={`flex-row justify-between py-2 ${idx !== orderSummary.items.length - 1 ? "border-b border-gray-200" : ""}`}
                    >
                      <Text className="text-gray-600 flex-1">{item.name}</Text>
                      <View className="flex-row items-center">
                        {item.discountAmt > 0 && (
                          <Text className="text-gray-400 line-through text-sm mr-2">${item.original.toFixed(2)}</Text>
                        )}
                        <Text className="text-heading font-medium">${item.final.toFixed(2)}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Price Breakdown */}
                <View className="border-t border-border pt-4">
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-500">Subtotal</Text>
                    <Text className="text-gray-700">${orderSummary.subtotal.toFixed(2)}</Text>
                  </View>

                  {orderSummary.totalDiscount > 0 && (
                    <View className="flex-row justify-between mb-2">
                      <Text className="text-green-600">Total Discount</Text>
                      <Text className="text-green-600 font-medium">-${orderSummary.totalDiscount.toFixed(2)}</Text>
                    </View>
                  )}

                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-500">Quantity</Text>
                    <Text className="text-gray-700">x{quantity}</Text>
                  </View>

                  <View className="flex-row justify-between pt-3 mt-2 border-t border-dashed border-gray-300">
                    <Text className="text-lg font-bold text-heading">Grand Total</Text>
                    <Text className="text-xl font-bold text-primary">${orderSummary.finalTotal.toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Empty Selection State */}
            {selectedServiceIds.length === 0 && (
              <View className="bg-foreground mt-2 py-8 mb-36 items-center">
                <Ionicons name="cart-outline" size={48} color="#D1D5DB" />
                <Text className="mt-3 text-gray-400 text-center">Select services above to see order summary</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 px-4 bg-foreground border-t border-gray-200 py-4 pb-8 shadow-lg">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-gray-500 text-sm">
              {selectedServiceIds.length} service{selectedServiceIds.length !== 1 ? "s" : ""} • {quantity} item{quantity !== 1 ? "s" : ""}
            </Text>
            <Text className="text-2xl font-bold text-heading">${orderSummary.finalTotal.toFixed(2)}</Text>
          </View>
          <Pressable
            onPress={handleAddToCart}
            disabled={selectedServiceIds.length === 0}
            className={`px-8 py-4 rounded-xl flex-row items-center ${selectedServiceIds.length > 0 ? "bg-primary" : "bg-gray-300"}`}
          >
            <Ionicons name="cart" size={20} color="white" />
            <Text className="text-white font-semibold text-lg ml-2">Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
