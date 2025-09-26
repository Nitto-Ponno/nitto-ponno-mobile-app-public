import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import GContainer from "@/components/global/GContainer";
import { navigate } from "@/utils/NavigationUtils";

const SignUpScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="mt-16 mb-12">
          <Text className="text-4xl font-bold text-black text-center mb-4">Signing Up</Text>
          <Text className="text-gray-500 text-center text-base leading-6">
            Create an account by sign up with provider or email, password
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Name Field */}
          <View>
            <Text className="text-gray-700 text-base mb-3 font-medium">Name</Text>
            <View className="relative">
              <TextInput
                className="border border-gray-200 rounded-lg px-4 py-4 pl-12 text-base bg-gray-50"
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor="#9CA3AF"
              />
              <View className="absolute left-4 top-4">
                <Text className="text-gray-400 text-lg">👤</Text>
              </View>
            </View>
          </View>

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

        {/* Already have account link */}
        <View className="mt-8 mb-6">
          <TouchableOpacity onPress={handleAlreadyHaveAccount}>
            <Text className="text-black text-right text-base underline">Already have account?</Text>
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity className="bg-green-500 rounded-lg py-4 mb-4" onPress={handleRegister}>
          <Text className="text-white text-center text-lg font-semibold">Register</Text>
        </TouchableOpacity>

        {/* Google Sign Up Button */}
        <TouchableOpacity className="bg-green-600 rounded-lg py-4 mb-8 flex-row items-center justify-center" onPress={handleGoogleSignUp}>
          <Text className="text-white text-2xl mr-3">G</Text>
          <Text className="text-white text-lg font-semibold">Sign Up With Google</Text>
        </TouchableOpacity>

        {/* Bottom Login Link */}
        <View className="flex-row justify-center items-center mb-8">
          <Text className="text-gray-500 text-base">Already have an account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text className="text-black text-base font-semibold">Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GContainer>
  );
};

export default SignUpScreen;
