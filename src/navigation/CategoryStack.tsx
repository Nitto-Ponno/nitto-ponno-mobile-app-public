import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryScreen from "@/screens/category/CategoryScreen";

const Stack = createNativeStackNavigator<CategoryStackParamList>();
const CategoryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Category">
      <Stack.Screen name="Category" component={CategoryScreen} />
    </Stack.Navigator>
  );
};

export default CategoryStack;
export type CategoryStackParamList = {
  Category: undefined;
};
