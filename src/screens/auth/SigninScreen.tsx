import OTPVerificationModal from "@/components/auth/OTPVerificationModal";
import AppInput from "@/components/global/AppInput";
import { Colors } from "@/context/ThemeProvider";
import { AuthApi } from "@/services/api/authApi";
import { setAccessToken, setRefreshToken, setUser } from "@/store/reducer/authReducer";
import { showToast } from "@/utils/commonFunction";
import { handleErrorResponse } from "@/utils/handlers";
import { goBack, navigate, navigateToStack } from "@/utils/NavigationUtils";
import { ArrowLeftCircle } from "lucide-react-native";
import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";
import NText from "@/components/global/NText";

type SignInScreenProps = object;

const SignInScreen: React.FC<SignInScreenProps> = () => {
  const [email, setEmail] = useState("shuvajitmaitra+3@gmail.com");
  const [password, setPassword] = useState("Shuvajit#1");
  const dispatch = useDispatch();
  const [verificationModalVisible, setVerificationModalVisible] = useState(false);

  const handleSignIn = async () => {
    try {
      const response = await AuthApi.customerLogin({ email, password });
      if (response.success && !response.data.isVerified) {
        setVerificationModalVisible(!verificationModalVisible);
        return;
      }
      if (response.success) {
        dispatch(setAccessToken(response.data.accessToken));
        dispatch(setRefreshToken(response.data.refreshToken));
        dispatch(setUser(response.data.user));
        goBack();
        showToast({ message: "Logged in successfully" });
        const myData = await AuthApi.getMyData();
        dispatch(setUser(myData.data));
      }
    } catch (error: any) {
      handleErrorResponse(error, "Sign in");
    }
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic here
    showToast({ message: "Coming soon..." });
  };

  const handleForgotPassword = () => {
    navigate("ForgotPassword");
  };

  const handleSignUp = () => {
    navigate("Signup");
  };

  return (
    <SafeAreaView className="bg-background flex-1">
      <ArrowLeftCircle onPress={goBack} size={40} color={Colors.heading} style={{ marginLeft: 16 }} className="bg-slate-800" />

      {/* Wrap everything in KeyboardAvoidingView */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Different behavior based on platform
        style={{ flex: 1 }}
      >
        <ScrollView className="flex-1 px-6" keyboardShouldPersistTaps="handled">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1">
              <OTPVerificationModal
                visible={verificationModalVisible}
                contact={email}
                method={"email"}
                onClose={() => setVerificationModalVisible(false)}
                onVerifySuccess={() => {
                  navigate("Signin");
                }}
              />
              {/* Header */}
              <View className="mb-12 mt-12">
                <NText className="text-heading mb-4 text-center text-4xl font-bold">Sign In</NText>
                <NText className="text-body text-center text-base leading-6">Welcome back! Please sign in to your account</NText>
              </View>

              {/* Form */}
              <View className="gap-4">
                {/* Email Field */}
                <AppInput
                  label="Email Address"
                  value={email}
                  setValue={setEmail}
                  variant="email"
                  placeholder="Enter your email"
                  isRequired
                />

                {/* Password Field */}
                <AppInput
                  label="Password"
                  value={password}
                  setValue={setPassword}
                  variant="password"
                  placeholder="Enter password"
                  isRequired
                  error={password.length > 0 && password.length < 6 ? "Password must be at least 6 characters" : undefined}
                />
              </View>

              {/* Forgot Password Link */}
              <View className="my-4">
                <TouchableOpacity onPress={handleForgotPassword}>
                  <NText className="text-heading text-right text-base underline">Forgot Password?</NText>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <TouchableOpacity className="mb-4 rounded-lg bg-green-500 py-4" onPress={handleSignIn}>
                <NText className="text-center text-lg font-semibold text-white">Sign In</NText>
              </TouchableOpacity>

              {/* Google Sign In Button */}
              <TouchableOpacity
                className="mb-8 flex-row items-center justify-center gap-3 rounded-lg bg-blue-600 py-4"
                onPress={handleGoogleSignIn}
              >
                <AntDesign name="google" size={24} color="white" />
                <NText className="text-lg font-bold text-white">Sign In With Google</NText>
              </TouchableOpacity>

              {/* Divider */}
              <View className="mb-8 flex-row items-center">
                <View className="bg-body h-px flex-1" />
                <NText className="text-body mx-4 text-sm">OR</NText>
                <View className="bg-body h-px flex-1" />
              </View>

              {/* Bottom Sign Up Link */}
              <View className="mb-8 flex-row items-center justify-center">
                <NText className="text-body text-base">Don&apos;t have an account? </NText>
                <TouchableOpacity onPress={handleSignUp}>
                  <NText className="text-base font-semibold text-green-600">Sign Up</NText>
                </TouchableOpacity>
              </View>

              {/* Additional Options */}
              <View className="mb-8 items-center">
                <TouchableOpacity
                  onPress={() => {
                    navigateToStack("HomeStack", { screen: "Home" });
                  }}
                  className="mb-4"
                >
                  <NText className="text-body text-base">Continue as Guest</NText>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;
