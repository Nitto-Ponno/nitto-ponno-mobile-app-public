import { View, TouchableOpacity } from "react-native";
import React from "react";
import { ArrowLeft } from "lucide-react-native";
import NText from "../global/NText";
import { goBack } from "@/utils/NavigationUtils";

const CheckoutHeader = () => {
  return (
    <View className="flex-row items-center gap-3">
      <TouchableOpacity onPress={goBack} className="w-10 h-10 justify-center items-center">
        <ArrowLeft size={25} className="text-heading font-bold" />
      </TouchableOpacity>
      <NText className="text-2xl text-heading font-bold">Checkout</NText>
    </View>
  );
};

export default CheckoutHeader;
