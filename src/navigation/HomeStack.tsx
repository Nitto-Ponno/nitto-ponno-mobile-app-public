import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/home/HomeScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
export type HomeStackParamList = {
  Home: undefined;
};
