import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { goBack, navigate } from "@/utils/NavigationUtils";
import { Colors } from "@/context/ThemeProvider";
import { ArrowLeftCircle, LockIcon, Mail, Phone, User2Icon, EyeOffIcon, EyeIcon } from "lucide-react-native";
import NText from "@/components/global/NText";
import { SafeAreaView } from "react-native-safe-area-context";
import { dispatch } from "@/store";
import { setAuthInfo } from "@/store/reducer/authReducer";
import ChooseMethodModal from "@/components/auth/ChooseMethodModal";

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

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const validateForm = () => {
    let isValid = true;
    let errorMessages = { ...errors };

    if (!info.firstName) {
      errorMessages.firstName = "First Name is required";
      isValid = false;
    } else {
      errorMessages.firstName = "";
    }

    if (!info.lastName) {
      errorMessages.lastName = "Last Name is required";
      isValid = false;
    } else {
      errorMessages.lastName = "";
    }

    if (!info.email) {
      errorMessages.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(info.email)) {
      errorMessages.email = "Please enter a valid email address";
      isValid = false;
    } else {
      errorMessages.email = "";
    }

    if (info.phoneNumber && !/^\+?[0-9]{10,15}$/.test(info.phoneNumber)) {
      errorMessages.phoneNumber = "Please enter a valid phone number";
      isValid = false;
    } else {
      errorMessages.phoneNumber = "";
    }

    if (!info.password) {
      errorMessages.password = "Password is required";
      isValid = false;
    } else if (info.password.length < 6) {
      errorMessages.password = "Password should be at least 6 characters long";
      isValid = false;
    } else {
      errorMessages.password = "";
    }

    if (info.password !== info.confirmPassword) {
      errorMessages.confirmPassword = "Passwords do not match";
      isValid = false;
    } else {
      errorMessages.confirmPassword = "";
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return; // Only proceed if form is valid
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

  const handleGoogleSignUp = () => {
    // Handle Google sign up logic here
    console.log("Google sign up pressed");
  };

  const handleAlreadyHaveAccount = () => {
    navigate("Signin");
  };

  const handleLogin = () => {
    navigate("Signin");
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <KeyboardAvoidingView className="flex-1" keyboardVerticalOffset={undefined} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView className="flex-1 bg-background px-6">
        <ChooseMethodModal />
        <View className="flex-1">
          <ArrowLeftCircle onPress={goBack} size={40} color={Colors.heading} className="bg-slate-800" />
          <View className="flex-1">
            <ScrollView>
              <View className="my-4">
                <NText className="text-4xl font-bold text-heading text-center mb-4">Signing Up</NText>
                <NText className="text-body text-center text-base leading-6">
                  Create an account by signing up with provider or email, password
                </NText>
              </View>

              <View className="gap-2">
                {/* Name Fields */}
                <View>
                  <NText className="text-heading text-base mb-1 font-bold">First Name</NText>
                  <View
                    className={`flex-row border rounded-lg px-4 items-center gap-3 ${errors.firstName ? "border-red-500" : "border-border"}`}
                  >
                    <User2Icon color={Colors.body} />
                    <TextInput
                      className="h-14 text-base flex-1 text-heading"
                      placeholder="First Name"
                      value={info.firstName}
                      onChangeText={(t) => setInfo({ ...info, firstName: t })}
                      placeholderTextColor={Colors.body}
                    />
                  </View>
                  {errors.firstName && <NText className="text-red-500 text-sm">{errors.firstName}</NText>}
                </View>
                <View>
                  <NText className="text-heading text-base mb-1 font-bold">Middle Name</NText>
                  <View
                    className={`flex-row border rounded-lg px-4 items-center gap-3 ${errors.firstName ? "border-red-500" : "border-border"}`}
                  >
                    <User2Icon color={Colors.body} />
                    <TextInput
                      className="h-14 text-base w-full text-heading"
                      placeholder="Middle Name"
                      value={info.middleName}
                      onChangeText={(t) => setInfo({ ...info, middleName: t })}
                      placeholderTextColor={Colors.body}
                    />
                  </View>
                  {errors.middleName && <NText className="text-red-500 text-sm">{errors.firstName}</NText>}
                </View>

                <View>
                  <NText className="text-heading text-base mb-1 font-bold">Last Name</NText>
                  <View
                    className={`flex-row border rounded-lg px-4 items-center gap-3 ${errors.lastName ? "border-red-500" : "border-border"}`}
                  >
                    <User2Icon color={Colors.body} />
                    <TextInput
                      className="h-14 text-base flex-1 text-heading"
                      placeholder="Last Name"
                      value={info.lastName}
                      onChangeText={(t) => setInfo({ ...info, lastName: t })}
                      placeholderTextColor={Colors.body}
                    />
                  </View>
                  {errors.lastName && <NText className="text-red-500 text-sm">{errors.lastName}</NText>}
                </View>

                {/* Email Field */}
                <View>
                  <NText className="text-heading text-base mb-1 font-bold">Email</NText>
                  <View
                    className={`flex-row border rounded-lg px-4 items-center gap-3 ${errors.email ? "border-red-500" : "border-border"}`}
                  >
                    <Mail color={Colors.body} />
                    <TextInput
                      className="h-14 text-base flex-1 text-heading"
                      placeholder="Email Address"
                      value={info.email}
                      onChangeText={(t) => setInfo({ ...info, email: t.toLocaleLowerCase() })}
                      placeholderTextColor={Colors.body}
                    />
                  </View>
                  {errors.email && <NText className="text-red-500 text-sm">{errors.email}</NText>}
                </View>

                {/* Phone Field */}
                <View>
                  <NText className="text-heading text-base mb-1 font-bold">
                    Phone <NText className="text-body">(optional)</NText>
                  </NText>
                  <View
                    className={`gap-3 flex-row items-center border rounded-lg px-4 ${errors.phoneNumber ? "border-red-500" : "border-border"}`}
                  >
                    <Phone size={20} color={Colors.body} />
                    <NText className="text-heading text-lg">+88</NText>
                    <TextInput
                      className="text-base h-14 text-heading pl-3 border-l border-border"
                      placeholder="01xxxxxx"
                      value={info.phoneNumber}
                      onChangeText={(t) => setInfo({ ...info, phoneNumber: t })}
                      keyboardType="numeric"
                      placeholderTextColor={Colors.body}
                    />
                  </View>
                  {errors.phoneNumber && <NText className="text-red-500 text-sm">{errors.phoneNumber}</NText>}
                </View>

                {/* Password Fields */}
                <View>
                  <NText className="text-heading text-base mb-1 font-bold">Password</NText>
                  <View
                    className={`flex-row border rounded-lg px-4 items-center gap-3 ${errors.password ? "border-red-500" : "border-border"}`}
                  >
                    <LockIcon color={Colors.body} />
                    <TextInput
                      className="h-14 text-base flex-1 text-heading"
                      placeholder="Password"
                      value={info.password}
                      onChangeText={(t) => setInfo({ ...info, password: t })}
                      placeholderTextColor={Colors.body}
                      secureTextEntry={!passwordVisibility.password}
                    />
                    <TouchableOpacity onPress={() => togglePasswordVisibility("password")}>
                      {passwordVisibility.password ? <EyeIcon color={Colors.body} /> : <EyeOffIcon color={Colors.body} />}
                    </TouchableOpacity>
                  </View>
                  {errors.password && <NText className="text-red-500 text-sm">{errors.password}</NText>}
                </View>

                <View>
                  <NText className="text-heading text-base mb-1 font-bold">Confirm Password</NText>
                  <View
                    className={`flex-row border rounded-lg px-4 items-center gap-3 ${
                      errors.confirmPassword ? "border-red-500" : "border-border"
                    }`}
                  >
                    <LockIcon color={Colors.body} />
                    <TextInput
                      className="h-14 text-base flex-1 text-heading"
                      placeholder="Confirm Password"
                      value={info.confirmPassword}
                      onChangeText={(t) => setInfo({ ...info, confirmPassword: t })}
                      placeholderTextColor={Colors.body}
                      secureTextEntry={!passwordVisibility.confirmPassword}
                    />
                    <TouchableOpacity onPress={() => togglePasswordVisibility("confirmPassword")}>
                      {passwordVisibility.confirmPassword ? <EyeIcon color={Colors.body} /> : <EyeOffIcon color={Colors.body} />}
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && <NText className="text-red-500 text-sm">{errors.confirmPassword}</NText>}
                </View>
              </View>

              {/* Already have account link */}
              <View className="my-2">
                <TouchableOpacity onPress={handleAlreadyHaveAccount}>
                  <NText className="text-heading text-right text-base underline">Already have an account?</NText>
                </TouchableOpacity>
              </View>

              {/* Register Button */}
              <TouchableOpacity className="bg-green-500 rounded-lg py-4 mb-4" onPress={handleRegister}>
                <NText className="text-white text-center text-lg font-semibold">Register</NText>
              </TouchableOpacity>

              {/* Google Sign Up Button */}
              <TouchableOpacity
                className="bg-blue-600 rounded-lg py-4 mb-2 flex-row items-center justify-center"
                onPress={handleGoogleSignUp}
              >
                <NText className="text-white text-2xl mr-3">G</NText>
                <NText className="text-white text-lg font-semibold">Sign Up With Google</NText>
              </TouchableOpacity>

              {/* Bottom Login Link */}
              <View className="flex-row justify-center items-center">
                <NText className="text-body text-base">Already have an account? </NText>
                <TouchableOpacity onPress={handleLogin}>
                  <NText className="text-primary text-base font-semibold">Login</NText>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
