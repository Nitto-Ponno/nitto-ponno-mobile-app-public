import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import GContainer from "@/components/global/GContainer";
import NText from "@/components/global/NText";
import { Colors, useTheme } from "@/context/ThemeProvider";
import { Camera, Moon, ThermometerSun } from "lucide-react-native";

const HomeScreen = () => {
  const { toggleTheme, theme } = useTheme();
  return (
    <GContainer safe={true} centered={true}>
      <NText style={{ color: Colors.primary }} className="text-xl font-FFRegular ">
        Welcome to Nitto Ponno!
      </NText>
      <TouchableOpacity
        className="bg-foreground h-14 flex-row   justify-center items-center px-4 rounded-full"
        onPress={() => {
          toggleTheme();
        }}
      >
        <NText className="capitalize text-heading">{theme}</NText>
        <Moon color={Colors.heading} size={20} />
      </TouchableOpacity>
    </GContainer>
  );
};

export default HomeScreen;
