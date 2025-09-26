import NText from "@/components/global/NText";
import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native";

type PasswordStrength = "weak" | "medium" | "strong";
type FlowType = "settings" | "reset";

interface ChangePasswordScreenProps {
  flowType?: FlowType;
  onPasswordChanged?: (success: boolean) => void;
  onCancel?: () => void;
  userEmail?: string;
}

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ flowType = "settings", onPasswordChanged, onCancel, userEmail }) => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>("weak");
  const [validation, setValidation] = useState<PasswordValidation>({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Real-time password validation
  useEffect(() => {
    const newValidation: PasswordValidation = {
      minLength: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      hasNumber: /\d/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    };

    setValidation(newValidation);

    // Calculate password strength
    const validCount = Object.values(newValidation).filter(Boolean).length;
    if (validCount <= 2) {
      setPasswordStrength("weak");
    } else if (validCount <= 4) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }

    // Clear errors when user starts typing
    if (errors.newPassword && newPassword) {
      setErrors((prev) => ({ ...prev, newPassword: undefined }));
    }
  }, [newPassword, errors.newPassword]);

  // Clear confirm password error when passwords match
  useEffect(() => {
    if (errors.confirmPassword && newPassword === confirmPassword && confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
  }, [newPassword, confirmPassword, errors.confirmPassword]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (flowType === "settings" && !currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (!Object.values(validation).every(Boolean)) {
      newErrors.newPassword = "Password does not meet all requirements";
    } else if (flowType === "settings" && newPassword === currentPassword) {
      newErrors.newPassword = "New password must be different from current password";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success
      Alert.alert("Success", "Your password has been updated successfully.", [
        {
          text: "OK",
          onPress: () => {
            if (onPasswordChanged) {
              onPasswordChanged(true);
            }
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to update password. Please try again.");
      if (onPasswordChanged) {
        onPasswordChanged(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = (): void => {
    if (onCancel) {
      onCancel();
    } else {
      console.log("Cancel password change");
    }
  };

  const getStrengthColor = (): string => {
    switch (passwordStrength) {
      case "weak":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStrengthWidth = (): string => {
    switch (passwordStrength) {
      case "weak":
        return "w-1/3";
      case "medium":
        return "w-2/3";
      case "strong":
        return "w-full";
      default:
        return "w-0";
    }
  };

  const ValidationItem: React.FC<{ isValid: boolean; text: string }> = ({ isValid, text }) => (
    <View className="flex-row items-center mb-1">
      <NText className={`mr-2 ${isValid ? "text-green-500" : "text-gray-400"}`}>{isValid ? "✓" : "○"}</NText>
      <NText className={`text-sm ${isValid ? "text-green-600" : "text-gray-500"}`}>{text}</NText>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="mt-16 mb-12">
          <NText className="text-4xl font-bold text-black text-center mb-4">
            {flowType === "reset" ? "Set New Password" : "Change Password"}
          </NText>
          <NText className="text-gray-500 text-center text-base leading-6 px-4">
            {flowType === "reset" ? "Create a new secure password for your account" : "Update your password to keep your account secure"}
          </NText>
          {flowType === "reset" && userEmail && (
            <NText className="text-green-600 text-center text-base font-medium mt-2">{userEmail}</NText>
          )}
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Current Password - Only for settings flow */}
          {flowType === "settings" && (
            <View>
              <NText className="text-gray-700 text-base mb-3 font-medium">Current Password</NText>
              <View className="relative">
                <TextInput
                  className={`border rounded-lg px-4 py-4 pl-12 text-base bg-gray-50 ${
                    errors.currentPassword ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChangeText={(text) => {
                    setCurrentPassword(text);
                    if (errors.currentPassword) {
                      setErrors((prev) => ({ ...prev, currentPassword: undefined }));
                    }
                  }}
                  secureTextEntry={!showCurrentPassword}
                  placeholderTextColor="#9CA3AF"
                />
                <View className="absolute left-4 top-4">
                  <NText className="text-gray-400 text-lg">🔒</NText>
                </View>
                <TouchableOpacity className="absolute right-4 top-4" onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                  <NText className="text-gray-400 text-lg">{showCurrentPassword ? "🙈" : "👁️"}</NText>
                </TouchableOpacity>
              </View>
              {errors.currentPassword && <NText className="text-red-500 text-sm mt-1">{errors.currentPassword}</NText>}
            </View>
          )}

          {/* New Password */}
          <View>
            <NText className="text-gray-700 text-base mb-3 font-medium">New Password</NText>
            <View className="relative">
              <TextInput
                className={`border rounded-lg px-4 py-4 pl-12 text-base bg-gray-50 ${
                  errors.newPassword ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                placeholderTextColor="#9CA3AF"
              />
              <View className="absolute left-4 top-4">
                <NText className="text-gray-400 text-lg">🔑</NText>
              </View>
              <TouchableOpacity className="absolute right-4 top-4" onPress={() => setShowNewPassword(!showNewPassword)}>
                <NText className="text-gray-400 text-lg">{showNewPassword ? "🙈" : "👁️"}</NText>
              </TouchableOpacity>
            </View>
            {errors.newPassword && <NText className="text-red-500 text-sm mt-1">{errors.newPassword}</NText>}
          </View>

          {/* Password Strength Indicator */}
          {newPassword && (
            <View className="bg-gray-50 rounded-lg p-4">
              <View className="flex-row items-center justify-between mb-2">
                <NText className="text-gray-700 text-sm font-medium">Password Strength</NText>
                <NText
                  className={`text-sm font-semibold capitalize ${
                    passwordStrength === "weak" ? "text-red-500" : passwordStrength === "medium" ? "text-yellow-500" : "text-green-500"
                  }`}
                >
                  {passwordStrength}
                </NText>
              </View>
              <View className="h-2 bg-gray-200 rounded-full mb-3">
                <View className={`h-full rounded-full ${getStrengthColor()} ${getStrengthWidth()}`} />
              </View>
              <ValidationItem isValid={validation.minLength} text="At least 8 characters" />
              <ValidationItem isValid={validation.hasUppercase} text="One uppercase letter" />
              <ValidationItem isValid={validation.hasLowercase} text="One lowercase letter" />
              <ValidationItem isValid={validation.hasNumber} text="One number" />
              <ValidationItem isValid={validation.hasSpecialChar} text="One special character" />
            </View>
          )}

          {/* Confirm Password */}
          <View>
            <NText className="text-gray-700 text-base mb-3 font-medium">Confirm New Password</NText>
            <View className="relative">
              <TextInput
                className={`border rounded-lg px-4 py-4 pl-12 text-base bg-gray-50 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor="#9CA3AF"
              />
              <View className="absolute left-4 top-4">
                <NText className="text-gray-400 text-lg">🔒</NText>
              </View>
              <TouchableOpacity className="absolute right-4 top-4" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <NText className="text-gray-400 text-lg">{showConfirmPassword ? "🙈" : "👁️"}</NText>
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && <NText className="text-red-500 text-sm mt-1">{errors.confirmPassword}</NText>}
          </View>
        </View>

        {/* Buttons */}
        <View className="mt-8 mb-8">
          {/* Main Action Button */}
          <TouchableOpacity
            className={`rounded-lg py-4 mb-4 ${isLoading ? "bg-gray-400" : "bg-green-500"}`}
            onPress={handleChangePassword}
            disabled={isLoading}
          >
            <NText className="text-white text-center text-lg font-semibold">{isLoading ? "Updating..." : "Update Password"}</NText>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity className="border border-gray-300 rounded-lg py-4" onPress={handleCancel} disabled={isLoading}>
            <NText className="text-gray-700 text-center text-lg font-semibold">Cancel</NText>
          </TouchableOpacity>
        </View>

        {/* Security Tips */}
        <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <View className="flex-row">
            <NText className="text-blue-500 text-lg mr-3">💡</NText>
            <View className="flex-1">
              <NText className="text-blue-700 text-sm font-medium mb-1">Security Tips:</NText>
              <NText className="text-blue-700 text-sm leading-5">
                • Use a unique password you haven't used elsewhere{"\n"}• Consider using a password manager{"\n"}• Avoid personal
                information in passwords
              </NText>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
