// src/navigation/BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "./CustomTabBar";
import { NavigatorScreenParams } from "@react-navigation/native";
import HomeStack, { HomeStackParamList } from "./HomeStack";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();
const renderCustomTabBar = (props: any) => <CustomTabBar {...props} />;

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={renderCustomTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
export type BottomTabNavigatorParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  SearchStack: undefined;
  ProfileStack: undefined;
  MyLearningStack: undefined;
  WishlistStack: undefined;
};
