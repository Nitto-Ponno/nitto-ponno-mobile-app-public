import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, ShoppingCart, Bell, Heart, Star, ChevronRight, Mic, Plus, TrendingUp, Zap, CloudSun } from "lucide-react-native";
import { Colors, useTheme } from "@/context/ThemeProvider";
import Images from "@/constants/Images";
import FeaturedSection from "@/components/home/FeaturedSection";
import SelectionModal from "@/components/product/SelectionModal";
import { showToast } from "@/utils/commonFunction";
import { navigate } from "@/utils/NavigationUtils";
import { useAppSelector } from "@/store";

// Main Screen
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("1");
  const [favorites, setFavorites] = useState<string[]>(products.filter((p) => p.isFavorite).map((p) => p.id));
  const [showBanner, setShowBanner] = useState(true);
  const { toggleTheme } = useTheme();

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]));
  };

  const handleAddToCart = (id: string) => {
    console.log("[v0] Add to cart:", id);
  };

  const handleSearch = () => {
    console.log("[v0] Open search");
    toggleTheme();
  };

  const handleSelectCategory = (id: string) => {
    setActiveCategory(id);
    console.log("[v0] Selected category:", id);
  };

  const handleSeeAll = (section: string) => {
    console.log("[v0] See all:", section);
  };

  const productsWithFavorites = products.map((p) => ({
    ...p,
    isFavorite: favorites.includes(p.id),
  }));

  const featuredProducts = productsWithFavorites.filter((p) => p.tags.includes("featured"));

  return (
    <SafeAreaView className="flex-1 bg-background " edges={["top"]}>
      <TopBar />
      <SearchBar onSearch={handleSearch} />
      <ScrollView showsVerticalScrollIndicator={false} bounces={true} className="flex-1">
        <CategoryChips categories={categories} activeId={activeCategory} onSelect={handleSelectCategory} />
        <PromoCarousel promos={promos} />
        <FeaturedSection />
        <SelectionModal />
      </ScrollView>
    </SafeAreaView>
  );
}

/*
 * HOW TO WIRE UP REAL DATA:
 *
 * 1. Replace mock data with API calls:
 *    - Use fetch or axios to get products from your backend
 *    - Consider using SWR or React Query for caching and state management
 *
 * 2. Image CDN:
 *    - Replace placeholder.svg URLs with your CDN URLs
 *    - Use optimized image formats (WebP, AVIF)
 *    - Implement lazy loading for better performance
 *
 * 3. State Management:
 *    - Move favorites and cart to global state (Context, Redux, Zustand)
 *    - Persist cart and favorites to AsyncStorage
 *
 * 4. Navigation:
 *    - Integrate React Navigation for screen transitions
 *    - Add product detail screen, search screen, etc.
 *
 * 5. Dark Mode:
 *    - Wrap your app with a theme provider
 *    - Use NativeWind's dark mode: <View className="dark">
 *    - Or use system color scheme with useColorScheme()
 */

// import { View, Text, TouchableOpacity } from "react-native";
// import React from "react";
// import GContainer from "@/components/global/GContainer";
// import NText from "@/components/global/NText";
// import { Colors, useTheme } from "@/context/ThemeProvider";
// import { Camera, Moon, ThermometerSun } from "lucide-react-native";

// const HomeScreen = () => {
//   const { toggleTheme, theme } = useTheme();
//   return (
//     <GContainer safe={true} centered={true}>
//       <NText style={{ color: Colors.primary }} className="text-xl font-FFRegular ">
//         Welcome to Nitto Ponno!
//       </NText>
//       <TouchableOpacity
//         className="bg-foreground h-14 flex-row   justify-center items-center px-4 rounded-full"
//         onPress={() => {
//           toggleTheme();
//         }}
//       >
//         <NText className="capitalize text-heading">{theme}</NText>
//         <Moon color={Colors.heading} size={20} />
//       </TouchableOpacity>
//     </GContainer>
//   );
// };

// export default HomeScreen;

// Mock Data
const categories = [
  { id: "1", label: "Electronics", icon: "📱" },
  { id: "2", label: "Fashion", icon: "👕" },
  { id: "3", label: "Home", icon: "🏠" },
  { id: "4", label: "Beauty", icon: "💄" },
  { id: "5", label: "Sports", icon: "⚽" },
  { id: "6", label: "Books", icon: "📚" },
  { id: "7", label: "Toys", icon: "🧸" },
  { id: "8", label: "Food", icon: "🍔" },
];

const promos = [
  {
    id: "1",
    title: "Summer Sale",
    subtitle: "Up to 50% Off",
    description: "On selected items",
    image: "https://placeholder.svg?height=200&width=400&query=summer+sale+banner",
    color: "bg-primary",
  },
  {
    id: "2",
    title: "New Arrivals",
    subtitle: "Fresh Styles",
    description: "Check out the latest trends",
    image: "https://placeholder.svg?height=200&width=400&query=new+arrivals+fashion",
    color: "bg-secondary",
  },
  {
    id: "3",
    title: "Flash Deals",
    subtitle: "24 Hours Only",
    description: "Limited time offers",
    image: "https://placeholder.svg?height=200&width=400&query=flash+deals",
    color: "bg-primary",
  },
];

const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    brand: "AudioTech",
    price: 129.99,
    currency: "$",
    rating: 4.5,
    image: "https://placeholder.svg?height=200&width=200&query=wireless+headphones",
    isFavorite: false,
    discountPct: 20,
    tags: ["electronics", "featured"],
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    brand: "TechWear",
    price: 299.99,
    currency: "$",
    rating: 4.8,
    image: "https://placeholder.svg?height=200&width=200&query=smart+watch",
    isFavorite: true,
    discountPct: 0,
    tags: ["electronics", "trending"],
  },
  {
    id: "3",
    name: "Running Shoes",
    brand: "SportMax",
    price: 89.99,
    currency: "$",
    rating: 4.3,
    image: "https://placeholder.svg?height=200&width=200&query=running+shoes",
    isFavorite: false,
    discountPct: 15,
    tags: ["sports", "featured"],
  },
  {
    id: "4",
    name: "Leather Backpack",
    brand: "UrbanStyle",
    price: 159.99,
    currency: "$",
    rating: 4.6,
    image: "https://placeholder.svg?height=200&width=200&query=leather+backpack",
    isFavorite: false,
    discountPct: 0,
    tags: ["fashion"],
  },
  {
    id: "5",
    name: "Coffee Maker",
    brand: "BrewMaster",
    price: 79.99,
    currency: "$",
    rating: 4.4,
    image: "https://placeholder.svg?height=200&width=200&query=coffee+maker",
    isFavorite: true,
    discountPct: 25,
    tags: ["home"],
  },
  {
    id: "6",
    name: "Yoga Mat Premium",
    brand: "FitLife",
    price: 49.99,
    currency: "$",
    rating: 4.7,
    image: "https://placeholder.svg?height=200&width=200&query=yoga+mat",
    isFavorite: false,
    discountPct: 10,
    tags: ["sports"],
  },
];

// Components
const TopBar = ({ notificationCount = 5 }) => {
  const { toggleTheme } = useTheme();
  const { cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-background">
      <View className="flex-row items-center gap-3">
        {
          <View className="w-10 h-10 bg-primary rounded-full items-center justify-center">
            <Text className="text-white text-xl font-bold">{user?.fullName.slice(0, 1) || "U"}</Text>
          </View>
        }
        <View>
          <Text className="text-base font-bold text-heading">
            <Text className="text-xs text-body">Hello,</Text>
            {user?.name.firstName || "User"}
          </Text>
          <Text className="text-sm text-body opacity-70">Welcome back 👋</Text>
        </View>
      </View>

      <View className="flex-row items-center gap-4">
        <Pressable
          onPress={() => {
            toggleTheme();
          }}
          className="relative"
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <CloudSun size={28} color={Colors.heading} />
        </Pressable>
        <Pressable
          onPress={() => {
            showToast({ message: "Coming soon..." });
          }}
          className="relative"
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <Bell size={24} color={Colors.heading} />
          {notificationCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-error rounded-full w-4 h-4 items-center justify-center">
              <Text className="text-white text-[10px] font-bold">{notificationCount}</Text>
            </View>
          )}
        </Pressable>

        <Pressable
          onPress={() => {
            navigate("CartStack", { screen: "Cart" });
          }}
          className="relative"
          accessibilityRole="button"
          accessibilityLabel="Shopping cart"
        >
          <ShoppingCart size={24} color={Colors.heading} />
          {cartItems.length > 0 && (
            <View className="absolute -top-1 -right-1 bg-primary rounded-full w-4 h-4 items-center justify-center">
              <Text className="text-white text-[10px] font-bold">{cartItems.length}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const SearchBar = ({ onSearch }: { onSearch?: () => void }) => {
  return (
    <View className="px-4 py-3 ">
      <Pressable
        onPress={onSearch}
        className="flex-row border border-border items-center bg-foreground rounded-xl px-4 py-3 gap-3"
        accessibilityRole="search"
        accessibilityLabel="Search products"
      >
        <Search size={20} color="#8E8E8E" />
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#8E8E8E"
          className="flex-1 text-heading text-base"
          editable={false}
        />
        <Mic size={20} color="#00a303" />
      </Pressable>
    </View>
  );
};

const CategoryChips = ({ categories, activeId, onSelect }: { categories: any; activeId: string; onSelect: (id: string) => void }) => {
  return (
    <View className="py-2">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4 gap-2">
        {categories.map((category: any) => {
          const isActive = category.id === activeId;
          return (
            <Pressable
              key={category.id}
              onPress={() => onSelect(category.id)}
              className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${
                isActive ? "bg-primary" : "bg-foreground border border-border"
              }`}
              accessibilityRole="button"
              accessibilityLabel={`Category ${category.label}`}
            >
              <Text className="text-base">{category.icon}</Text>
              <Text className={`text-sm font-medium ${isActive ? "text-white" : "text-heading"}`}>{category.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const PromoCarousel = ({ promos }: { promos: any }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View className="py-4">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
          setActiveIndex(index);
        }}
        contentContainerClassName="px-4 gap-4"
      >
        {promos.map((promo: any) => (
          <Pressable
            key={promo.id}
            className="w-[340px] bg-red-500 border border-border min-h-36 rounded-2xl overflow-hidden"
            accessibilityRole="button"
            accessibilityLabel={`Promo: ${promo.title}`}
          >
            <Image source={require("../../assets/images/icon.jpg")} className="w-10 h-10" resizeMode="cover" />
            <View className="absolute bg-foreground inset-0 p-6 justify-end">
              <View className="bg-secondary px-3 py-1 rounded-full self-start mb-2">
                <Text className="text-xs font-bold text-gray-700">{promo.description}</Text>
              </View>
              <Text className="text-3xl font-bold text-heading mb-1">{promo.title}</Text>
              <Text className="text-lg text-body">{promo.subtitle}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View className="flex-row justify-center gap-2 mt-3">
        {promos.map((_: any, index: number) => (
          <View key={index} className={`h-2 rounded-full ${index === activeIndex ? "w-6 bg-primary" : "w-2 bg-line"}`} />
        ))}
      </View>
    </View>
  );
};

const SectionHeader = ({ title, onSeeAll, icon }: { title: string; onSeeAll?: () => void; icon?: React.ReactNode }) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <View className="flex-row items-center gap-2">
        {icon}
        <Text className="text-2xl font-bold text-heading">{title}</Text>
      </View>
      {onSeeAll && (
        <Pressable
          onPress={onSeeAll}
          className="flex-row items-center gap-1"
          accessibilityRole="button"
          accessibilityLabel={`See all ${title}`}
        >
          <Text className="text-sm font-medium text-primary">See All</Text>
          <ChevronRight size={16} color="#00a303" />
        </Pressable>
      )}
    </View>
  );
};

const ProductCard = ({
  product,
  onToggleFavorite,
  onAddToCart,
  horizontal = false,
}: {
  product: (typeof products)[0];
  onToggleFavorite?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  horizontal?: boolean;
}) => {
  const containerClass = horizontal ? "w-52" : "flex-1";

  return (
    <Pressable
      className={`${containerClass} bg-foreground rounded-2xl overflow-hidden border border-border`}
      accessibilityRole="button"
      accessibilityLabel={`Product: ${product.name}`}
    >
      <View className="relative">
        <Image source={Images.LOGO} className="w-full h-40" resizeMode="cover" />

        {product.discountPct > 0 && (
          <View className="absolute top-2 left-2 bg-error px-2 py-1 rounded-full">
            <Text className="text-xs font-bold text-white">-{product.discountPct}%</Text>
          </View>
        )}

        <Pressable
          onPress={() => onToggleFavorite?.(product.id)}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full items-center justify-center"
          accessibilityRole="button"
          accessibilityLabel={product.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={18} color={product.isFavorite ? "#db2500" : "#8E8E8E"} fill={product.isFavorite ? "#db2500" : "transparent"} />
        </Pressable>
      </View>

      <View className="p-3">
        <Text className="text-xs text-body mb-1">{product.brand}</Text>
        <Text className="text-sm font-semibold text-heading mb-2" numberOfLines={2}>
          {product.name}
        </Text>

        <View className="flex-row items-center gap-1 mb-2">
          <Star size={14} color="#f0e800" fill="#f0e800" />
          <Text className="text-xs text-heading font-medium">{product.rating}</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold text-primary">
            {product.currency}
            {product.price.toFixed(2)}
          </Text>

          <Pressable
            onPress={() => onAddToCart?.(product.id)}
            className="w-8 h-8 bg-primary rounded-full items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Add to cart"
          >
            <Plus size={18} color="#ffffff" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const BottomBanner = ({ onDismiss }: { onDismiss?: () => void }) => {
  return (
    <View className="mx-4 my-4 bg-primary/10 rounded-2xl p-4 flex-row items-center justify-between border border-primary/20">
      <View className="flex-row items-center gap-3 flex-1">
        <View className="w-10 h-10 bg-primary rounded-full items-center justify-center">
          <Zap size={20} color="#ffffff" />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-bold text-heading">Free Shipping</Text>
          <Text className="text-xs text-body">On orders over $50</Text>
        </View>
      </View>
      {onDismiss && (
        <Pressable
          onPress={onDismiss}
          className="w-6 h-6 items-center justify-center"
          accessibilityRole="button"
          accessibilityLabel="Dismiss banner"
        >
          <Text className="text-body text-lg">×</Text>
        </Pressable>
      )}
    </View>
  );
};
