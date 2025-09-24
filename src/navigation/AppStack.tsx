import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeStack from "@navigation/HomeStack";
import ProfileStack from "@navigation/ProfileStack";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppStack;
export type RootStackParamList = {
  BottomTabNavigator: undefined;
  HomeStack: undefined;
  ProfileStack: undefined;
};
