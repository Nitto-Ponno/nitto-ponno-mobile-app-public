// OTPVerificationModal.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NText from "../global/NText"; // your custom text component
import { showErrorToast, showSuccessAlert } from "@/utils/commonFunction";
import { AuthApi } from "@/services/api/authApi";
import { handleErrorResponse } from "@/utils/handlers";

interface OTPVerificationModalProps {
  visible: boolean;
  contact: string; // email or phone number
  method: "email" | "phone";
  onClose: () => void;
  onVerifySuccess: () => void;
}

const OTPVerificationModal: React.FC<OTPVerificationModalProps> = ({ visible, contact, method, onClose, onVerifySuccess }) => {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Resend countdown
  useEffect(() => {
    if (resendTimer > 0 && visible) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer, visible]);

  const handleSendCode = async () => {
    setLoading(true);
    try {
      const payload =
        method === "email"
          ? {
              email: contact,
            }
          : { phoneNumber: contact };
      const response = await AuthApi.sendVerification(payload);
      if (response.success) {
        setStep(2);
      }
    } catch (error: any) {
      handleErrorResponse(error, "Send");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      return showErrorToast({ message: "Please enter complete 6-digit code" });
    }

    try {
      const payload = {
        otp: otp,
        email: method === "email" ? contact : undefined,
        phoneNumber: method === "phone" ? contact : undefined,
      };

      const response = await AuthApi.verifyOtp(payload);

      if (response.success) {
        showSuccessAlert({ message: "Verification successful!" });
        onVerifySuccess();
        onClose();
      }
    } catch (error: any) {
      handleErrorResponse(error, "OTP Verification");
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    setIsResending(true);
    try {
      const payload = {
        email: method === "email" ? contact : undefined,
        phoneNumber: method === "phone" ? contact : undefined,
      };
      await AuthApi.sendVerification(payload);
      showSuccessAlert({ message: `New code sent to your ${method === "email" ? "email" : "phone"}` });
      setResendTimer(60);
    } catch (error: any) {
      handleErrorResponse(error, "Resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  const maskedContact =
    method === "email" ? contact.replace(/^(.{2})(.*)(@.*)$/, "$1****$3") : contact.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2");

  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          <TouchableOpacity className="absolute inset-0" activeOpacity={1} onPress={onClose} />

          <View className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            {/* Header */}
            <View className="bg-primary px-6 py-10">
              <View className="items-center">
                <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
                  <Ionicons name="shield-checkmark" size={40} color="white" />
                </View>
                <Text className="text-white text-2xl font-bold text-center">Verify your {method === "email" ? "Email" : "Phone"}</Text>
              </View>
            </View>

            {/* Body */}
            {step === 1 && (
              <View className="bg-surface h-14 border justify-center items-center border-outline rounded-lg m-4 mb-0">
                <NText className="font-semibold text-lg">{contact}</NText>
              </View>
            )}
            {step === 2 && (
              <View className="px-4">
                <NText className="text-gray-600 text-center text-base">We've sent a 6-digit verification code to</NText>
                <NText className="text-primary font-bold text-center text-lg mt-2">{maskedContact}</NText>
                <View className="h-14 bg-surface border rounded-lg border-outline">
                  <TextInput
                    keyboardType={"number-pad"}
                    maxLength={6}
                    autoComplete={"sms-otp"}
                    className="flex-1 text-center text-3xl text-heading font-bold tracking-[20px]"
                    value={otp}
                    onChangeText={setOtp}
                  />
                </View>
                <View className="flex-row justify-center items-center my-4">
                  <NText className="text-gray-500">Didn't receive code? </NText>
                  <TouchableOpacity onPress={handleResend} disabled={resendTimer > 0 || isResending}>
                    <NText className={`font-semibold ${resendTimer > 0 ? "text-gray-400" : "text-primary"}`}>
                      {isResending ? "Sending..." : resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
                    </NText>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Action Buttons */}
            <View className="px-4 pb-8 gap-4">
              {step === 1 ? (
                <TouchableOpacity
                  onPress={handleSendCode}
                  disabled={!method || loading}
                  className={`mt-3 py-4 rounded-lg flex-row items-center justify-center ${
                    method && !loading ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <NText className={`text-lg font-bold ${method ? "text-white" : "text-gray-500"}`}>Send Verification Code</NText>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleVerify}
                  disabled={otp.length !== 6}
                  className={`py-4 rounded-2xl items-center justify-center ${otp.length === 6 ? "bg-primary" : "bg-gray-300"}`}
                >
                  <NText className={`text-lg font-bold ${otp.length === 6 ? "text-white" : "text-gray-500"}`}>Verify & Continue</NText>
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={onClose} className="py-3 items-center">
                <NText className="text-gray-500 text-base">Cancel</NText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default OTPVerificationModal;
