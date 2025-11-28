import ForgotPasswordVerifyModal from "@/components/auth/ForgotPasswordVerifyModal";
import AppInput from "@/components/global/AppInput";
import NText from "@/components/global/NText";
import { Colors } from "@/context/ThemeProvider";
import { AuthApi } from "@/services/api/authApi";
import { handleErrorResponse } from "@/utils/handlers";
import { goBack, navigate } from "@/utils/NavigationUtils";
import { ArrowLeftCircle } from "lucide-react-native";
import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPasswordScreen = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<"email" | "phoneNumber">("email"); // 'email' or 'phone'
  const [modalVisible, setModalVisible] = useState(false);
  const handleSendOTP = async () => {
    // // Handle send OTP logic here
    // const payload = selectedMethod ==='email'? {email: emailOrPhone}: {phone: emailOrPhone}
    const payload = { email: emailOrPhone };
    console.log("payload", JSON.stringify(payload, null, 2));
    try {
      const res = await AuthApi.forgotPassword(payload);
      console.log("res", JSON.stringify(res, null, 2));
      if (res.success) {
        // navigate("OTPVerification");
        setModalVisible(!modalVisible);
      }
    } catch (error: any) {
      console.log("error.response.data", JSON.stringify(error.response.data, null, 2));
      handleErrorResponse(error, "Forgot Password");
    }

    console.log("Send OTP pressed", { emailOrPhone, selectedMethod });
  };

  const handleBackToSignIn = () => {
    navigate("Signin");
  };

  const handleMethodChange = (method: "email" | "phoneNumber") => {
    setSelectedMethod(method);
    setEmailOrPhone(""); // Clear input when switching methods
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ArrowLeftCircle onPress={goBack} size={40} color={Colors.heading} style={{ marginLeft: 16 }} className="bg-slate-800" />
      <ScrollView className="flex-1 px-6">
        <ForgotPasswordVerifyModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(!modalVisible);
          }}
          method={selectedMethod as "email" | "phoneNumber"}
          contact={emailOrPhone}
        />
        {/* Header */}
        <View className="mt-16 mb-12">
          <NText className="text-4xl font-bold text-heading text-center mb-4">Forgot Password</NText>
          <NText className="text-body text-center text-base leading-6 px-4">
            Enter your email or phone number to receive an OTP for password reset
          </NText>
        </View>

        {/* Method Selection */}
        <View className="mb-8">
          <NText className="text-heading text-base mb-4 font-medium">Choose reset method</NText>
          <View className="flex-row gap-4">
            <TouchableOpacity
              className={`flex-1 py-3 px-4 rounded-lg border ${
                selectedMethod === "email" ? "bg-surface border-green-500" : "border-outline"
              }`}
              onPress={() => handleMethodChange("email")}
            >
              <View className="flex-row items-center justify-center">
                <NText className="text-lg mr-2">✉️</NText>
                <NText className={`text-base font-medium ${selectedMethod === "email" ? "text-green-600" : "text-heading"}`}>Email</NText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 py-3 px-4 rounded-lg border ${
                selectedMethod === "phoneNumber" ? "bg-surface border-green-500" : " border-outline"
              }`}
              onPress={() => handleMethodChange("phoneNumber")}
            >
              <View className="flex-row items-center justify-center">
                <NText className="text-lg mr-2">📱</NText>
                <NText className={`text-base font-medium ${selectedMethod === "phoneNumber" ? "text-green-600" : "text-heading"}`}>
                  Phone
                </NText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Field */}
        <AppInput
          label={selectedMethod === "email" ? "Email Address" : "Phone Number"}
          placeholder={selectedMethod === "email" ? "Enter your email address" : "Enter your phone number"}
          value={emailOrPhone}
          setValue={setEmailOrPhone}
          variant={selectedMethod === "email" ? "email" : "phone"}
          isRequired
        />

        {/* Info Message */}
        <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-8">
          <View className="flex-row">
            <NText className="text-blue-500 text-lg mr-3">ℹ️</NText>
            <NText className="text-blue-700 text-sm leading-5 flex-1">
              We'll send a 6-digit verification code to your {selectedMethod === "email" ? "email address" : "phone number"}. Please check
              your {selectedMethod === "email" ? "inbox and spam folder" : "messages"}.
            </NText>
          </View>
        </View>

        {/* Send OTP Button */}
        <TouchableOpacity className="bg-green-500 rounded-lg py-4 mb-6" onPress={handleSendOTP}>
          <NText className="text-white text-center text-lg font-semibold">Send OTP</NText>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1 h-px bg-gray-300" />
          <NText className="mx-4 text-body text-sm">OR</NText>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Back to Sign In */}
        <View className="flex-row justify-center items-center mb-8">
          <NText className="text-body text-base">Remember your password? </NText>
          <TouchableOpacity onPress={handleBackToSignIn}>
            <NText className="text-green-600 text-base font-semibold">Sign In</NText>
          </TouchableOpacity>
        </View>

        {/* Additional Help */}
        <View className="items-center mb-8">
          <TouchableOpacity>
            <NText className="text-gray-600 text-base underline">Need help? Contact Support</NText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
