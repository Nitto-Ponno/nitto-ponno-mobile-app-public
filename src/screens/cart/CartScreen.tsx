import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector, useAppDispatch } from "@/store";
import { removeCartItem, toggleSelectCartItem, updateQuantity } from "@/store/reducer/cartReducer";
import EmptyCart from "@/components/cart/EmptyCart";
import CartItemCard from "@/components/cart/CartItemCard";
import OrderSummary from "@/components/cart/OrderSummary";
import { goBack, navigateProtected } from "@/utils/NavigationUtils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CartStackParamList } from "@/navigation/CartStack";
import { BackButton } from "@/components/common/TitleHeader";
type Props = NativeStackScreenProps<CartStackParamList, "Cart">;
const CartScreen = ({ route, navigation }: Props) => {
  const from = route.params?.from;
  const dispatch = useAppDispatch();
  const { cartItems, selectedCart } = useAppSelector((state) => state.cart);
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      navigation.setParams({ from: undefined });
    });

    return unsubscribe;
  }, [navigation]);

  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedCart?.includes(item?.cartId))
      .reduce((sum, item) => sum + item.subtotal, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    navigateProtected(navigation, Boolean(accessToken), "Checkout");
  };

  return (
    <SafeAreaView className="bg-background flex-1">
      {/* Header */}
      <View className="border-border flex-row items-center gap-3 border-b px-4 pb-3">
        {from === "ProductDetails" && (
          <BackButton
            onPress={() => {
              goBack();
            }}
          />
        )}
        <View className="">
          <Text className="text-heading text-2xl font-bold">Shopping Cart</Text>
          <Text className="text-body mt-1 text-sm">
            {cartItems?.length} {cartItems?.length === 1 ? "item" : "items"} in cart
          </Text>
        </View>
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
