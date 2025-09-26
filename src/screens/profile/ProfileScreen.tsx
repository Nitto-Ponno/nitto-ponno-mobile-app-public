import React from "react";
import GContainer from "@/components/global/GContainer";
import { View, Text, TouchableOpacity } from "react-native";
import NText from "@/components/global/NText";
import { navigate } from "@/utils/NavigationUtils";
import { showErrorToast, showSuccessAlert, showToast, showWarningToast } from "@/utils/commonFunction";

const ProfileScreen = () => {
  return (
    <GContainer className={""}>
      <TouchableOpacity>
        <NText
          onPress={() => {
            // navigate("Signup");
            showSuccessAlert({ message: "Navigating to the sign in screen" });
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
