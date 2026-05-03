import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryScreen from "@/screens/category/CategoryScreen";
import CategoryProductsScreen from "@/screens/category/CategoryProductsScreen";

const Stack = createNativeStackNavigator<CategoryStackParamList>();
const CategoryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Category">
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
    </Stack.Navigator>
  );
};

export default CategoryStack;
export type CategoryStackParamList = {
  Category: undefined;
  CategoryProducts: { slug?: string };
};
