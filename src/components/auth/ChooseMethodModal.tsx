import { View, Text, Modal, TouchableOpacity, Animated, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setAuthInfo } from "@/store/reducer/authReducer";
import NText from "../global/NText";
import { AuthApi } from "@/services/api/authApi";
import { showErrorToast, showSuccessAlert } from "@/utils/commonFunction"; // fixed: showSuccessAlert → showAlert if needed
import { navigate } from "@/utils/NavigationUtils";
import { Ionicons } from "@expo/vector-icons";
import { handleErrorResponse } from "@/utils/handlers";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/utils/ToastConfig";

const ChooseMethodModal = () => {
  const dispatch = useAppDispatch();
  const { authInfo } = useAppSelector((state) => state.auth);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (authInfo?.chooseMethodVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    }
  }, [authInfo?.chooseMethodVisible]);

  const handleOnSelect = (method: "email" | "phone") => {
    dispatch(setAuthInfo({ selectedMethod: method }));
  };

  const closeModal = () => {
    dispatch(setAuthInfo({ chooseMethodVisible: false })); // optional: clear selection
  };

  const isEmailSelected = authInfo?.selectedMethod === "email";
  const isPhoneSelected = authInfo?.selectedMethod === "phone";

  const handleRegister = async () => {
    if (!authInfo?.selectedMethod) {
      return showErrorToast({ message: "Please select a verification method" });
    }

    let contactInfo: string | undefined;
    let verificationMethod: "email" | "phone";

    if (authInfo.selectedMethod === "email") {
      if (!authInfo.email) {
        return showErrorToast({ message: "Email is required" });
      }
      contactInfo = authInfo.email;
      verificationMethod = "email";
    } else {
      if (!authInfo.phoneNumber) {
        return showErrorToast({ message: "Phone number is required" });
      }
      contactInfo = authInfo.phoneNumber;
      verificationMethod = "phone";
    }

    const payload = {
      email: authInfo.email,
      password: authInfo.password,
      phoneNumber: authInfo.phoneNumber,
      name: authInfo.name,
    };

    try {
      const response = await AuthApi.customerRegister(payload);

      if (response.success) {
        closeModal();

        // NOW CORRECT: dynamic method & contact
        navigate("OTPVerification", {
          verificationMethod, // "email" or "phone"
          contactInfo, // actual email or phone
          onVerifySuccess: () => {
            navigate("Signin");
          },
        });

        showSuccessAlert({
          message: "Registration successful! Verification code sent.",
        });
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      handleErrorResponse(error, "Register");
    }
  };

  return (
    <Modal visible={!!authInfo?.chooseMethodVisible} transparent animationType="none" statusBarTranslucent onRequestClose={closeModal}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <View className="flex-1 bg-black/60 justify-center items-center">
          <TouchableOpacity className="absolute inset-0" activeOpacity={1} onPress={closeModal} />

          <Animated.View
            style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
            className="bg-white rounded-3xl mx-4 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <View className="bg-primary px-6 py-8">
              <Text className="text-white text-2xl font-bold text-center">Verify your identity</Text>
              <Text className="text-white/80 text-center mt-2 text-base">Choose how you'd like to receive your verification code</Text>
            </View>

            {/* Options */}
            <View className="p-6 gap-4">
              {/* Email Option */}
              <TouchableOpacity
                onPress={() => handleOnSelect("email")}
                activeOpacity={0.7}
                className={`flex-row items-center justify-between p-5 rounded-2xl border-2 ${
                  isEmailSelected ? "border-primary bg-primary/5" : "border-border bg-gray-50"
                }`}
              >
                <View className="flex-row items-center gap-4">
                  <View className={`w-12 h-12 rounded-full items-center justify-center ${isEmailSelected ? "bg-primary" : "bg-gray-300"}`}>
                    <Ionicons name="mail" size={24} color={isEmailSelected ? "white" : "#666"} />
                  </View>
                  <View>
                    <NText className="text-lg font-semibold">Send code via Email</NText>
                    {authInfo?.email ? (
                      <NText className="text-gray-500 mt-1">{authInfo.email}</NText>
                    ) : (
                      <NText className="text-gray-400 italic">Email not available</NText>
                    )}
                  </View>
                </View>
                {isEmailSelected && <Ionicons name="checkmark-circle" size={28} color="#10B981" />}
              </TouchableOpacity>

              {/* Phone Option */}
              <TouchableOpacity
                onPress={() => handleOnSelect("phone")}
                activeOpacity={0.7}
                disabled={!authInfo?.phoneNumber}
                className={`flex-row items-center justify-between p-5 rounded-2xl border-2 ${
                  isPhoneSelected ? "border-primary bg-primary/5" : "border-border bg-gray-50"
                }`}
              >
                <View className="flex-row items-center gap-4">
                  <View className={`w-12 h-12 rounded-full items-center justify-center ${isPhoneSelected ? "bg-primary" : "bg-gray-300"}`}>
                    <Ionicons name="call" size={24} color={isPhoneSelected ? "white" : "#666"} />
                  </View>
                  <View>
                    <NText className="text-lg font-semibold">Send code via SMS</NText>
                    {authInfo?.phoneNumber ? (
                      <NText className="text-gray-500 mt-1">{authInfo.phoneNumber}</NText>
                    ) : (
                      <NText className="text-gray-400 italic">Phone number not available</NText>
                    )}
                  </View>
                </View>
                {isPhoneSelected && <Ionicons name="checkmark-circle" size={28} color="#10B981" />}
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View className="px-6 pb-8">
              <TouchableOpacity
                onPress={handleRegister}
                disabled={!authInfo?.selectedMethod}
                className={`py-4 rounded-2xl items-center justify-center ${authInfo?.selectedMethod ? "bg-primary" : "bg-gray-300"}`}
              >
                <NText className={`text-lg font-semibold ${authInfo?.selectedMethod ? "text-white" : "text-gray-500"}`}>Continue</NText>
              </TouchableOpacity>

              <TouchableOpacity onPress={closeModal} className="mt-4 py-3 items-center">
                <NText className="text-gray-500 text-base">Cancel</NText>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
        <Toast config={toastConfig} />
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ChooseMethodModal;
