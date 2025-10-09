import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "@/screens/profile/ProfileScreen";
import OrdersScreen from "@/screens/profile/OrdersScreen";
type ParamList = {
  Profile: undefined;
  Orders: undefined;
};
const Stack = createNativeStackNavigator<ParamList>();
const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
