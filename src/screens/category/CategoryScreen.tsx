import NText from "@/components/global/NText";
import { GetAllCategories } from "@/services/api/categoryApi";
import { useAppSelector } from "@/store";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoryScreen = () => {
  const { categories } = useAppSelector((state) => state.category);
  useFocusEffect(
    useCallback(() => {
      GetAllCategories();
    }, [])
  );
  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <NText className="font-bold text-3xl">Category</NText>
      <View>
        <View>
          {categories &&
            categories?.length > 0 &&
            categories?.map((cat) => (
              <View>
                <NText>{cat.name}</NText>
              </View>
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CategoryScreen;
