import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import GContainer from "@/components/global/GContainer";
import { goBack, navigate } from "@/utils/NavigationUtils";
import { Colors } from "@/context/ThemeProvider";
import { ArrowLeftCircle, Inbox, LockIcon, Mail, Phone, User, User2Icon } from "lucide-react-native";
import NText from "@/components/global/NText";

const SignUpScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = () => {
    navigate("Signin");
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

  return (
    <GContainer>
      <ArrowLeftCircle onPress={goBack} size={40} color={Colors.heading} style={{ marginLeft: 16 }} className="bg-slate-800" />
      <ScrollView className="flex-1 px-6">
        {/* Header */}

        <View className="mt-12 mb-12">
          <NText className="text-4xl font-bold text-heading text-center mb-4">Signing Up</NText>
          <NText className="text-body text-center text-base leading-6">Create an account by sign up with provider or email, password</NText>
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Name Field */}
          <View>
            <NText className="text-heading text-base mb-1 mt-3 font-medium">Name</NText>
            <View className="relative border border-border rounded-lg px-4 justify-center h-14 pl-12">
              <TextInput
                className="text-base flex-1 text-heading"
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor={Colors.body}
              />
              <View className="absolute left-4 top-4">
                <User2Icon color={Colors.body} />
              </View>
            </View>
          </View>

          {/* Email Field */}
          <View>
            <NText className="text-heading text-base mb-1 mt-3 font-medium">Email</NText>
            <View className="relative border border-border rounded-lg px-4 justify-center h-14 pl-12">
              <TextInput
                className="text-base flex-1 text-heading"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={Colors.body}
              />
              <View className="absolute justify-center left-4 top-4">
                <Mail size={20} color={Colors.body} />
              </View>
            </View>
          </View>
          <View>
            <NText className="text-heading text-base mb-1 mt-3 font-medium">
              Phone <NText className="text-body">(optional)</NText>
            </NText>
            <View className="relative flex-row items-center border border-border rounded-lg px-4 justify-center h-14 pl-12">
              <NText className="text-heading text-lg">+88</NText>
              <TextInput
                className="text-base flex-1 text-heading  border-l pl-3 ml-3 border-l-border"
                placeholder="01xxxxxx"
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
                autoCapitalize="none"
                placeholderTextColor={Colors.body}
              />
              <View className="absolute justify-center left-4 top-4">
                <Phone size={20} color={Colors.body} />
              </View>
            </View>
          </View>

          {/* Password Field */}
          <View>
            <NText className="text-heading text-base mb-1 mt-3 font-medium">Password</NText>
            <View className="relative border border-border rounded-lg px-4 justify-center h-14 pl-12">
              <TextInput
                className="text-base flex-1"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={Colors.body}
              />
              <View className="absolute left-4 top-4">
                <LockIcon color={Colors.body} />
              </View>
            </View>
          </View>
          {/* Password Field */}
          <View>
            <NText className="text-heading text-base mb-1 mt-3 font-medium">Confirm Password</NText>
            <View className="relative border border-border rounded-lg px-4 justify-center h-14 pl-12">
              <TextInput
                className="text-base flex-1"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor={Colors.body}
              />
              <View className="absolute left-4 top-4">
                <LockIcon color={Colors.body} />
              </View>
            </View>
          </View>
        </View>

        {/* Already have account link */}
        <View className="mt-8 mb-6">
          <TouchableOpacity onPress={handleAlreadyHaveAccount}>
            <NText className="text-heading text-right text-base underline">Already have account?</NText>
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity className="bg-green-500 rounded-lg py-4 mb-4" onPress={handleRegister}>
          <NText className="text-white text-center text-lg font-semibold">Register</NText>
        </TouchableOpacity>

        {/* Google Sign Up Button */}
        <TouchableOpacity className="bg-green-600 rounded-lg py-4 mb-8 flex-row items-center justify-center" onPress={handleGoogleSignUp}>
          <NText className="text-white text-2xl mr-3">G</NText>
          <NText className="text-white text-lg font-semibold">Sign Up With Google</NText>
        </TouchableOpacity>

        {/* Bottom Login Link */}
        <View className="flex-row justify-center items-center mb-8">
          <NText className="text-body text-base">Already have an account? </NText>
          <TouchableOpacity onPress={handleLogin}>
            <NText className="text-primary text-base font-semibold">Login</NText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GContainer>
  );
};

export default SignUpScreen;
