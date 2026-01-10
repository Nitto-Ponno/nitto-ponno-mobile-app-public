import React, { useState } from "react";
import { View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import { goBack, navigate } from "@/utils/NavigationUtils";
import { Colors } from "@/context/ThemeProvider";
import { ArrowLeftCircle } from "lucide-react-native";
import NText from "@/components/global/NText";
import { SafeAreaView } from "react-native-safe-area-context";
import { dispatch } from "@/store";
import { setAuthInfo } from "@/store/reducer/authReducer";
import ChooseMethodModal from "@/components/auth/ChooseMethodModal";
import AppInput from "@/components/global/AppInput";
import { KeyboardAvoiderScrollView } from "@good-react-native/keyboard-avoider";
import AntDesign from "@expo/vector-icons/AntDesign";
import { showToast } from "@/utils/commonFunction";

const SignUpScreen = () => {
  const [info, setInfo] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let errorMessages = { ...errors };
    let isValid = true;

    if (!info.firstName) {
      errorMessages.firstName = "First Name is required";
      isValid = false;
    } else errorMessages.firstName = "";

    if (!info.lastName) {
      errorMessages.lastName = "Last Name is required";
      isValid = false;
    } else errorMessages.lastName = "";

    if (!info.email) {
      errorMessages.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(info.email)) {
      errorMessages.email = "Please enter a valid email address";
      isValid = false;
    } else errorMessages.email = "";

    if (info.phoneNumber && !/^\+?[0-9]{10,15}$/.test(info.phoneNumber)) {
      errorMessages.phoneNumber = "Please enter a valid phone number";
      isValid = false;
    } else errorMessages.phoneNumber = "";

    if (!info.password) {
      errorMessages.password = "Password is required";
      isValid = false;
    } else if (info.password.length < 6) {
      errorMessages.password = "Password should be at least 6 characters long";
      isValid = false;
    } else errorMessages.password = "";

    if (info.password !== info.confirmPassword) {
      errorMessages.confirmPassword = "Passwords do not match";
      isValid = false;
    } else errorMessages.confirmPassword = "";

    setErrors(errorMessages);
    return isValid;
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    dispatch(
      setAuthInfo({
        chooseMethodVisible: true,
        ...info,
        name: {
          firstName: info.firstName,
          middleName: info.middleName,
          lastName: info.lastName,
        },
      })
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <View className="flex-1">
        <ChooseMethodModal />

        {/* Header */}
        <View className="px-6 py-3">
          <ArrowLeftCircle onPress={goBack} size={40} color={Colors.heading} />
        </View>

        <KeyboardAvoiderScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 px-4">
              {/* Title */}
              <View className="mb-6">
                <NText className="text-4xl font-bold text-heading text-center mb-4">Signing Up</NText>
                <NText className="text-body text-center text-base leading-6">
                  Create an account by signing up with provider or email, password
                </NText>
              </View>

              {/* Form */}
              <View className="gap-4">
                <AppInput
                  label="First Name"
                  value={info.firstName}
                  setValue={(t) => setInfo({ ...info, firstName: t })}
                  placeholder="John"
                  isRequired
                  error={errors.firstName}
                  variant="text"
                />

                <AppInput
                  label="Middle Name"
                  value={info.middleName}
                  setValue={(t) => setInfo({ ...info, middleName: t })}
                  placeholder="Middle Name (Optional)"
                  variant="text"
                />

                <AppInput
                  label="Last Name"
                  value={info.lastName}
                  setValue={(t) => setInfo({ ...info, lastName: t })}
                  placeholder="Doe"
                  isRequired
                  error={errors.lastName}
                  variant="text"
                />

                <AppInput
                  variant="email"
                  label="Email Address"
                  value={info.email}
                  setValue={(t) => setInfo({ ...info, email: t })}
                  placeholder="Enter your email"
                  isRequired
                  error={errors.email}
                />

                <AppInput
                  label="Phone Number"
                  value={info.phoneNumber}
                  setValue={(t) => setInfo({ ...info, phoneNumber: t })}
                  placeholder="+88 01xxxx xxx xxx"
                  error={errors.phoneNumber}
                  variant="phone"
                />

                <AppInput
                  label="Password"
                  value={info.password}
                  setValue={(t) => setInfo({ ...info, password: t })}
                  placeholder="Enter password"
                  isRequired
                  error={errors.password}
                  variant="password"
                />

                <AppInput
                  label="Confirm Password"
                  value={info.confirmPassword}
                  setValue={(t) => setInfo({ ...info, confirmPassword: t })}
                  placeholder="Enter confirm password"
                  isRequired
                  error={errors.confirmPassword}
                  variant="password"
                />
              </View>

              {/* Already have account */}
              <View className="my-4">
                <TouchableOpacity onPress={() => navigate("Signin")}>
                  <NText className="text-heading text-right text-base underline">Already have an account?</NText>
                </TouchableOpacity>
              </View>

              {/* Register Button */}
              <TouchableOpacity className="bg-green-500 rounded-lg py-4 mb-4" onPress={handleRegister} activeOpacity={0.8}>
                <NText className="text-white text-center text-lg font-semibold">Register</NText>
              </TouchableOpacity>

              {/* Google */}
              <TouchableOpacity
                className="bg-blue-600 rounded-lg py-4 mb-8 flex-row gap-3 items-center justify-center"
                onPress={() => {
                  showToast({ message: "Coming soon..." });
                }}
              >
                <AntDesign name="google" size={24} color="white" />
                <NText className="text-white text-lg font-bold">Sign In With Google</NText>
              </TouchableOpacity>

              {/* Bottom Login */}
              <View className="flex-row justify-center items-center mb-6">
                <NText className="text-body text-base">Already have an account? </NText>
                <TouchableOpacity onPress={() => navigate("Signin")}>
                  <NText className="text-primary text-base font-semibold">Login</NText>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoiderScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
