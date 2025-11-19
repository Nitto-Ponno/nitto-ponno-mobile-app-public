// ForgotPasswordVerifyModal.tsx
import React, { useState, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { handleErrorResponse } from "@/utils/handlers";
import { AuthApi } from "@/services/api/authApi";
import { showSuccessAlert, showToast } from "@/utils/commonFunction";
import { navigate, resetAndNavigate } from "@/utils/NavigationUtils";

interface ForgotPasswordVerifyModalProps {
  visible: boolean;
  onClose: () => void;
  method: "email" | "phoneNumber";
  contact: string;
}

const ForgotPasswordVerifyModal: React.FC<ForgotPasswordVerifyModalProps> = ({ visible, onClose, method, contact }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  const inputs = useRef<(TextInput | null)[]>([]);

  const maskedContact =
    method === "email" ? contact.replace(/^(.{2}).*(@.*)$/, "$1••••$2") : contact.replace(/(\d{3})\d{4}(\d{3})/, "$1••••$2");

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const code = otp.join("");
    if (code.length !== 6) {
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
        otp: otp.join(""),
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

  const resetForm = () => {
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setStep(1);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Auto-focus first input when modal opens
  React.useEffect(() => {
    if (visible && step === 1) {
      setTimeout(() => inputs.current[0]?.focus(), 300);
    }
  }, [visible, step]);

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <TouchableOpacity className="absolute inset-0" activeOpacity={1} onPress={onClose} />

          <View className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            {/* Header */}
            <View className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 items-center">
              <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
                <Ionicons name={step === 1 ? "key-outline" : "lock-closed"} size={40} color="white" />
              </View>
              <Text className="text-white text-2xl font-bold">{step === 1 ? "Verify Your Identity" : "Create New Password"}</Text>
              <Text className="text-white/80 text-center mt-2">
                {step === 1 ? `Enter the 6-digit code sent to ${maskedContact}` : "Your new password must be different from previous ones"}
              </Text>
            </View>

            <View className="p-8">
              {/* STEP 1: OTP Input */}
              {step === 1 && (
                <>
                  <View className="flex-row justify-center gap-3 my-8">
                    {otp.map((digit, index) => (
                      <TextInput
                        key={index}
                        ref={(ref) => {
                          inputs.current[index] = ref;
                        }}
                        className="w-14 h-14 bg-gray-50 border-2 border-gray-300 rounded-2xl text-center text-2xl font-bold text-indigo-600"
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={(v) => handleOtpChange(v, index)}
                        onKeyPress={(e) => handleOtpKeyPress(e, index)}
                      />
                    ))}
                  </View>

                  <TouchableOpacity onPress={handleContinue} className="bg-indigo-600 py-4 rounded-2xl items-center mt-6">
                    <Text className="text-white text-lg font-bold">Continue</Text>
                  </TouchableOpacity>
                </>
              )}

              {/* STEP 2: New Password */}
              {step === 2 && (
                <>
                  <View className="space-y-4">
                    <View className="relative">
                      <TextInput
                        placeholder="New Password"
                        secureTextEntry={!showPassword}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        className="border-2 border-gray-300 rounded-2xl px-5 py-4 pr-12 text-base"
                      />
                      <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-4 top-5">
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#666" />
                      </TouchableOpacity>
                    </View>

                    <View className="relative">
                      <TextInput
                        placeholder="Confirm New Password"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        className="border-2 border-gray-300 rounded-2xl px-5 py-4 pr-12 text-base"
                      />
                      <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-5">
                        <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#666" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={handleResetPassword}
                    disabled={loading}
                    className="bg-green-600 py-4 rounded-2xl items-center mt-8 flex-row justify-center"
                  >
                    {loading ? <ActivityIndicator color="white" /> : <Text className="text-white text-lg font-bold">Reset Password</Text>}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setStep(1)} className="mt-4 py-3 items-center">
                    <Text className="text-indigo-600 font-medium">← Back to OTP</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/* Close Button */}
            <View className="pb-6 px-8">
              <TouchableOpacity onPress={onClose} className="items-center">
                <Text className="text-gray-500 text-base">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ForgotPasswordVerifyModal;
