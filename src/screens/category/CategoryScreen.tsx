import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, SlidersHorizontal, Grid3x3, List, ChevronLeft, Heart, Star } from "lucide-react-native";
import Images from "@/constants/Images";
import { Colors } from "@/context/ThemeProvider";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  isFavorite?: boolean;
}

interface CategoryScreenProps {
  categoryName?: string;
  onBack?: () => void;
  onSearch?: (query: string) => void;
  onFilterPress?: () => void;
  onProductPress?: (productId: string) => void;
  onFavoritePress?: (productId: string) => void;
}

const CategoryScreen = ({
  categoryName = "Electronics",
  onBack,
  onSearch,
  onFilterPress,
  onProductPress,
  onFavoritePress,
}: CategoryScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedSort, setSelectedSort] = useState("Popular");

  // Mock product data
  const products: Product[] = [
    {
      id: "1",
      name: "Wireless Headphones Pro",
      price: 129.99,
      originalPrice: 199.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      reviews: 234,
      discount: 35,
      isFavorite: true,
    },
    {
      id: "2",
      name: "Smart Watch Series 5",
      price: 299.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 567,
      isFavorite: false,
    },
    {
      id: "3",
      name: "Bluetooth Speaker Mini",
      price: 49.99,
      originalPrice: 79.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.3,
      reviews: 123,
      discount: 38,
      isFavorite: true,
    },
    {
      id: "4",
      name: "USB-C Fast Charger",
      price: 24.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 89,
      isFavorite: false,
    },
    {
      id: "5",
      name: "Wireless Mouse Gaming",
      price: 59.99,
      originalPrice: 89.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 345,
      discount: 33,
      isFavorite: false,
    },
    {
      id: "6",
      name: "Mechanical Keyboard RGB",
      price: 149.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 678,
      isFavorite: true,
    },
  ];

  const filters = ["All", "On Sale", "New Arrivals", "Top Rated", "Under $50"];
  const sortOptions = ["Popular", "Price: Low to High", "Price: High to Low", "Newest", "Rating"];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    onSearch?.(text);
  };

  const ProductCard = ({ product }: { product: Product }) => {
    if (viewMode === "list") {
      return (
        <TouchableOpacity
          onPress={() => onProductPress?.(product.id)}
          className="bg-foreground border border-border rounded-2xl mb-3 flex-row overflow-hidden active:opacity-70"
          style={{ elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
        >
          <Image source={Images?.LOGO} className="w-28 h-28" resizeMode="cover" />

          <View className="flex-1 p-3 justify-between">
            <View>
              <Text className="text-heading font-semibold text-base mb-1" numberOfLines={2}>
                {product.name}
              </Text>

              <View className="flex-row items-center mb-2">
                <Star size={14} fill="#f0e800" color="#f0e800" />
                <Text className="text-heading font-semibold text-sm ml-1">{product.rating}</Text>
                <Text className="text-body text-xs ml-1">({product.reviews})</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-primary font-bold text-lg">${product.price}</Text>
                {product.originalPrice && <Text className="text-body text-sm line-through ml-2">${product.originalPrice}</Text>}
              </View>

              <TouchableOpacity
                onPress={() => onFavoritePress?.(product.id)}
                className="w-9 h-9 rounded-full bg-background items-center justify-center"
              >
                <Heart size={18} fill={product.isFavorite ? "#00a303" : "none"} color={product.isFavorite ? "#00a303" : "#8E8E8E"} />
              </TouchableOpacity>
            </View>
          </View>

          {product.discount && (
            <View className="absolute top-2 left-2 bg-error px-2 py-1 rounded-lg">
              <Text className="text-white text-xs font-bold">-{product.discount}%</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => onProductPress?.(product.id)}
        className="bg-background rounded-2xl mb-4 overflow-hidden active:opacity-70"
        style={{
          width: "48%",
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      >
        <View className="relative">
          <Image source={Images?.LOGO} className="w-full h-40" resizeMode="cover" />

          {product.discount && (
            <View className="absolute top-2 left-2 bg-error px-2 py-1 rounded-lg">
              <Text className="text-white text-xs font-bold">-{product.discount}%</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={() => onFavoritePress?.(product.id)}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background items-center justify-center"
          >
            <Heart size={16} fill={product.isFavorite ? "#00a303" : "none"} color={product.isFavorite ? "#00a303" : "#8E8E8E"} />
          </TouchableOpacity>
        </View>

        <View className="p-3">
          <Text className="text-heading font-semibold text-sm mb-2" numberOfLines={2}>
            {product.name}
          </Text>

          <View className="flex-row items-center mb-2">
            <Star size={12} fill="#f0e800" color="#f0e800" />
            <Text className="text-heading font-semibold text-xs ml-1">{product.rating}</Text>
            <Text className="text-body text-xs ml-1">({product.reviews})</Text>
          </View>

          <View className="flex-row items-center">
            <Text className="text-primary font-bold text-base">${product.price}</Text>
            {product.originalPrice && <Text className="text-body text-xs line-through ml-2">${product.originalPrice}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 pt-2 pb-3 bg-background border-b border-line">
        <View className="flex-row items-center justify-between mb-3">
          <TouchableOpacity onPress={onBack} className="w-10 h-10 rounded-full bg-background items-center justify-center active:opacity-70">
            <ChevronLeft size={24} color={Colors.heading} />
          </TouchableOpacity>

          <Text className="text-heading font-bold text-xl">{categoryName}</Text>

          <TouchableOpacity
            onPress={onFilterPress}
            className="w-10 h-10 rounded-full bg-background items-center justify-center active:opacity-70"
          >
            <SlidersHorizontal size={20} color={Colors.heading} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-foreground border-border border rounded-xl px-4 py-3">
          <Search size={20} color="#8E8E8E" />
          <TextInput
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search products..."
            placeholderTextColor="#8E8E8E"
            className="flex-1 ml-3 text-heading text-base"
          />
        </View>
      </View>

      {/* Filter Chips */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-3 bg-background border-b border-line">
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              className={`mr-2 px-4 py-2 rounded-full ${selectedFilter === filter ? "bg-primary" : "bg-background"} active:opacity-70`}
            >
              <Text className={`font-semibold text-sm ${selectedFilter === filter ? "text-white" : "text-body"}`}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Sort & View Toggle */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-background">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1 mr-3">
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setSelectedSort(option)}
              className={`mr-2 px-3 py-1.5 rounded-lg ${selectedSort === option ? "bg-secondary" : "bg-transparent"} active:opacity-70`}
            >
              <Text className={`font-medium text-xs ${selectedSort === option ? "text-heading" : "text-body"}`}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-row">
          <TouchableOpacity
            onPress={() => setViewMode("grid")}
            className={`w-9 h-9 rounded-lg items-center justify-center mr-2 ${
              viewMode === "grid" ? "bg-primary" : "bg-background"
            } active:opacity-70`}
          >
            <Grid3x3 size={18} color={viewMode === "grid" ? "#ffffff" : "#8E8E8E"} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setViewMode("list")}
            className={`w-9 h-9 rounded-lg items-center justify-center ${
              viewMode === "list" ? "bg-primary" : "bg-background"
            } active:opacity-70`}
          >
            <List size={18} color={viewMode === "list" ? "#ffffff" : "#8E8E8E"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Products Grid/List */}
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        <View className={viewMode === "grid" ? "flex-row flex-wrap justify-between" : ""}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>

        {/* Load More */}
        <TouchableOpacity className="bg-background border-2 border-primary rounded-xl py-4 mb-6 active:opacity-70">
          <Text className="text-primary font-bold text-center text-base">Load More Products</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;
