import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTabNavigator from "./BottomTabNavigator";
import SignUpScreen from "@/screens/auth/SignupScreen";
import SignInScreen from "@/screens/auth/SigninScreen";
import OTPVerificationScreen from "@/screens/auth/OTPVerificationScreen";
import SetNewPasswordScreen from "@/screens/auth/SetNewPasswordScreen";
import ChangePasswordScreen from "@/screens/auth/ChangePasswordScreen";
import ForgotPasswordScreen from "@/screens/auth/ForgotPasswordScreen";
import { useAppSelector } from "@/store";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
  const { token } = useAppSelector((state) => state.auth);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      {!token && (
        <>
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Signin" component={SignInScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
          <Stack.Screen name="SetNewPassword" component={SetNewPasswordScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
export type RootStackParamList = {
  BottomTabNavigator: undefined;
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
};
