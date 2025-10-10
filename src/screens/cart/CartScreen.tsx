import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Minus, Plus, X, Tag, ShoppingBag } from "lucide-react-native";
import Images from "@/constants/Images";
import { Colors } from "@/context/ThemeProvider";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
      color: "Black",
    },
    {
      id: "2",
      name: "Smart Watch Series 5",
      price: 449.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
      size: "42mm",
      color: "Silver",
    },
    {
      id: "3",
      name: "Leather Laptop Bag",
      price: 129.99,
      originalPrice: 179.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 2,
      color: "Brown",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)));
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 500 ? 0 : 15.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const EmptyCart = () => (
    <View className="flex-1 bg-background items-center justify-center px-6">
      <View className="w-24 h-24 rounded-full bg-background items-center justify-center mb-6">
        <ShoppingBag size={40} color={Colors.heading} />
      </View>
      <Text className="text-heading text-2xl font-bold mb-2">Your cart is empty</Text>
      <Text className="text-body text-center mb-8">Add items to your cart to see them here</Text>
      <TouchableOpacity className="bg-background px-8 py-4 rounded-full">
        <Text className="text-heading font-semibold text-base">Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
          <TouchableOpacity>
            <ArrowLeft size={24} color={Colors.heading} />
          </TouchableOpacity>
          <Text className="text-heading text-lg font-semibold">Cart</Text>
          <View className="w-6" />
        </View>
        <EmptyCart />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
        <TouchableOpacity>
          <ArrowLeft size={24} color={Colors.heading} />
        </TouchableOpacity>
        <Text className="text-heading text-lg font-semibold">Cart ({cartItems.length})</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        <View className="px-6 py-6">
          {cartItems.map((item, index) => (
            <View
              key={item.id}
              className={`bg-foreground border border-border rounded-2xl p-4 ${index < cartItems.length - 1 ? "mb-4" : ""}`}
            >
              <View className="flex-row">
                {/* Product Image */}
                <View className="w-24 h-24 bg-neutral-900 rounded-xl overflow-hidden mr-4">
                  <Image source={Images?.LOGO} className="w-full h-full" resizeMode="cover" />
                </View>

                {/* Product Details */}
                <View className="flex-1">
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-heading font-semibold text-base flex-1 mr-2">{item.name}</Text>
                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                      <X size={20} color="#a1a1a1" />
                    </TouchableOpacity>
                  </View>

                  {/* Variants */}
                  {(item.size || item.color) && (
                    <View className="flex-row mb-3">
                      {item.size && <Text className="text-body text-sm mr-3">Size: {item.size}</Text>}
                      {item.color && <Text className="text-body text-sm">Color: {item.color}</Text>}
                    </View>
                  )}

                  {/* Price and Quantity */}
                  <View className="flex-row items-center justify-between">
                    <View>
                      <View className="flex-row items-center">
                        <Text className="text-heading font-bold text-lg">${item.price.toFixed(2)}</Text>
                        {item.originalPrice && (
                          <Text className="text-body text-sm line-through ml-2">${item.originalPrice.toFixed(2)}</Text>
                        )}
                      </View>
                    </View>

                    {/* Quantity Controls */}
                    <View className="flex-row items-center border-body border rounded-full">
                      <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} className="w-8 h-8 items-center justify-center">
                        <Minus size={16} color={Colors.heading} />
                      </TouchableOpacity>
                      <Text className="text-heading font-semibold px-4">{item.quantity}</Text>
                      <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} className="w-8 h-8 items-center justify-center">
                        <Plus size={16} color={Colors.heading} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Promo Code */}
        <View className="px-6 mb-6">
          <View className="bg-foreground border border-border rounded-2xl p-4">
            <View className="flex-row items-center mb-3">
              <Tag size={20} color={Colors.heading} />
              <Text className="text-heading font-semibold text-base ml-2">Promo Code</Text>
            </View>
            <View className="flex-row">
              <TextInput
                value={promoCode}
                onChangeText={setPromoCode}
                placeholder="Enter code"
                placeholderTextColor="#525252"
                className="flex-1 bg-background border border-neutral-800 rounded-xl px-4 py-3 text-heading mr-3"
                editable={!promoApplied}
              />
              <TouchableOpacity
                onPress={applyPromo}
                disabled={promoApplied}
                className={`px-6 py-3 rounded-xl border border-border ${promoApplied ? "bg-background" : "bg-primary"}`}
              >
                <Text className={`font-semibold ${promoApplied ? "text-body" : "text-white"}`}>{promoApplied ? "Applied" : "Apply"}</Text>
              </TouchableOpacity>
            </View>
            {promoApplied && <Text className="text-green-500 text-sm mt-2">10% discount applied!</Text>}
          </View>
        </View>

        {/* Order Summary */}
        <View className="px-6 mb-6">
          <View className="bg-foreground border border-border rounded-2xl p-6">
            <Text className="text-heading font-bold text-lg mb-4">Order Summary</Text>

            <View className="space-y-3">
              <View className="flex-row justify-between mb-3">
                <Text className="text-body">Subtotal</Text>
                <Text className="text-heading font-semibold">${subtotal.toFixed(2)}</Text>
              </View>

              {promoApplied && (
                <View className="flex-row justify-between mb-3">
                  <Text className="text-green-500">Discount (10%)</Text>
                  <Text className="text-green-500 font-semibold">-${discount.toFixed(2)}</Text>
                </View>
              )}

              <View className="flex-row justify-between mb-3">
                <Text className="text-body">Shipping</Text>
                <Text className="text-heading font-semibold">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</Text>
              </View>

              <View className="flex-row justify-between mb-4">
                <Text className="text-body">Tax (8%)</Text>
                <Text className="text-heading font-semibold">${tax.toFixed(2)}</Text>
              </View>

              <View className="border-t border-neutral-800 pt-4">
                <View className="flex-row justify-between">
                  <Text className="text-heading font-bold text-lg">Total</Text>
                  <Text className="text-heading font-bold text-xl">${total.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Free Shipping Banner */}
        {subtotal < 500 && (
          <View className="px-6 mb-6">
            <View className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
              <Text className="text-neutral-300 text-sm text-center">
                Add ${(500 - subtotal).toFixed(2)} more to get <Text className="text-heading font-semibold">FREE shipping</Text>
              </Text>
            </View>
          </View>
        )}

        <View className="h-32" />
      </ScrollView>

      {/* Checkout Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-background border-t border-border px-6 py-4">
        <TouchableOpacity className="bg-white rounded-full py-4 items-center">
          <Text className="text-black font-bold text-base">Proceed to Checkout • ${total.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
