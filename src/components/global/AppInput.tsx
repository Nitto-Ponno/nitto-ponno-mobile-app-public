import { View, Text, TextInput, TextInputProps, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import NText from "./NText";
import { Colors } from "@/context/ThemeProvider";

type InputVariant = "email" | "phone" | "password" | "otp" | "text";

interface AppInputProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  variant: InputVariant;
  containerStyle?: string;
  inputStyle?: string;
  labelStyle?: string;
  isRequired?: boolean;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  maxLength?: number;
}

const AppInput = ({
  variant,
  value,
  setValue,
  label,
  containerStyle,
  inputStyle,
  labelStyle,
  isRequired = false,
  placeholder,
  error,
  disabled = false,
  maxLength,
}: AppInputProps) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Variant-specific configurations
  const getInputProps = (): Partial<TextInputProps> => {
    switch (variant) {
      case "email":
        return {
          keyboardType: "email-address",
          autoCapitalize: "none",
          autoComplete: "email",
          textContentType: "emailAddress",
        };
      case "phone":
        return {
          keyboardType: "phone-pad",
          autoComplete: "tel",
          textContentType: "telephoneNumber",
        };
      case "password":
        return {
          secureTextEntry: !showPassword,
          autoCapitalize: "none",
          autoComplete: "password",
          textContentType: "password",
        };
      case "otp":
        return {
          keyboardType: "number-pad",
          maxLength: maxLength || 6,
          autoComplete: "sms-otp",
          textContentType: "oneTimeCode",
          secureTextEntry: true,
        };
      case "text":
      default:
        return {
          autoCapitalize: "sentences",
        };
    }
  };

  const variantProps = getInputProps();

  return (
    <View className={cn("flex-1", containerStyle)}>
      {/* Label */}
      <NText className={cn(" font-bold mb-1 text-heading", error && "text-red-600", labelStyle)}>
        {label}
        {isRequired && <Text className="text-red-600">*</Text>}
      </NText>

      {/* Input Field */}
      <View
        className={cn(
          "h-14 px-4 border rounded-lg text-base bg-background",
          variant === "password" && "pr-12",
          isFocused && !error && "border-primary",
          error && "border-error",
          !isFocused && !error && "border-body",
          disabled && "bg-gray-100 text-gray-500",
          inputStyle
        )}
      >
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={setValue}
          placeholder={variant == "otp" ? undefined : placeholder}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...variantProps}
          placeholderTextColor={Colors.body}
          className={cn("flex-1", variant === "otp" && "text-center font-bold text-2xl tracking-[10px]")}
        />

        {/* Show/Hide Password Toggle */}
        {variant === "password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-0 h-14 justify-center"
            activeOpacity={0.7}
          >
            <Text className="text-heading text-sm font-medium">{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {error && <Text className="text-xs text-red-600 mt-1">{error}</Text>}
    </View>
  );
};

export default AppInput;
