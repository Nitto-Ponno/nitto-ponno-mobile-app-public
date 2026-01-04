import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTabNavigator from "./BottomTabNavigator";
import ProductDetailsScreen from "@/screens/product/ProductDetailsScreen";
import CheckoutScreen from "@/screens/cart/CheckoutScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
export type RootStackParamList = {
  BottomTabNavigator: undefined;
  ProductDetails: undefined;
  HomeStack: undefined;
  ProfileStack: undefined;
  Signup: undefined;
  Signin: undefined;
  ForgotPassword: undefined;
  OTPVerification: {
    verificationMethod?: string;
    contactInfo?: string;
    onVerifySuccess?: (otp: string) => void;
    onResendOTP?: () => void;
    onChangeMethod?: () => void;
    onContactSupport?: () => void;
  };
  SetNewPassword: undefined;
  ChangePassword: undefined;
  Auth: undefined;
  Checkout: undefined;
};
