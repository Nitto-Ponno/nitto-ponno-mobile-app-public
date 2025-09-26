import { navigate } from "@/utils/NavigationUtils";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";

const ForgotPasswordScreen = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("email"); // 'email' or 'phone'

  const handleSendOTP = () => {
    // Handle send OTP logic here
    navigate("OTPVerification");

    console.log("Send OTP pressed", { emailOrPhone, selectedMethod });
  };

  const handleBackToSignIn = () => {
    navigate("Signin");
  };

  const handleMethodChange = (method: React.SetStateAction<string>) => {
    setSelectedMethod(method);
    setEmailOrPhone(""); // Clear input when switching methods
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="mt-16 mb-12">
          <Text className="text-4xl font-bold text-black text-center mb-4">Forgot Password</Text>
          <Text className="text-gray-500 text-center text-base leading-6 px-4">
            Enter your email or phone number to receive an OTP for password reset
          </Text>
        </View>

        {/* Method Selection */}
        <View className="mb-8">
          <Text className="text-gray-700 text-base mb-4 font-medium">Choose reset method</Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity
              className={`flex-1 py-3 px-4 rounded-lg border ${
                selectedMethod === "email" ? "bg-green-50 border-green-500" : "bg-gray-50 border-gray-200"
              }`}
              onPress={() => handleMethodChange("email")}
            >
              <View className="flex-row items-center justify-center">
                <Text className="text-lg mr-2">✉️</Text>
                <Text className={`text-base font-medium ${selectedMethod === "email" ? "text-green-600" : "text-gray-700"}`}>Email</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 py-3 px-4 rounded-lg border ${
                selectedMethod === "phone" ? "bg-green-50 border-green-500" : "bg-gray-50 border-gray-200"
              }`}
              onPress={() => handleMethodChange("phone")}
            >
              <View className="flex-row items-center justify-center">
                <Text className="text-lg mr-2">📱</Text>
                <Text className={`text-base font-medium ${selectedMethod === "phone" ? "text-green-600" : "text-gray-700"}`}>Phone</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Field */}
        <View className="mb-8">
          <Text className="text-gray-700 text-base mb-3 font-medium">{selectedMethod === "email" ? "Email Address" : "Phone Number"}</Text>
          <View className="relative">
            <TextInput
              className="border border-gray-200 rounded-lg px-4 py-4 pl-12 text-base bg-gray-50"
              placeholder={selectedMethod === "email" ? "Enter your email address" : "Enter your phone number"}
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              keyboardType={selectedMethod === "email" ? "email-address" : "phone-pad"}
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
            />
            <View className="absolute left-4 top-4">
              <Text className="text-gray-400 text-lg">{selectedMethod === "email" ? "✉️" : "📱"}</Text>
            </View>
          </View>
        </View>

        {/* Info Message */}
        <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <View className="flex-row">
            <Text className="text-blue-500 text-lg mr-3">ℹ️</Text>
            <Text className="text-blue-700 text-sm leading-5 flex-1">
              We'll send a 6-digit verification code to your {selectedMethod === "email" ? "email address" : "phone number"}. Please check
              your {selectedMethod === "email" ? "inbox and spam folder" : "messages"}.
            </Text>
          </View>
        </View>

        {/* Send OTP Button */}
        <TouchableOpacity className="bg-green-500 rounded-lg py-4 mb-6" onPress={handleSendOTP}>
          <Text className="text-white text-center text-lg font-semibold">Send OTP</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500 text-sm">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Back to Sign In */}
        <View className="flex-row justify-center items-center mb-8">
          <Text className="text-gray-500 text-base">Remember your password? </Text>
          <TouchableOpacity onPress={handleBackToSignIn}>
            <Text className="text-green-600 text-base font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Help */}
        <View className="items-center mb-8">
          <TouchableOpacity>
            <Text className="text-gray-600 text-base underline">Need help? Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
