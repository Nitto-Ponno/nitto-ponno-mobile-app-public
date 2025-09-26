import GContainer from "@/components/global/GContainer";
import NText from "@/components/global/NText";
import { Colors } from "@/context/ThemeProvider";
import { goBack, navigate } from "@/utils/NavigationUtils";
import { ArrowLeftCircle, LockIcon, Mail } from "lucide-react-native";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Handle sign in logic here
    console.log("Sign in pressed");
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic here
    console.log("Google sign in pressed");
  };

  const handleForgotPassword = () => {
    navigate("ForgotPassword");
  };

  const handleSignUp = () => {
    navigate("Signup");
  };

  return (
    <GContainer className="flex-1">
      <ArrowLeftCircle onPress={goBack} size={40} color={Colors.heading} style={{ marginLeft: 16 }} className="bg-slate-800" />

      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="mt-12 mb-12">
          <NText className="text-4xl font-bold text-heading text-center mb-4">Sign In</NText>
          <NText className="text-body text-center text-base leading-6">Welcome back! Please sign in to your account</NText>
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Email Field */}
          <View>
            <NText className="text-heading text-base mb-1 mt-3 font-medium">Email</NText>
            <View className="relative border border-border rounded-lg px-4 justify-center h-14 pl-12">
              <TextInput
                className="text-base text-body flex-1 "
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

          {/* Password Field */}
          <View>
            <NText className="text-heading text-base mb-1 mt-3 font-medium">Password</NText>
            <View className="relative border border-border rounded-lg px-4 justify-center h-14 pl-12">
              <TextInput
                className="text-base text-body flex-1 "
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
        </View>

        {/* Forgot Password Link */}
        <View className="mt-8 mb-6">
          <TouchableOpacity onPress={handleForgotPassword}>
            <NText className="text-heading text-right text-base underline">Forgot Password?</NText>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity className="bg-green-500 rounded-lg py-4 mb-4" onPress={handleSignIn}>
          <NText className="text-white text-center text-lg font-semibold">Sign In</NText>
        </TouchableOpacity>

        {/* Google Sign In Button */}
        <TouchableOpacity className="bg-green-600 rounded-lg py-4 mb-8 flex-row items-center justify-center" onPress={handleGoogleSignIn}>
          <NText className="text-white text-2xl mr-3">G</NText>
          <NText className="text-white text-lg font-semibold">Sign In With Google</NText>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1 h-px bg-gray-300" />
          <NText className="mx-4 text-body text-sm">OR</NText>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Bottom Sign Up Link */}
        <View className="flex-row justify-center items-center mb-8">
          <NText className="text-body text-base">Don't have an account? </NText>
          <TouchableOpacity onPress={handleSignUp}>
            <NText className="text-green-600 text-base font-semibold">Sign Up</NText>
          </TouchableOpacity>
        </View>

        {/* Additional Options */}
        <View className="items-center mb-8">
          <TouchableOpacity className="mb-4">
            <NText className="text-gray-600 text-base">Continue as Guest</NText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GContainer>
  );
};

export default SignInScreen;
