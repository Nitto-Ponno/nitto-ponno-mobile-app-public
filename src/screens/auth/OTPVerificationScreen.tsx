import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

type VerificationMethod = "email" | "phone";

interface OTPVerificationScreenProps {
  verificationMethod?: VerificationMethod;
  contactInfo?: string;
  onVerifySuccess?: (otp: string) => void;
  onResendOTP?: () => void;
  onChangeMethod?: () => void;
  onContactSupport?: () => void;
}

const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  verificationMethod = "email",
  contactInfo = "user@example.com",
  onVerifySuccess,
  onResendOTP,
  onChangeMethod,
  onContactSupport,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleOtpChange = (value: string, index: number): void => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number): void => {
    // Handle backspace to focus previous input
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = (): void => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      Alert.alert("Error", "Please enter the complete 6-digit code");
      return;
    }

    if (onVerifySuccess) {
      onVerifySuccess(otpCode);
    } else {
      // Default behavior
      console.log("Verify OTP:", otpCode);
    }
  };

  const handleResendOTP = (): void => {
    if (!canResend) return;

    // Reset timer and resend OTP
    setTimer(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);

    if (onResendOTP) {
      onResendOTP();
    } else {
      console.log("Resend OTP");
    }

    // Focus first input
    inputRefs.current[0]?.focus();
  };

  const handleChangeMethod = (): void => {
    if (onChangeMethod) {
      onChangeMethod();
    } else {
      console.log("Change verification method");
    }
  };

  const handleContactSupport = (): void => {
    if (onContactSupport) {
      onContactSupport();
    } else {
      console.log("Contact support");
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const maskContactInfo = (contact: string): string => {
    if (verificationMethod === "email") {
      const [username, domain] = contact.split("@");
      if (!username || !domain) return contact;
      return `${username.slice(0, 2)}***@${domain}`;
    } else {
      return `***-***-${contact.slice(-4)}`;
    }
  };

  const setInputRef = (ref: TextInput | null, index: number): void => {
    inputRefs.current[index] = ref;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="mt-16 mb-12">
          <Text className="text-4xl font-bold text-black text-center mb-4">Verify Code</Text>
          <Text className="text-gray-500 text-center text-base leading-6 px-4">
            Enter the 6-digit code sent to your {verificationMethod === "email" ? "email" : "phone number"}
          </Text>
          <Text className="text-green-600 text-center text-base font-medium mt-2">{maskContactInfo(contactInfo)}</Text>
        </View>

        {/* OTP Input Fields */}
        <View className="mb-8">
          <Text className="text-gray-700 text-base mb-4 font-medium text-center">Verification Code</Text>
          <View className="flex-row justify-between px-4">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => setInputRef(ref, index)}
                className={`w-12 h-12 border-2 rounded-lg text-center text-xl font-bold ${
                  digit ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50"
                }`}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
                accessible={true}
                accessibilityLabel={`OTP digit ${index + 1}`}
                accessibilityHint="Enter a single digit"
              />
            ))}
          </View>
        </View>

        {/* Timer and Resend */}
        <View className="items-center mb-8">
          {!canResend ? (
            <Text className="text-gray-500 text-base mb-4">Resend code in {formatTime(timer)}</Text>
          ) : (
            <TouchableOpacity onPress={handleResendOTP} className="mb-4" accessible={true} accessibilityLabel="Resend verification code">
              <Text className="text-green-600 text-base font-semibold underline">Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          className="bg-green-500 rounded-lg py-4 mb-6"
          onPress={handleVerifyOTP}
          accessible={true}
          accessibilityLabel="Verify OTP code"
        >
          <Text className="text-white text-center text-lg font-semibold">Verify Code</Text>
        </TouchableOpacity>

        {/* Info Message */}
        <View className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <View className="flex-row">
            <Text className="text-yellow-600 text-lg mr-3">⚠️</Text>
            <Text className="text-yellow-700 text-sm leading-5 flex-1">
              Didn't receive the code? Check your {verificationMethod === "email" ? "spam folder" : "messages"} or try resending after the
              timer expires.
            </Text>
          </View>
        </View>

        {/* Change Method */}
        <View className="flex-row justify-center items-center mb-6">
          <Text className="text-gray-500 text-base">Wrong {verificationMethod === "email" ? "email" : "phone"}? </Text>
          <TouchableOpacity onPress={handleChangeMethod} accessible={true} accessibilityLabel="Change verification method">
            <Text className="text-green-600 text-base font-semibold">Change Method</Text>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View className="items-center mb-8">
          <TouchableOpacity onPress={handleContactSupport} accessible={true} accessibilityLabel="Contact support for help">
            <Text className="text-gray-600 text-base underline">Having trouble? Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;
