import { Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

const Basic = () => {
  const size = 10;
  const position = useRef(new Animated.Value(size)).current;
  const startAnimation = () => {
    Animated.timing(position, {
      duration: 1000,
      toValue: 400,
      useNativeDriver: false,
    }).start(() =>
      Animated.timing(position, {
        duration: 1000,
        toValue: size,
        useNativeDriver: false,
      }).start()
    );
  };
  useEffect(() => {
    startAnimation();
    return () => {};
  }, []);

  return (
    <Animated.View style={{ width: position, height: position, backgroundColor: "yellow" }}>
      <Text onPress={startAnimation}>Basic</Text>
    </Animated.View>
  );
};

export default Basic;
