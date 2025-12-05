import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector, useAppDispatch } from "@/store";
import { removeCartItem, toggleSelectCartItem, updateQuantity } from "@/store/reducer/cartReducer";
import EmptyCart from "@/components/cart/EmptyCart";
import CartItemCard from "@/components/cart/CartItemCard";
import OrderSummary from "@/components/cart/OrderSummary";
import { navigate } from "@/utils/NavigationUtils";

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const { cartItems, selectedCart } = useAppSelector((state) => state.cart);
  console.log("cartItems", JSON.stringify(cartItems, null, 2));

  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedCart?.includes(item?.cartId))
      .reduce((sum, item) => sum + item.subtotal, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    navigate("Checkout");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 py-3 border-b border-border">
        <Text className="text-2xl font-bold text-heading">Shopping Cart</Text>
        <Text className="text-sm text-body mt-1">
          {cartItems?.length} {cartItems?.length === 1 ? "item" : "items"} in cart
        </Text>
      </View>

      {/* Cart Items List */}
      {cartItems?.length === 0 ? (
        <EmptyCart />
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.cartId}
          renderItem={({ item }) => (
            <CartItemCard
              item={item}
              isSelected={selectedCart?.includes(item.cartId)}
              onToggleSelect={() => dispatch(toggleSelectCartItem(item.cartId))}
              onUpdateQuantity={(type) => dispatch(updateQuantity({ cartId: item.cartId, type }))}
              onRemove={() => dispatch(removeCartItem(item.cartId))}
            />
          )}
          contentContainerStyle={{ paddingTop: 12, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Order Summary (Fixed at bottom) */}
      {cartItems?.length > 0 && (
        <View className="absolute bottom-0 left-0 right-0">
          <OrderSummary selectedCount={selectedCart?.length || 0} total={calculateTotal()} onCheckout={handleCheckout} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
