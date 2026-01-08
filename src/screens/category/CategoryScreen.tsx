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
import React, { useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { navigate } from "@/utils/NavigationUtils";
// optional toast
import { showToast } from "@/utils/commonFunction";

// Lucide Icons
import { Shirt, Pill, ShoppingBasket, ArrowRight, Lock, Sparkles } from "lucide-react-native";
import TitleHeader from "@/components/common/TitleHeader";

// Types
interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  isActive: boolean;
  gradientLabel: string; // for tag text
}

const CategoryScreen = () => {
  const categories = useMemo<Category[]>(
    () => [
      {
        _id: "1",
        name: "Laundry",
        slug: "laundry",
        description: "Professional laundry services at your doorstep",
        image:
          "https://img.freepik.com/free-vector/apartment-building-site-laundry-room-cartoon-composition-with-tenants-using-washing-machine-detergent-bottles-illustration_1284-64894.jpg?t=st=1767878391~exp=1767881991~hmac=244752fe02344be7d4ecff8ffabf9ac2e273dc0f0fbfc51ec6df62ce6f38ada5&w=2000",
        itemCount: 45,
        isActive: true,
        gradientLabel: "Available now",
      },
      {
        _id: "2",
        name: "Pharmacy",
        slug: "pharmacy",
        description: "Order medicines and health products online",
        image:
          "https://img.freepik.com/free-vector/tiny-pharmacist-with-pills-vitamins-flat-vector-illustration-doctors-writing-prescriptions-antibiotics-working-together-helping-patients-cure-pharmacy-business-drugstore-concept_74855-23225.jpg?t=st=1767878516~exp=1767882116~hmac=32e931428bc24f3c6c9b6fde972c8f6907996b8435447470e177a83944c1f603&w=2000",
        itemCount: 350,
        isActive: false,
        gradientLabel: "Coming soon",
      },
      {
        _id: "3",
        name: "Grocery",
        slug: "grocery",
        description: "Fresh groceries delivered to your home",
        image:
          "https://img.freepik.com/free-vector/flat-people-order-food-online-grocery-shopping-from-mobile-application-internet-purchases-with-home-delivery-from-supermarket-store-smartphone-screen-with-buy-button-basket-full-products_88138-856.jpg?uid=R154679726&ga=GA1.1.1312291187.1763529352&semt=ais_hybrid&w=740&q=80",
        itemCount: 1200,
        isActive: false,
        gradientLabel: "Coming soon",
      },
    ],
    []
  );

  const getIcon = (slug: string) => {
    switch (slug) {
      case "laundry":
        return Shirt;
      case "pharmacy":
        return Pill;
      case "grocery":
        return ShoppingBasket;
      default:
        return Sparkles;
    }
  };

  const handleCategoryPress = (category: Category) => {
    if (!category.isActive) {
      showToast?.({ message: `${category.name} coming soon...` });
      return;
    }
    navigate("CategoryProducts", { slug: "laundry" });
  };

  return (
    <View className="flex-1 bg-background">
      <TitleHeader title="Categories" canGoBack={false} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="px-4 pb-10">
        {/* Section Title */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-bold text-gray-900">Services</Text>
          <View className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full">
            <Sparkles size={14} color="#111827" />
            <Text className="text-xs text-gray-800 ml-1">New features coming</Text>
          </View>
        </View>

        {/* Main Cards */}
        {categories.map((category) => {
          const Icon = getIcon(category.slug);

          return (
            <TouchableOpacity
              key={category._id}
              onPress={() => handleCategoryPress(category)}
              activeOpacity={category.isActive ? 0.85 : 1}
              className={`rounded-2xl mb-4 overflow-hidden bg-white shadow-sm ${category.isActive ? "" : "opacity-70"}`}
            >
              {/* Image */}
              <View className="relative">
                <Image source={{ uri: category.image }} className="w-full h-44" resizeMode="cover" />

                {/* overlay */}
                <View className="absolute inset-0 bg-black/35" />

                {/* Icon badge */}
                <View
                  className={`absolute top-4 left-4 w-12 h-12 rounded-2xl items-center justify-center ${
                    category.isActive ? "bg-white/90" : "bg-white/70"
                  }`}
                >
                  <Icon size={26} color="#111827" />
                </View>

                {/* Status badge */}
                <View className={`absolute top-4 right-4 px-3 py-1.5 rounded-full ${category.isActive ? "bg-green-600" : "bg-gray-800"}`}>
                  <Text className="text-xs font-semibold text-white">{category.isActive ? "AVAILABLE" : "COMING SOON"}</Text>
                </View>

                {/* Title / Desc */}
                <View className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-2xl font-bold text-white">{category.name}</Text>
                  <Text className="text-sm text-white/90 mt-1">{category.description}</Text>

                  {/* item count */}
                  <View className="mt-3 flex-row items-center">
                    <View className="bg-white/20 px-3 py-1 rounded-full">
                      <Text className="text-xs text-white font-semibold">{category.itemCount}+ items</Text>
                    </View>

                    {!category.isActive && (
                      <View className="ml-2 flex-row items-center bg-white/20 px-3 py-1 rounded-full">
                        <Lock size={14} color="white" />
                        <Text className="text-xs text-white font-semibold ml-1">Locked</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Footer */}
              <View className="flex-row items-center justify-between p-4 border-t border-gray-100">
                <View className="flex-row items-center">
                  <View className={`w-2 h-2 rounded-full mr-2 ${category.isActive ? "bg-green-500" : "bg-gray-400"}`} />
                  <Text className="text-sm text-gray-700">{category.isActive ? "Available now" : "Launching soon — stay tuned"}</Text>
                </View>

                <View className="flex-row items-center">
                  <Text className={`font-semibold mr-1 ${category.isActive ? "text-green-600" : "text-gray-400"}`}>
                    {category.isActive ? "Explore" : "Soon"}
                  </Text>
                  <ArrowRight size={18} color={category.isActive ? "#16a34a" : "#9ca3af"} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryScreen;
