import GContainer from "@/components/global/GContainer";
import NText from "@/components/global/NText";
import { Colors } from "@/context/ThemeProvider";
import { goBack, navigate } from "@/utils/NavigationUtils";
import { ArrowLeftCircle, Mail, Phone } from "lucide-react-native";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";

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
    <GContainer>
      <ArrowLeftCircle onPress={goBack} size={40} color={Colors.heading} style={{ marginLeft: 16 }} className="bg-slate-800" />
      <ScrollView className="flex-1 px-6">
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
                selectedMethod === "email" ? "bg-foreground border-green-500" : "border-border"
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
                selectedMethod === "phone" ? "bg-foreground border-green-500" : " border-border"
              }`}
              onPress={() => handleMethodChange("phone")}
            >
              <View className="flex-row items-center justify-center">
                <NText className="text-lg mr-2">📱</NText>
                <NText className={`text-base font-medium ${selectedMethod === "phone" ? "text-green-600" : "text-heading"}`}>Phone</NText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Field */}
        <View className="mb-8">
          <NText className="text-heading text-base mb-3 font-medium">{selectedMethod === "email" ? "Email Address" : "Phone Number"}</NText>
          <View className="relative border border-border rounded-lg px-4 justify-center h-14 pl-12">
            <TextInput
              className="text-base flex-1 "
              placeholder={selectedMethod === "email" ? "Enter your email address" : "Enter your phone number"}
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              keyboardType={selectedMethod === "email" ? "email-address" : "phone-pad"}
              autoCapitalize="none"
              placeholderTextColor={Colors.body}
            />
            <View className="absolute left-4 top-4">
              {selectedMethod === "email" ? <Mail size={20} color={Colors.body} /> : <Phone size={20} color={Colors.body} />}
            </View>
          </View>
        </View>

        {/* Info Message */}
        <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
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
    </GContainer>
  );
};

export default ForgotPasswordScreen;
