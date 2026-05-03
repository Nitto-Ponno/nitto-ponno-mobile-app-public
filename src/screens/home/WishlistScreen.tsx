import { View, Text, TouchableOpacity, FlatList, Pressable } from "react-native";
import React from "react";
import { dispatch, useAppSelector } from "@/store";
import { addToWishlist, clearWishlist } from "@/store/reducer/wishlistReducer";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "@/utils/NavigationUtils";
import { ArrowLeft } from "lucide-react-native";
import { Colors } from "@/context/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import SelectionModal from "@/components/product/SelectionModal";
import { setSelectedProduct, setSelectionModal } from "@/store/reducer/productReducer";
import { Product } from "@/services/types/productTypes";

const WishlistScreen = () => {
  const { wishlist = [] } = useAppSelector((state) => state.wishlist);

  const calculateDiscountPercentage = (item: Product) => {
    if (item?.discount?.type === "percent") {
      return item.discount.value;
    }
    return Math.round(((item?.discount?.value ?? 0) / item?.price) * 100);
  };

  const renderItem = ({ item }: { item: Product }) => {
    const discountPercent = calculateDiscountPercentage(item);

    return (
      <View className="bg-foreground border-border border rounded-2xl mb-4 overflow-hidden">
        <View className="flex-row">
          <View className="flex-1 p-4">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-base font-semibold text-heading flex-1 pr-2" numberOfLines={2}>
                {item.name}
              </Text>

              <TouchableOpacity onPress={() => dispatch(addToWishlist(item))} className="p-1">
                <Ionicons name="heart" size={25} color={Colors.primary} />
              </TouchableOpacity>
            </View>

            <Text className="text-sm text-body mb-2" numberOfLines={2}>
              {item.description}
            </Text>

            {/* Services */}
            {item.services.length > 0 && (
              <View className="flex-row flex-wrap mb-2">
                {item.services.slice(0, 2).map((service) => (
                  <View key={service._id} className="bg-green-50 px-2 py-1 rounded-md mr-2 mb-1">
                    <Text className="text-xs text-green-700">{service.name}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Price */}
            <View className="flex-row items-center justify-between mt-auto">
              <View className="flex-row items-center">
                <Text className="text-lg font-bold text-heading">৳{item.finalPrice}</Text>
                {item.price > item.finalPrice && <Text className="text-sm text-gray-400 line-through ml-2">৳{item.price}</Text>}
                {discountPercent > 0 && (
                  <View className="bg-red-500 px-2 py-1 rounded-md ml-2">
                    <Text className="text-white text-xs font-bold">-{discountPercent}%</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={() => {
                  dispatch(setSelectedProduct(item));
                  dispatch(setSelectionModal(true));
                }}
                className="bg-green-600 px-4 py-2 rounded-lg"
              >
                <Text className="text-white text-sm font-semibold">Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const EmptyWishlist = () => (
    <View className="flex-1 items-center justify-center px-8 py-20">
      <Text className="text-6xl mb-4">♡</Text>
      <Text className="text-xl font-bold text-heading mb-2">Your Wishlist is Empty</Text>
      <Text className="text-body text-center mb-6">Save your favorite items here and never lose track of what you love</Text>
      <TouchableOpacity
        onPress={() => {
          navigate("BottomTabNavigator", { screen: "HomeStack", params: { screen: "Home" } });
        }}
        className="bg-green-600 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row justify-between items-center pb-3  px-5 border-b border-border">
        <View className="flex-row items-center gap-3 ">
          <Pressable onPress={() => goBack()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-100">
            <ArrowLeft size={24} color={Colors.body} />
          </Pressable>
          <Text className="text-2xl font-bold text-heading ">My Wishlist</Text>
        </View>
        {wishlist && wishlist?.length > 0 && (
          <TouchableOpacity onPress={() => dispatch(clearWishlist())} className="px-4 py-2 bg-red-50 rounded-lg">
            <Text className="text-red-600 font-semibold">Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      {wishlist && wishlist.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <FlatList
          data={wishlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerClassName="p-4"
          showsVerticalScrollIndicator={false}
        />
      )}

      <SelectionModal />

      {/* Bottom Action Bar */}
      {wishlist && wishlist.length > 0 && (
        <View className="bg-background border-t border-border px-5 py-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-body">Total Value</Text>
            <Text className="text-xl font-bold text-heading">৳{wishlist.reduce((sum, item) => sum + item.finalPrice, 0)}</Text>
          </View>
          {/* <TouchableOpacity className="bg-green-600 py-4 rounded-xl items-center">
            <Text className="text-white font-bold text-base">Add All to Cart</Text>
          </TouchableOpacity> */}
        </View>
      )}
    </SafeAreaView>
  );
};

export default WishlistScreen;
