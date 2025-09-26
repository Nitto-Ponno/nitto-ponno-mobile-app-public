import NText from "@/components/global/NText";
import React from "react";
import { Text, View } from "react-native";

/*
  1. Create the config
*/
type ToastProps = {
  background?: string;
  color?: string;
  type?: "default" | "success" | "warning" | "error";
  toast?: "toast" | "alert";
};

export const toastConfig = {
  tomatoToast: ({
    text1 = "No toast message available",
    props = {
      background: "#666666",
      color: "white",
      type: "default",
      toast: "toast",
    } as ToastProps,
  }: {
    text1?: string;
    props?: ToastProps;
  }) => {
    if (props.toast === "alert") {
      return (
        <View>
          <NText>This will be a alert</NText>
        </View>
      );
    }
    return (
      <View
        style={{
          // minHeight: 40,
          // minWidth: '30%',
          backgroundColor:
            props.type === "success"
              ? "#3bb068"
              : props.type === "warning"
              ? "#E7931C"
              : props.type === "error"
              ? "#DA4B43"
              : props.type === "default"
              ? "#666666"
              : props.background,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          paddingHorizontal: 25,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            color: props.color || "white",
            fontSize: 18,
            // fontWeight: 'bold',
          }}
        >
          {text1}{" "}
        </Text>
      </View>
    );
  },
};
