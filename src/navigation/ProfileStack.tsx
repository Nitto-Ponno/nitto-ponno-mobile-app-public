import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "@/screens/profile/ProfileScreen";
import OrdersScreen from "@/screens/profile/OrdersScreen";
import MyAddressScreen from "@/screens/profile/MyAddressScreen";
type ParamList = {
  Profile: undefined;
  Orders: undefined;
  MyAddress: undefined;
};
const Stack = createNativeStackNavigator<ParamList>();
const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="MyAddress" component={MyAddressScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
