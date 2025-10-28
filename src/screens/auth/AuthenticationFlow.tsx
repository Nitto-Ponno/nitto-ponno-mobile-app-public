import React from "react";
import SignInScreen from "./SigninScreen";
import { useAppSelector } from "@/store";
import SignUpScreen from "./SignupScreen";
import { View } from "react-native";
import NText from "@/components/global/NText";
export type TAuthenticationScreens = "signin" | "signup" | "change_password" | "forgot_password" | "otp_verification" | "change_password";

const AuthenticationFlow = () => {
  const { authScreen } = useAppSelector((state) => state.auth);
  if (authScreen === "signup") {
    return <SignUpScreen />;
  }
  if (authScreen === "signin") {
    return <SignInScreen />;
  }
  return (
    <View>
      <NText>Nothing found</NText>
    </View>
  );
};

export default AuthenticationFlow;
