import NText from "@/components/global/NText";
import { Colors } from "@/context/ThemeProvider";
import { AuthApi } from "@/services/api/authApi";
import { dispatch, useAppSelector } from "@/store";
import { setAuthInfo } from "@/store/reducer/authReducer";
import { showErrorToast, showSuccessAlert, showToast } from "@/utils/commonFunction";
import { handleErrorResponse } from "@/utils/handlers";
import { goBack, navigate } from "@/utils/NavigationUtils";
import { ArrowLeftCircle } from "lucide-react-native";
import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, TouchableOpacity, ScrollView, Alert, NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// interface OTPVerificationScreenProps {
//   verificationMethod?: VerificationMethod;
//   contactInfo?: string;
//   onVerifySuccess?: (otp: string) => void;
//   onResendOTP?: () => void;
//   onChangeMethod?: () => void;
//   onContactSupport?: () => void;
// }

const OTPVerificationScreen = () => {
  const { authInfo } = useAppSelector((state) => state.auth);
  const verificationMethod = authInfo?.selectedMethod;
  const contactInfo = authInfo?.email || "";
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState<number>(30);
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

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Please enter the complete 6-digit code");
      return;
    }
    console.log("authInfo", JSON.stringify(authInfo, null, 2));
    try {
      const payload =
        authInfo?.selectedMethod === "email" || !authInfo?.selectedMethod
          ? { email: authInfo?.email, otp: otp }
          : { phoneNumber: authInfo?.phoneNumber, otp: otp };

      const response = await AuthApi.verifyOtp(payload);
      if (response.success) {
        showSuccessAlert({ message: "Verification Successfully Done!" });
        navigate("Signin");
        dispatch(setAuthInfo(null));
      }
    } catch (error: any) {
      handleErrorResponse(error, "Verify OTP");
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    // Reset timer and resend OTP
    setTimer(30);
    setCanResend(false);
    setOtp("");

    try {
      console.log("authInfo", JSON.stringify(authInfo, null, 2));
      const payload =
        authInfo?.selectedMethod === "email" || authInfo?.email ? { email: authInfo.email } : { phoneNumber: authInfo?.phoneNumber };
      console.log("payload", JSON.stringify(payload, null, 2));
      const response = await AuthApi.sendVerification(payload);
      if (response.success) {
        return showToast({ message: "OTP code sent successfully!" });
      }
    } catch (error: any) {
      showErrorToast({ message: "Resend Failed" });
      handleErrorResponse(error, "Resend otp");
    }
    // Focus first input
    inputRefs.current[0]?.focus();
  };

  const handleChangeMethod = (): void => {
    showToast({ message: "Coming soon..." });
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

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ArrowLeftCircle onPress={goBack} size={40} color={Colors.heading} style={{ marginLeft: 16 }} className="bg-slate-800" />

      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="mt-16 mb-12">
          <NText className="text-4xl font-bold text-heading text-center mb-4">Verify Code</NText>
          <NText className="text-body text-center text-base leading-6 px-4">
            Enter the 6-digit code sent to your {verificationMethod === "email" ? "email" : "phone number"}
          </NText>
          <NText className="text-green-600 text-center text-base font-medium mt-2">{maskContactInfo(contactInfo)}</NText>
        </View>

        {/* OTP Input Fields */}
        <View className="mb-8">
          <NText className="text-heading text-base mb-4 font-medium text-center">Verification Code</NText>
          <View className="bg-surface border border-outline rounded-lg h-14 ">
            <TextInput
              keyboardType={"number-pad"}
              maxLength={6}
              autoComplete={"sms-otp"}
              className="flex-1 text-center text-3xl text-heading font-bold tracking-[20px]"
              value={otp}
              onChangeText={setOtp}
            />
          </View>
        </View>

        {/* Timer and Resend */}
        <View className="items-center mb-8">
          {!canResend ? (
            <NText className="text-body text-base mb-4">Resend code in {formatTime(timer)}</NText>
          ) : (
            <TouchableOpacity onPress={handleResendOTP} className="mb-4" accessible={true} accessibilityLabel="Resend verification code">
              <NText className="text-green-600 text-base font-semibold underline">Resend Code</NText>
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
          <NText className="text-white text-center text-lg font-semibold">Verify Code</NText>
        </TouchableOpacity>

        {/* Info Message */}
        <View className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <View className="flex-row">
            <NText className="text-yellow-600 text-lg mr-3">⚠️</NText>
            <NText className="text-yellow-700 text-sm leading-5 flex-1">
              Didn't receive the code? Check your {verificationMethod === "email" ? "spam folder" : "messages"} or try resending after the
              timer expires.
            </NText>
          </View>
        </View>

        {/* Change Method */}
        <View className="flex-row justify-center items-center mb-6">
          <NText className="text-body text-base">Wrong {verificationMethod === "email" ? "email" : "phone"}? </NText>
          <TouchableOpacity onPress={handleChangeMethod} accessible={true} accessibilityLabel="Change verification method">
            <NText className="text-green-600 text-base font-semibold">Change Method</NText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;
