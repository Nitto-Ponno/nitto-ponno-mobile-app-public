import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector, useAppDispatch } from "@/store";
import { CartItem } from "@/services/types/cartTypes";
import { removeCartItem, toggleSelectCartItem, updateQuantity } from "@/store/reducer/cartReducer";
import { calculateVariationPrice } from "@/utils/commonFunction";

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const { cartItems, selectedCart } = useAppSelector((state) => state.cart);

  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedCart?.includes(item?.productId))
      .reduce((sum, item) => sum + item.subtotal, 0)
      .toFixed(2);
  };

  const renderItem = ({ item }: { item: CartItem }) => {
    const isSelected = selectedCart?.includes(item.productId);

    return (
      <View className="bg-white p-4 mb-3 rounded-xl shadow-sm border border-gray-200">
        {/* Select Checkbox */}
        <TouchableOpacity onPress={() => dispatch(toggleSelectCartItem(item.productId))} className="flex-row items-center mb-2">
          <View className={`w-5 h-5 rounded-full border mr-2 ${isSelected ? "bg-primary border-primary" : "border-gray-400"}`} />
          <Text className="font-semibold">{item.productName}</Text>
        </TouchableOpacity>

        {/* Attributes */}
        <View className="ml-7 mb-2">
          {item.attributeValues.map((a) => (
            <Text key={a.attributeId} className="text-gray-500 text-sm">
              {a.attributeName}: {a.optionId}
            </Text>
          ))}
        </View>

        {/* Variation List */}
        <View className="ml-7 space-y-1">
          {item.variations.map((v) => {
            const final = calculateVariationPrice(v);

            return (
              <View key={v._id} className="flex-row justify-between items-center">
                <Text className="text-gray-700">{v.serviceId.name}</Text>

                <View className="flex-row items-center">
                  <Text className="text-gray-700 font-semibold mr-2">₹{final.toFixed(2)}</Text>

                  {v.discount && (
                    <Text className="text-xs text-green-600">
                      {v.discount.type === "percent" ? `${v.discount.value}% off` : `₹${v.discount.value} off`}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Quantity Controller */}
        <View className="flex-row items-center justify-between mt-4">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => dispatch(updateQuantity({ productId: item.productId, type: "dec" }))}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
            >
              <Text className="text-lg">-</Text>
            </TouchableOpacity>

            <Text className="mx-4 text-lg font-semibold">{item.quantity}</Text>

            <TouchableOpacity
              onPress={() => dispatch(updateQuantity({ productId: item.productId, type: "inc" }))}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
            >
              <Text className="text-lg">+</Text>
            </TouchableOpacity>
          </View>

          {/* Remove */}
          <TouchableOpacity onPress={() => dispatch(removeCartItem(item.productId))} className="px-3 py-1 bg-red-100 rounded-lg">
            <Text className="text-red-600 font-semibold">Remove</Text>
          </TouchableOpacity>
        </View>

        {/* Subtotal */}
        <Text className="text-right mt-3 font-bold text-primary">Subtotal: ₹{item.subtotal.toFixed(2)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-3">
      <Text className="text-2xl font-bold mt-2 mb-4">Your Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* Summary Section */}
      <View className="absolute bottom-0 left-0 right-0 p-5 bg-white shadow-lg border-t">
        <Text className="text-lg font-semibold mb-2">Order Summary</Text>

        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Selected Items</Text>
          <Text>{selectedCart?.length}</Text>
        </View>

        <View className="flex-row justify-between mb-4">
          <Text className="font-semibold text-primary">Total Amount</Text>
          <Text className="text-primary font-bold text-xl">₹{calculateTotal()}</Text>
        </View>

        <TouchableOpacity className="bg-primary p-4 rounded-xl items-center">
          <Text className="text-white font-bold text-lg">Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
