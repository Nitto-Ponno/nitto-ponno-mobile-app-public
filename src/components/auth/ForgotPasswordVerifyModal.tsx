// ForgotPasswordVerifyModal.tsx
import React, { useState, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { handleErrorResponse } from "@/utils/handlers";
import { AuthApi } from "@/services/api/authApi";
import { showSuccessAlert, showToast } from "@/utils/commonFunction";
import { resetAndNavigate } from "@/utils/NavigationUtils";
import AppInput from "../global/AppInput";

interface ForgotPasswordVerifyModalProps {
  visible: boolean;
  onClose: () => void;
  method: "email" | "phoneNumber";
  contact: string;
}

const ForgotPasswordVerifyModal: React.FC<ForgotPasswordVerifyModalProps> = ({ visible, onClose, method, contact }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  const inputs = useRef<(TextInput | null)[]>([]);

  const maskedContact =
    method === "email" ? contact.replace(/^(.{2}).*(@.*)$/, "$1••••$2") : contact.replace(/(\d{3})\d{4}(\d{3})/, "$1••••$2");

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    if (otp.length !== 6) {
      return showToast({ message: "Please enter the full 6-digit code" });
    }
    setStep(2);
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      return showToast({ message: "Passwords do not match" });
    }
    if (newPassword.length < 6) {
      return showToast({ message: "Password must be at least 6 characters" });
    }

    setLoading(true);
    try {
      const payload = {
        email: method === "email" ? contact : "",
        // phoneNumber: method === "phoneNumber" ? contact : undefined,
        otp: otp,
        password: newPassword,
      };

      const response = await AuthApi.resetPassword(payload);

      if (response.success) {
        showSuccessAlert({ message: "Password reset successfully!" });
        onClose();
        resetAndNavigate("Signin");
      }
    } catch (error: any) {
      handleErrorResponse(error, "Reset Password");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setStep(1);
    onClose();
  };

  // Auto-focus first input when modal opens
  React.useEffect(() => {
    if (visible && step === 1) {
      setTimeout(() => inputs.current[0]?.focus(), 300);
    }
  }, [visible, step]);

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={handleClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <View className="flex-1 bg-black/50 justify-end">
          <TouchableOpacity className="flex-1" activeOpacity={1} onPress={handleClose} />

          <View className="bg-white rounded-t-3xl shadow-2xl overflow-hidden max-h-[85%]">
            {/* Header */}
            <View className="px-6 pt-6 pb-4 border-b border-gray-200">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-2xl font-bold text-gray-900">{step === 1 ? "Verify Code" : "Reset Password"}</Text>
                  {step === 1 && <Text className="text-sm text-gray-600 mt-1">Enter the code sent to {maskedContact}</Text>}
                </View>
                <TouchableOpacity onPress={handleClose} className="p-2">
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} bounces={false}>
              <View className="p-6">
                {/* STEP 1: OTP Input */}
                {step === 1 && (
                  <View>
                    <View className="mb-6">
                      <AppInput label="OTP Code" value={otp} setValue={setOtp} variant="otp" placeholder="000000" maxLength={6} />
                    </View>

                    <TouchableOpacity
                      onPress={handleContinue}
                      disabled={otp.length !== 6}
                      className={`py-4 rounded-xl items-center ${otp.length === 6 ? "bg-primary" : "bg-gray-300"}`}
                    >
                      <Text className={`text-lg font-semibold ${otp.length === 6 ? "text-white" : "text-gray-500"}`}>Continue</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="mt-4 py-3 items-center">
                      <Text className="text-primary font-medium">Resend Code</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* STEP 2: New Password */}
                {step === 2 && (
                  <View>
                    <View className="gap-5">
                      <AppInput
                        label="New Password"
                        value={newPassword}
                        setValue={setNewPassword}
                        variant="password"
                        placeholder="Enter new password"
                        isRequired
                      />
                      <AppInput
                        label="Confirm Password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        variant="password"
                        placeholder="Confirm new password"
                        isRequired
                      />
                    </View>

                    {newPassword.length > 0 && newPassword.length < 6 && (
                      <Text className="text-red-500 text-sm mt-2">Password must be at least 6 characters</Text>
                    )}

                    {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                      <Text className="text-red-500 text-sm mt-2">Passwords do not match</Text>
                    )}

                    <TouchableOpacity
                      onPress={handleResetPassword}
                      disabled={loading || newPassword.length < 6 || newPassword !== confirmPassword}
                      className={`py-4 rounded-xl items-center mt-8 flex-row justify-center ${
                        loading || newPassword.length < 6 || newPassword !== confirmPassword ? "bg-gray-300" : "bg-green-600"
                      }`}
                    >
                      {loading ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <Text className="text-white text-lg font-semibold">Reset Password</Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setStep(1)} className="mt-4 py-3 items-center">
                      <Text className="text-primary font-medium">Back to Verification</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>

            {/* Safe Area Bottom Padding */}
            <View className="h-8" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ForgotPasswordVerifyModal;
