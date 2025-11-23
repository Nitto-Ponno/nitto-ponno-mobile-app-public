import OTPVerificationModal from "@/components/auth/OTPVerificationModal";
import AppInput from "@/components/global/AppInput";
import { Colors } from "@/context/ThemeProvider";
import { AuthApi } from "@/services/api/authApi";
import { tokenStorage } from "@/services/storage";
import { setAccessToken, setRefreshToken, setUser } from "@/store/reducer/authReducer";
import { showSuccessAlert } from "@/utils/commonFunction";
import { handleErrorResponse } from "@/utils/handlers";
import { goBack, navigate } from "@/utils/NavigationUtils";
import { ArrowLeftCircle, Eye, EyeClosed, LockIcon, Mail } from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const SignInScreen = () => {
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
        tokenStorage.setAccessToken(response.data.accessToken);
        tokenStorage.setRefreshToken(response.data.refreshToken);
        dispatch(setAccessToken(response.data.accessToken));
        dispatch(setRefreshToken(response.data.refreshToken));
        dispatch(setUser(response.data.user));
        showSuccessAlert({ message: "Logged in successfully" });
        const myData = await AuthApi.getMyData();
        console.log("myData", JSON.stringify(myData, null, 2));
        console.log("response.data", JSON.stringify(response.data, null, 2));
      }
    } catch (error: any) {
      handleErrorResponse(error, "Sign in");
    }
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic here
    console.log("Google sign in pressed");
  };

  const handleForgotPassword = () => {
    navigate("ForgotPassword");
  };

  const handleSignUp = () => {
    navigate("Signup");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
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
              <View className="mt-12 mb-12">
                <Text className="text-4xl font-bold text-heading text-center mb-4">Sign In</Text>
                <Text className="text-body text-center text-base leading-6">Welcome back! Please sign in to your account</Text>
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
                  <Text className="text-heading text-right text-base underline">Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <TouchableOpacity className="bg-green-500 rounded-lg py-4 mb-4" onPress={handleSignIn}>
                <Text className="text-white text-center text-lg font-semibold">Sign In</Text>
              </TouchableOpacity>

              {/* Google Sign In Button */}
              <TouchableOpacity
                className="bg-blue-600 rounded-lg py-4 mb-8 flex-row items-center justify-center"
                onPress={handleGoogleSignIn}
              >
                <Text className="text-white text-2xl mr-3">G</Text>
                <Text className="text-white text-lg font-bold">Sign In With Google</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center mb-8">
                <View className="flex-1 h-px bg-body" />
                <Text className="mx-4 text-body text-sm">OR</Text>
                <View className="flex-1 h-px bg-body" />
              </View>

              {/* Bottom Sign Up Link */}
              <View className="flex-row justify-center items-center mb-8">
                <Text className="text-body text-base">Don't have an account? </Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text className="text-green-600 text-base font-semibold">Sign Up</Text>
                </TouchableOpacity>
              </View>

              {/* Additional Options */}
              <View className="items-center mb-8">
                <TouchableOpacity className="mb-4">
                  <Text className="text-body text-base">Continue as Guest</Text>
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
