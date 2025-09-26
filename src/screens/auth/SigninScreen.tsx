import GContainer from "@/components/global/GContainer";
import { navigate } from "@/utils/NavigationUtils";
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
    <GContainer className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="mt-16 mb-12">
          <Text className="text-4xl font-bold text-black text-center mb-4">Sign In</Text>
          <Text className="text-gray-500 text-center text-base leading-6">Welcome back! Please sign in to your account</Text>
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Email Field */}
          <View>
            <Text className="text-gray-700 text-base mb-3 font-medium">Email</Text>
            <View className="relative">
              <TextInput
                className="border border-gray-200 rounded-lg px-4 py-4 pl-12 text-base bg-gray-50"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#9CA3AF"
              />
              <View className="absolute left-4 top-4">
                <Text className="text-gray-400 text-lg">✉️</Text>
              </View>
            </View>
          </View>

          {/* Password Field */}
          <View>
            <Text className="text-gray-700 text-base mb-3 font-medium">Password</Text>
            <View className="relative">
              <TextInput
                className="border border-gray-200 rounded-lg px-4 py-4 pl-12 text-base bg-gray-50"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#9CA3AF"
              />
              <View className="absolute left-4 top-4">
                <Text className="text-gray-400 text-lg">🔒</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Forgot Password Link */}
        <View className="mt-8 mb-6">
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text className="text-black text-right text-base underline">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity className="bg-green-500 rounded-lg py-4 mb-4" onPress={handleSignIn}>
          <Text className="text-white text-center text-lg font-semibold">Sign In</Text>
        </TouchableOpacity>

        {/* Google Sign In Button */}
        <TouchableOpacity className="bg-green-600 rounded-lg py-4 mb-8 flex-row items-center justify-center" onPress={handleGoogleSignIn}>
          <Text className="text-white text-2xl mr-3">G</Text>
          <Text className="text-white text-lg font-semibold">Sign In With Google</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500 text-sm">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Bottom Sign Up Link */}
        <View className="flex-row justify-center items-center mb-8">
          <Text className="text-gray-500 text-base">Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text className="text-green-600 text-base font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Options */}
        <View className="items-center mb-8">
          <TouchableOpacity className="mb-4">
            <Text className="text-gray-600 text-base">Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GContainer>
  );
};

export default SignInScreen;
