import NText from "@/components/global/NText";
import { GetAllCategories } from "@/services/api/categoryApi";
import { useAppSelector } from "@/store";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Grid, Tag, Sparkles, ArrowLeft } from "lucide-react-native";
import { Colors } from "@/context/ThemeProvider";
import Images from "@/constants/Images";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

interface Category {
  _id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  isDeleted: boolean;
  isFeatured: boolean;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  subCategories: Category[];
}

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  const subCount = category.subCategories?.length || 0;

  return (
    <TouchableOpacity
      onPress={() => onPress(category)}
      className="bg-accent  rounded-2xl overflow-hidden mb-4 border border-border "
      style={{ width: CARD_WIDTH }}
      activeOpacity={0.8}
    >
      {/* Image Section */}
      <View className="relative">
        <Image source={Images.LOGO} className="w-full h-32 bg-foreground " resizeMode="cover" />
        {category.isFeatured && (
          <View className="absolute top-2 right-2 bg-yellow-400 rounded-full p-1.5">
            <Sparkles size={12} color="#000" />
          </View>
        )}
      </View>

      {/* Content Section */}
      <View className="p-3">
        <NText className="text-sm font-bold text-heading " numberOfLines={1}>
          {category.name}
        </NText>
        {subCount > 0 && (
          <View className="flex-row items-center mt-2">
            <Grid size={12} color={Colors.body} />
            <NText className="text-xs text-body  ml-1">{subCount} categories</NText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

interface SubCategoryItemProps {
  category: Category;
  onPress: (category: Category) => void;
}

const SubCategoryItem: React.FC<SubCategoryItemProps> = ({ category, onPress }) => {
  const subCount = category.subCategories?.length || 0;

  return (
    <TouchableOpacity
      onPress={() => onPress(category)}
      className="bg-foreground  rounded-xl p-3 mb-2 flex-row items-center border border-border "
      activeOpacity={0.7}
    >
      <Image source={Images.LOGO} className="w-12 h-12 rounded-lg bg-foreground " resizeMode="cover" />
      <View className="flex-1 ml-3">
        <View className="flex-row items-center">
          <NText className="text-sm font-semibold text-heading ">{category.name}</NText>
          {category.isFeatured && <View className="ml-2 w-1.5 h-1.5 bg-yellow-400 rounded-full" />}
        </View>
        {subCount > 0 && <NText className="text-xs text-body mt-0.5">{subCount} subcategories</NText>}
      </View>
      <Tag size={16} color="#D1D5DB" />
    </TouchableOpacity>
  );
};

const CategoryScreen: React.FC = () => {
  const { categories } = useAppSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<Category[]>([]);

  useFocusEffect(
    useCallback(() => {
      GetAllCategories();
    }, [])
  );

  const handleCategoryPress = useCallback(
    (category: Category) => {
      if (category.subCategories && category.subCategories.length > 0) {
        setSelectedCategory(category);
        setBreadcrumb([...breadcrumb, category]);
      } else {
        console.log("Navigate to products:", category.name, category._id);
        // Add your navigation logic here
        // Example: navigation.navigate('ProductList', { categoryId: category._id });
      }
    },
    [breadcrumb]
  );

  const handleBack = useCallback(() => {
    const newBreadcrumb = [...breadcrumb];
    newBreadcrumb.pop();
    setBreadcrumb(newBreadcrumb);
    setSelectedCategory(newBreadcrumb[newBreadcrumb.length - 1] || null);
  }, [breadcrumb]);

  const currentCategories = selectedCategory?.subCategories || categories;
  const isSubView = selectedCategory !== null;

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 pb-4 bg-background border-b border-border ">
        <TouchableOpacity onPress={handleBack} disabled={!selectedCategory?.name} className="flex-row items-center gap-2">
          {selectedCategory?.name && <ArrowLeft size={25} color={Colors.heading} />}
          <NText className="font-bold text-2xl text-heading capitalize">{selectedCategory?.name || "Categories"}</NText>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {currentCategories && currentCategories.length > 0 ? (
          isSubView ? (
            // List view for subcategories
            <View>
              {currentCategories.map((category) => (
                <SubCategoryItem key={category._id} category={category} onPress={handleCategoryPress} />
              ))}
            </View>
          ) : (
            // Grid view for main categories
            <View className="flex-row flex-wrap justify-between">
              {currentCategories.map((category) => (
                <CategoryCard key={category._id} category={category} onPress={handleCategoryPress} />
              ))}
            </View>
          )
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <Grid size={48} color="#D1D5DB" />
            <NText className="text-gray-400  text-base mt-4">No categories available</NText>
          </View>
        )}

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;
