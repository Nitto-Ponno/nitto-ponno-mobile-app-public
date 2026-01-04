import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTabNavigator from "./BottomTabNavigator";
import ProductDetailsScreen from "@/screens/product/ProductDetailsScreen";
import CheckoutScreen from "@/screens/cart/CheckoutScreen";
import SignInScreen from "@/screens/auth/SigninScreen";
import SignUpScreen from "@/screens/auth/SignupScreen";
import ForgotPasswordScreen from "@/screens/auth/ForgotPasswordScreen";
import OTPVerificationScreen from "@/screens/auth/OTPVerificationScreen";
import SetNewPasswordScreen from "@/screens/auth/SetNewPasswordScreen";
import ChangePasswordScreen from "@/screens/auth/ChangePasswordScreen";
import WishlistScreen from "@/screens/home/WishlistScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Signin" component={SignInScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="SetNewPassword" component={SetNewPasswordScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
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
  Wishlist: undefined;
};
