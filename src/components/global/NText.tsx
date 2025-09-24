import { Text as RNText } from "react-native";
import React from "react";

const NText = ({ children, className, style, ...props }: any) => {
  return (
    <RNText className={`font-FFRegular ${className}`} style={{ ...style }} {...props}>
      {children}{" "}
    </RNText>
  );
};

export default NText;
