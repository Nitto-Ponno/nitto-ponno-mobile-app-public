// import NText from "@/components/global/NText";
// import { GetAllCategories } from "@/services/api/categoryApi";
// import { useAppSelector } from "@/store";
// import { useFocusEffect } from "@react-navigation/native";
// import React, { useCallback, useState } from "react";
// import { View, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Grid, Tag, Sparkles, ArrowLeft } from "lucide-react-native";
// import { Colors } from "@/context/ThemeProvider";
// import Images from "@/constants/Images";
// import { Category } from "@/services/types/categoryTypes";

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = (width - 48) / 2;

// interface CategoryCardProps {
//   category: Category;
//   onPress: (category: Category) => void;
// }

// const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
//   const subCount = category.subCategories?.length || 0;

//   return (
//     <TouchableOpacity
//       onPress={() => onPress(category)}
//       className="bg-accent  rounded-2xl overflow-hidden mb-4 border border-border "
//       style={{ width: CARD_WIDTH }}
//       activeOpacity={0.8}
//     >
//       {/* Image Section */}
//       <View className="relative">
//         <Image source={Images.LOGO} className="w-full h-32 bg-foreground " resizeMode="cover" />
//         {category.isFeatured && (
//           <View className="absolute top-2 right-2 bg-yellow-400 rounded-full p-1.5">
//             <Sparkles size={12} color="#000" />
//           </View>
//         )}
//       </View>

//       {/* Content Section */}
//       <View className="p-3">
//         <NText className="text-sm font-bold text-heading " numberOfLines={1}>
//           {category.name}
//         </NText>
//         {subCount > 0 && (
//           <View className="flex-row items-center mt-2">
//             <Grid size={12} color={Colors.body} />
//             <NText className="text-xs text-body  ml-1">{subCount} categories</NText>
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// interface SubCategoryItemProps {
//   category: Category;
//   onPress: (category: Category) => void;
// }

// const SubCategoryItem: React.FC<SubCategoryItemProps> = ({ category, onPress }) => {
//   const subCount = category.subCategories?.length || 0;

//   return (
//     <TouchableOpacity
//       onPress={() => onPress(category)}
//       className="bg-foreground  rounded-xl p-3 mb-2 flex-row items-center border border-border "
//       activeOpacity={0.7}
//     >
//       <Image source={Images.LOGO} className="w-12 h-12 rounded-lg bg-foreground " resizeMode="cover" />
//       <View className="flex-1 ml-3">
//         <View className="flex-row items-center">
//           <NText className="text-sm font-semibold text-heading ">{category.name}</NText>
//           {category.isFeatured && <View className="ml-2 w-1.5 h-1.5 bg-yellow-400 rounded-full" />}
//         </View>
//         {subCount > 0 && <NText className="text-xs text-body mt-0.5">{subCount} subcategories</NText>}
//       </View>
//       <Tag size={16} color="#D1D5DB" />
//     </TouchableOpacity>
//   );
// };

// const CategoryScreen: React.FC = () => {
//   const { categories } = useAppSelector((state) => state.category);
//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
//   const [breadcrumb, setBreadcrumb] = useState<Category[]>([]);

//   useFocusEffect(
//     useCallback(() => {
//       GetAllCategories();
//     }, [])
//   );

//   const handleCategoryPress = useCallback(
//     (category: Category) => {
//       if (category.subCategories && category.subCategories.length > 0) {
//         setSelectedCategory(category);
//         setBreadcrumb([...breadcrumb, category]);
//       } else {
//         console.log("Navigate to products:", category.name, category._id);
//         // Add your navigation logic here
//         // Example: navigation.navigate('ProductList', { categoryId: category._id });
//       }
//     },
//     [breadcrumb]
//   );

//   const handleBack = useCallback(() => {
//     const newBreadcrumb = [...breadcrumb];
//     newBreadcrumb.pop();
//     setBreadcrumb(newBreadcrumb);
//     setSelectedCategory(newBreadcrumb[newBreadcrumb.length - 1] || null);
//   }, [breadcrumb]);

//   const currentCategories = selectedCategory?.subCategories || categories;
//   const isSubView = selectedCategory !== null;

//   return (
//     <SafeAreaView className="flex-1 bg-background">
//       {/* Header */}
//       <View className="px-4 pb-4 bg-background border-b border-border ">
//         <TouchableOpacity onPress={handleBack} disabled={!selectedCategory?.name} className="flex-row items-center gap-2">
//           {selectedCategory?.name && <ArrowLeft size={25} color={Colors.heading} />}
//           <NText className="font-bold text-2xl text-heading capitalize">{selectedCategory?.name || "Categories"}</NText>
//         </TouchableOpacity>
//       </View>

//       {/* Content */}
//       <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
//         {currentCategories && currentCategories.length > 0 ? (
//           isSubView ? (
//             // List view for subcategories
//             <View>
//               {currentCategories.map((category) => (
//                 <SubCategoryItem key={category._id} category={category} onPress={handleCategoryPress} />
//               ))}
//             </View>
//           ) : (
//             // Grid view for main categories
//             <View className="flex-row flex-wrap justify-between">
//               {currentCategories.map((category) => (
//                 <CategoryCard key={category._id} category={category} onPress={handleCategoryPress} />
//               ))}
//             </View>
//           )
//         ) : (
//           <View className="flex-1 items-center justify-center py-20">
//             <Grid size={48} color="#D1D5DB" />
//             <NText className="text-gray-400  text-base mt-4">No categories available</NText>
//           </View>
//         )}

//         {/* Bottom spacing */}
//         <View className="h-8" />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CategoryScreen;

import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { navigate } from "@/utils/NavigationUtils";
import { SafeAreaView } from "react-native-safe-area-context";

// Types
interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  color: string;
  itemCount: number;
  isActive: boolean;
}

const CategoryScreen = () => {
  const [categories] = useState<Category[]>([
    {
      _id: "1",
      name: "Laundry",
      slug: "laundry",
      description: "Professional laundry services at your doorstep",
      icon: "👔",
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600",
      color: "bg-blue-500",
      itemCount: 45,
      isActive: true,
    },
    {
      _id: "2",
      name: "Pharmacy",
      slug: "pharmacy",
      description: "Order medicines and health products online",
      icon: "💊",
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600",
      color: "bg-red-500",
      itemCount: 350,
      isActive: true,
    },
    {
      _id: "3",
      name: "Grocery",
      slug: "grocery",
      description: "Fresh groceries delivered to your home",
      icon: "🛒",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600",
      color: "bg-green-500",
      itemCount: 1200,
      isActive: true,
    },
  ]);

  const handleCategoryPress = (category: Category) => {
    navigate("CategoryProducts");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-background pb-4 px-5 border-b border-gray-200">
        <View className="flex-row items-center">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900">Categories</Text>
            <Text className="text-sm text-gray-500 mt-0.5">Choose a service category</Text>
          </View>
        </View>
      </View>

      {/* Categories List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="p-4">
        {categories.map((category) => (
          <TouchableOpacity
            key={category._id}
            onPress={() => handleCategoryPress(category)}
            className="bg-white rounded-2xl mb-4 overflow-hidden shadow-sm"
            activeOpacity={0.7}
          >
            {/* Category Image */}
            <View className="relative">
              <Image source={{ uri: category.image }} className="w-full h-48" resizeMode="cover" />
              {/* Overlay Gradient Effect */}
              <View className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Icon Badge */}
              <View className={`absolute top-4 left-4 w-14 h-14 rounded-full ${category.color} items-center justify-center shadow-lg`}>
                <Text className="text-3xl">{category.icon}</Text>
              </View>

              {/* Item Count Badge */}
              <View className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full">
                <Text className="text-sm font-semibold text-gray-900">{category.itemCount}+ items</Text>
              </View>

              {/* Category Name Overlay */}
              <View className="absolute bottom-0 left-0 right-0 p-4">
                <Text className="text-2xl font-bold text-white mb-1">{category.name}</Text>
                <Text className="text-sm text-white/90">{category.description}</Text>
              </View>
            </View>

            {/* Quick Action Footer */}
            <View className="flex-row items-center justify-between p-4 border-t border-gray-100">
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                <Text className="text-sm text-gray-600">Available now</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-green-600 font-semibold mr-1">Explore</Text>
                <Text className="text-green-600">→</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Coming Soon Categories */}
        <View className="mt-4">
          <Text className="text-lg font-bold text-gray-900 mb-4 px-1">Coming Soon</Text>

          <View className="flex-row flex-wrap -mx-2">
            {[
              { name: "Electronics", icon: "📱", color: "bg-purple-500" },
              { name: "Beauty", icon: "💄", color: "bg-pink-500" },
              { name: "Food Delivery", icon: "🍔", color: "bg-orange-500" },
              { name: "Pet Care", icon: "🐕", color: "bg-yellow-500" },
            ].map((item, idx) => (
              <View key={idx} className="w-1/2 p-2">
                <View className="bg-white rounded-xl p-4 items-center opacity-60">
                  <View className={`w-16 h-16 rounded-full ${item.color} items-center justify-center mb-3`}>
                    <Text className="text-3xl">{item.icon}</Text>
                  </View>
                  <Text className="font-semibold text-gray-900 mb-1">{item.name}</Text>
                  <View className="bg-gray-100 px-3 py-1 rounded-full">
                    <Text className="text-xs text-gray-600">Coming Soon</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;
