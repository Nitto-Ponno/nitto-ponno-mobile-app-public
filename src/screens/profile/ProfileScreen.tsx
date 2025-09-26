import React from "react";
import GContainer from "@/components/global/GContainer";
import { View, Text, TouchableOpacity } from "react-native";
import NText from "@/components/global/NText";
import { navigate } from "@/utils/NavigationUtils";

const ProfileScreen = () => {
  return (
    <GContainer className={""}>
      <TouchableOpacity>
        <NText
          onPress={() => {
            navigate("Signup");
          }}
          className="text-heading"
        >
          ProfileScreen
        </NText>
      </TouchableOpacity>
    </GContainer>
  );
};

export default ProfileScreen;
