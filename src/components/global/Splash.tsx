import React from "react";
import { Image, View } from "react-native";

const Splash = () => {
  return (
    <View className="bg-white relative h-full w-full justify-center items-center ">
      <Image source={require("../../assets/icon.jpg")} className="w-80 h-80 object-contain -mt-10" resizeMode="contain" />
    </View>
  );
};

export default Splash;
