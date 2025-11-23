import { Modal, Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import React, { useMemo, useState } from "react";
import { dispatch, useAppSelector } from "@/store";
import NText from "../global/NText";
import { setSelectionModal } from "@/store/reducer/productReducer";
import { X, XCircle } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { calculateDiscountedPrice } from "@/utils/commonFunction";
import { AttributeValue } from "@/services/types/productTypes";
import { cn } from "@/utils/cn";

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
    },
    {
      serviceId: { _id: "srv001", name: "Dry Cleaning" },
      price: 99,
      discount: { type: "flat" as const, value: 10 },
      isAvailable: true,
      _id: "v2",
    },
    {
      serviceId: { _id: "srv002", name: "Premium Ironing" },
      price: 29,
      discount: { type: "percent" as const, value: 5 },
      isAvailable: true,
      _id: "v3",
    },
    {
      serviceId: { _id: "srv003", name: "Fabric Softener" },
      price: 19,
      discount: { type: "flat" as const, value: 2 },
      isAvailable: false,
      _id: "v4",
    },
  ],
  attributeValues: [
    {
      attributeId: "a1",
      attributeName: "baby",
      optionId: "o1",
    },
    {
      attributeId: "a2",
      attributeName: "men",
      optionId: "o2",
    },
    {
      attributeId: "a3",
      attributeName: "women",
      optionId: "o3",
    },
  ],

  id: "69135cf83162fa4052120bc2",
};

const SelectionModal = () => {
  const { selectionModal } = useAppSelector((state) => state.product);

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<AttributeValue[] | null>(null);
  const [quantity, setQuantity] = useState(1);

  const toggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) => (prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]));
  };
  const toggleAttributes = (param: AttributeValue) => {
    const isAvailable = selectedAttributes?.find((i) => i.attributeId === param.attributeId);
    const data = isAvailable
      ? selectedAttributes?.filter((i) => i.attributeId !== param.attributeId)
      : [...(selectedAttributes || []), param];
    console.log("data", JSON.stringify(data, null, 2));
    data && setSelectedAttributes(data);
    // setSelectedServiceIds((prev) => (prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]));
  };

  const selectedVariations = useMemo(() => {
    if (!selectedProduct?.variations) return [];
    return selectedProduct.variations.filter((v: Variation) => selectedServiceIds.includes(v.serviceId._id));
  }, [selectedServiceIds]);

  console.log("selectedVariations", JSON.stringify(selectedVariations, null, 2));

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

    const items = {
      productId: selectedProduct._id,
      productName: selectedProduct.name,
      variations: selectedVariations,
      // serviceName: String,
      quantity: quantity,
      // unitPrice: { type: Number, required: true },
      attributeValues: selectedAttributes,
      subtotal: orderSummary.finalTotal,
    };
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
    console.log("cartItem", JSON.stringify(cartItem, null, 2));
  };
  return (
    <Modal visible={selectionModal} transparent statusBarTranslucent={true}>
      <View className="flex-1 bg-black/20 justify-end">
        <Pressable
          className="flex-1"
          onPress={() => {
            dispatch(setSelectionModal(false));
          }}
        />
        <View className="max-h-[90%] bg-background pb-6 rounded-tl-3xl rounded-tr-3xl p-4">
          <TouchableOpacity
            onPress={() => {
              dispatch(setSelectionModal(false));
            }}
            className="absolute top-3 right-3"
          >
            <X size={30} className="text-heading" />
          </TouchableOpacity>
          <View className="">
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex-1 gap-4">
                {/* Product Image */}

                {/* Quantity Selector */}
                <View className="gap-2">
                  <NText className="text-lg font-semibold text-heading">Quantity</NText>
                  <View className="flex-row items-center">
                    <Pressable
                      onPress={() => handleQuantityChange(-1)}
                      className="w-12 h-12 rounded-xl bg-gray-100 items-center justify-center"
                    >
                      <Ionicons name="remove" size={24} color="#374151" />
                    </Pressable>
                    <NText className="mx-6 text-xl font-bold text-heading min-w-[40px] text-center">{quantity}</NText>
                    <Pressable
                      onPress={() => handleQuantityChange(1)}
                      className="w-12 h-12 rounded-xl bg-primary items-center justify-center"
                    >
                      <Ionicons name="add" size={24} color="white" />
                    </Pressable>
                  </View>
                </View>
                {/* Service Selection */}
                <View className="">
                  <View className="flex-row items-center justify-between mb-4">
                    <NText className="text-lg font-semibold text-heading">Select Services</NText>
                    <NText className="text-sm text-primary">{selectedServiceIds.length} selected</NText>
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
                                <NText
                                  className={`text-base font-semibold ${
                                    isSelected ? "text-primary" : isAvailable ? "text-heading" : "text-gray-400"
                                  }`}
                                >
                                  {service.name}
                                </NText>
                              </View>

                              {!isAvailable && (
                                <View className="ml-9 mt-1 flex-row items-center">
                                  <XCircle size={14} color="#EF4444" />
                                  <NText className="text-xs text-red-500 ml-1">Currently Unavailable</NText>
                                </View>
                              )}
                            </View>

                            {/* Pricing */}
                            {pricing && isAvailable && (
                              <View className="items-end">
                                {pricing.discountAmt > 0 && (
                                  <View className="bg-green-500 px-2 py-0.5 rounded mb-1">
                                    <NText className="text-xs font-bold text-white">{pricing.discountLabel}</NText>
                                  </View>
                                )}
                                <NText className={`text-lg font-bold ${isSelected ? "text-primary" : "text-heading"}`}>
                                  ${pricing.final.toFixed(2)}
                                </NText>
                                {pricing.discountAmt > 0 && (
                                  <NText className="text-sm text-gray-400 line-through">${pricing.original.toFixed(2)}</NText>
                                )}
                              </View>
                            )}
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>

                  {selectedProduct.attributeValues && (
                    <View className="flex-row items-center justify-between my-4">
                      <NText className="text-lg font-semibold text-heading">Select Category</NText>
                      {selectedAttributes && selectedAttributes?.length > 0 && (
                        <NText className="text-sm text-primary">{selectedAttributes.length} selected</NText>
                      )}
                    </View>
                  )}

                  <View className="flex-row gap-3">
                    {selectedProduct.attributeValues.map((i) => (
                      <Pressable
                        onPress={() => {
                          toggleAttributes(i);
                        }}
                        className={cn(
                          "px-4 h-12 justify-center items-center bg-foreground border border-border rounded-lg",
                          selectedAttributes?.find((a) => a.attributeId === i.attributeId)?.attributeId &&
                            "bg-green-200/20 border border-green200/50"
                        )}
                        key={i.attributeId}
                      >
                        <NText>{i.attributeName}</NText>
                      </Pressable>
                    ))}
                  </View>
                </View>

                {/* Order Summary */}
                {selectedServiceIds.length > 0 && (
                  <View className="mb-24">
                    <NText className="text-lg font-semibold text-heading mb-4">Order Summary</NText>

                    {/* Selected Services */}
                    <View className="bg-foreground border border-border rounded-xl p-4 mb-4">
                      {orderSummary.items.map((item, idx) => (
                        <View
                          key={idx}
                          className={`flex-row justify-between py-2 ${idx !== orderSummary.items.length - 1 ? "border-b border-gray-200" : ""}`}
                        >
                          <NText className="text-gray-600 flex-1">{item.name}</NText>
                          <View className="flex-row items-center">
                            {item.discountAmt > 0 && (
                              <NText className="text-gray-400 line-through text-sm mr-2">${item.original.toFixed(2)}</NText>
                            )}
                            <NText className="text-heading font-medium">${item.final.toFixed(2)}</NText>
                          </View>
                        </View>
                      ))}
                    </View>

                    {/* Price Breakdown */}
                    <View className="border-t border-border pt-4">
                      <View className="flex-row justify-between mb-2">
                        <NText className="text-gray-500">Subtotal</NText>
                        <NText className="text-gray-700">${orderSummary.subtotal.toFixed(2)}</NText>
                      </View>

                      {orderSummary.totalDiscount > 0 && (
                        <View className="flex-row justify-between mb-2">
                          <NText className="text-green-600">Total Discount</NText>
                          <NText className="text-green-600 font-medium">-${orderSummary.totalDiscount.toFixed(2)}</NText>
                        </View>
                      )}

                      <View className="flex-row justify-between mb-2">
                        <NText className="text-gray-500">Quantity</NText>
                        <NText className="text-gray-700">x{quantity}</NText>
                      </View>

                      <View className="flex-row justify-between pt-3 mt-2 border-t border-dashed border-gray-300">
                        <NText className="text-lg font-bold text-heading">Grand Total</NText>
                        <NText className="text-xl font-bold text-primary">${orderSummary.finalTotal.toFixed(2)}</NText>
                      </View>
                    </View>
                  </View>
                )}

                {/* Empty Selection State */}
                {selectedServiceIds.length === 0 && (
                  <View className="bg-foreground mt-2 py-8 mb-36 items-center">
                    <Ionicons name="cart-outline" size={48} color="#D1D5DB" />
                    <NText className="mt-3 text-gray-400 text-center">Select services above to see order summary</NText>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
          <View className="absolute bottom-0 left-0 right-0 px-4 bg-foreground border-t border-gray-200 py-4 pb-8 shadow-lg">
            <View className="flex-row items-center justify-between">
              <View>
                <NText className="text-gray-500 text-sm">
                  {selectedServiceIds.length} service{selectedServiceIds.length !== 1 ? "s" : ""} • {quantity} item
                  {quantity !== 1 ? "s" : ""}
                </NText>
                <NText className="text-2xl font-bold text-heading">${orderSummary.finalTotal.toFixed(2)}</NText>
              </View>
              <Pressable
                onPress={handleAddToCart}
                disabled={selectedServiceIds.length === 0}
                className={`px-8 py-4 rounded-xl flex-row items-center ${selectedServiceIds.length > 0 ? "bg-primary" : "bg-gray-300"}`}
              >
                <Ionicons name="cart" size={20} color="white" />
                <NText className="text-white font-semibold text-lg ml-2">Add to Cart</NText>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectionModal;
