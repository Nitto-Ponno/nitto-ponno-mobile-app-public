import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native";

type PasswordStrength = "weak" | "medium" | "strong";

interface SetNewPasswordScreenProps {
  userIdentifier?: string; // Email or phone number that was verified
  verificationMethod?: "email" | "phone";
  onPasswordSet?: (success: boolean) => void;
  onBackToLogin?: () => void;
}

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

interface FormErrors {
  newPassword?: string;
  confirmPassword?: string;
}

const SetNewPasswordScreen: React.FC<SetNewPasswordScreenProps> = ({
  userIdentifier = "",
  verificationMethod = "email",
  onPasswordSet,
  onBackToLogin,
}) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
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

    // Clear password error when user starts typing
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

    if (!newPassword.trim()) {
      newErrors.newPassword = "Password is required";
    } else if (!Object.values(validation).every(Boolean)) {
      newErrors.newPassword = "Password does not meet all requirements";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSetPassword = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call to set new password
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success
      Alert.alert("Password Reset Successful", "Your password has been reset successfully. Please log in with your new password.", [
        {
          text: "Go to Login",
          onPress: () => {
            if (onPasswordSet) {
              onPasswordSet(true);
            }
            handleBackToLogin();
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to set new password. Please try again.", [
        {
          text: "OK",
          onPress: () => {
            if (onPasswordSet) {
              onPasswordSet(false);
            }
          },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = (): void => {
    if (onBackToLogin) {
      onBackToLogin();
    } else {
      console.log("Navigate back to login");
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

  const maskUserIdentifier = (identifier: string): string => {
    if (!identifier) return "";

    if (verificationMethod === "email") {
      const [username, domain] = identifier.split("@");
      if (!username || !domain) return identifier;
      return `${username.slice(0, 2)}***@${domain}`;
    } else {
      return `***-***-${identifier.slice(-4)}`;
    }
  };

  const ValidationItem: React.FC<{ isValid: boolean; text: string }> = ({ isValid, text }) => (
    <View className="flex-row items-center mb-1">
      <Text className={`mr-2 text-sm ${isValid ? "text-green-500" : "text-gray-400"}`}>{isValid ? "✓" : "○"}</Text>
      <Text className={`text-sm ${isValid ? "text-green-600" : "text-gray-500"}`}>{text}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="mt-16 mb-12">
          <Text className="text-4xl font-bold text-black text-center mb-4">Set New Password</Text>
          <Text className="text-gray-500 text-center text-base leading-6 px-4">Create a strong password for your account</Text>
          {userIdentifier && (
            <Text className="text-green-600 text-center text-base font-medium mt-3">{maskUserIdentifier(userIdentifier)}</Text>
          )}
        </View>

        {/* Verification Success Badge */}
        <View className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <View className="flex-row items-center">
            <Text className="text-green-500 text-2xl mr-3">✅</Text>
            <View className="flex-1">
              <Text className="text-green-800 text-base font-semibold mb-1">Identity Verified</Text>
              <Text className="text-green-700 text-sm">
                Your {verificationMethod === "email" ? "email" : "phone number"} has been verified successfully.
              </Text>
            </View>
          </View>
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* New Password */}
          <View>
            <Text className="text-gray-700 text-base mb-3 font-medium">New Password</Text>
            <View className="relative">
              <TextInput
                className={`border rounded-lg px-4 py-4 pl-12 pr-12 text-base bg-gray-50 ${
                  errors.newPassword ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter your new password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
              />
              <View className="absolute left-4 top-4">
                <Text className="text-gray-400 text-lg">🔑</Text>
              </View>
              <TouchableOpacity className="absolute right-4 top-4" onPress={() => setShowNewPassword(!showNewPassword)}>
                <Text className="text-gray-400 text-lg">{showNewPassword ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
            {errors.newPassword && <Text className="text-red-500 text-sm mt-1">{errors.newPassword}</Text>}
          </View>

          {/* Password Requirements & Strength */}
          {newPassword.length > 0 && (
            <View className="bg-gray-50 rounded-lg p-4">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-700 text-base font-medium">Password Strength</Text>
                <Text
                  className={`text-sm font-bold uppercase tracking-wide ${
                    passwordStrength === "weak" ? "text-red-500" : passwordStrength === "medium" ? "text-yellow-500" : "text-green-500"
                  }`}
                >
                  {passwordStrength}
                </Text>
              </View>

              {/* Strength Bar */}
              <View className="h-2 bg-gray-200 rounded-full mb-4">
                <View className={`h-full rounded-full transition-all ${getStrengthColor()} ${getStrengthWidth()}`} />
              </View>

              {/* Requirements */}
              <Text className="text-gray-600 text-sm font-medium mb-2">Requirements:</Text>
              <ValidationItem isValid={validation.minLength} text="At least 8 characters" />
              <ValidationItem isValid={validation.hasUppercase} text="One uppercase letter (A-Z)" />
              <ValidationItem isValid={validation.hasLowercase} text="One lowercase letter (a-z)" />
              <ValidationItem isValid={validation.hasNumber} text="One number (0-9)" />
              <ValidationItem isValid={validation.hasSpecialChar} text="One special character (!@#$%...)" />
            </View>
          )}

          {/* Confirm Password */}
          <View>
            <Text className="text-gray-700 text-base mb-3 font-medium">Confirm New Password</Text>
            <View className="relative">
              <TextInput
                className={`border rounded-lg px-4 py-4 pl-12 pr-12 text-base bg-gray-50 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
              />
              <View className="absolute left-4 top-4">
                <Text className="text-gray-400 text-lg">🔒</Text>
              </View>
              <TouchableOpacity className="absolute right-4 top-4" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Text className="text-gray-400 text-lg">{showConfirmPassword ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && <Text className="text-red-500 text-sm mt-1">{errors.confirmPassword}</Text>}
            {!errors.confirmPassword && confirmPassword && newPassword === confirmPassword && (
              <Text className="text-green-500 text-sm mt-1 flex-row items-center">✓ Passwords match</Text>
            )}
          </View>
        </View>

        {/* Action Button */}
        <View className="mt-8 mb-6">
          <TouchableOpacity
            className={`rounded-lg py-4 ${isLoading ? "bg-gray-400" : "bg-green-500"}`}
            onPress={handleSetPassword}
            disabled={isLoading}
          >
            <Text className="text-white text-center text-lg font-semibold">{isLoading ? "Setting Password..." : "Set New Password"}</Text>
          </TouchableOpacity>
        </View>

        {/* Back to Login */}
        <View className="flex-row justify-center items-center mb-8">
          <TouchableOpacity onPress={handleBackToLogin}>
            <Text className="text-green-600 text-base font-semibold underline">Back to Login</Text>
          </TouchableOpacity>
        </View>

        {/* Security Info */}
        <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <View className="flex-row">
            <Text className="text-blue-500 text-lg mr-3">🛡️</Text>
            <View className="flex-1">
              <Text className="text-blue-700 text-sm font-medium mb-1">Security Tips:</Text>
              <Text className="text-blue-700 text-sm leading-5">
                • Use a unique password you haven't used elsewhere{"\n"}• Store it securely (consider a password manager){"\n"}• Don't share
                your password with anyone
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SetNewPasswordScreen;
