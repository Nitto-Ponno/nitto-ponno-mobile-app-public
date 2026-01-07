import { View, Text, Pressable } from "react-native";
import React from "react";
import { goBack } from "@/utils/NavigationUtils";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import ProductsSection from "@/components/home/ProductsSection";

const CategoryProductsScreen = () => {
  return (
    <SafeAreaView className="pb-3 flex-1 bg-background">
      <View className="flex-row items-center pb-3  gap-3 mb-4 px-5 border-b border-border">
        <Pressable onPress={() => goBack()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-100">
          <ArrowLeft size={24} color="#374151" />
        </Pressable>
        <Text className="text-2xl font-bold text-gray-900 ">Categorized Products</Text>
      </View>

      <ProductsSection />
    </SafeAreaView>
  );
};

export default CategoryProductsScreen;
