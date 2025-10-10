import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "@/screens/cart/CartScreen";

const Stack = createNativeStackNavigator<CartStackParamList>();
const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Cart">
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default CartStack;
export type CartStackParamList = {
  Cart: undefined;
};
