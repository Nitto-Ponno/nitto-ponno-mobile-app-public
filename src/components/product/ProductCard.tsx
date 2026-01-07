import Images from "@/constants/Images";
import { Product } from "@/services/types/productTypes";
import { dispatch, useAppSelector } from "@/store";
import { cn } from "@/utils/cn";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { addToWishlist } from "@/store/reducer/wishlistReducer";
import { Colors } from "@/context/ThemeProvider";
import { PressableScale } from "../common/PressableScale";
import { setSelectedProduct, setSelectionModal } from "@/store/reducer/productReducer";

const ProductCard = ({
  product,
  variant = "v1",
  onPress,
}: {
  product: Product;
  variant: "v1" | "v2";
  onPress: (product: Product) => void;
}) => {
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const hasDiscount = product.discount && product.discount.value > 0;
  const discountText = hasDiscount
    ? product.discount?.type === "percent"
      ? `${product.discount.value}% OFF`
      : `৳${product?.discount?.value} OFF`
    : null;

  const availableVariations = product.variations.filter((v) => v.isAvailable);
  const hasVariations = availableVariations.length > 0;
  const isListed = wishlist?.some((item) => item._id === product._id);
  const containerStyle = variant === "v1" ? { flex: 0.5 } : {};
  const containerWidth = variant === "v2" ? "w-64" : "";
  return (
    <PressableScale
      onPress={() => {
        onPress && onPress(product);
      }}
      className={cn("bg-card border border-border overflow-hidden rounded-3xl", containerWidth)}
      style={containerStyle}
    >
      <View className="relative">
        <Image source={Images.LOGO} className="w-full h-40 bg-gray-100" resizeMode="cover" />
        <TouchableOpacity
          onPress={() => {
            dispatch(addToWishlist(product));
          }}
          className="z-10 absolute h-10 w-10 rounded-full justify-center items-center top-3 right-3"
        >
          <Ionicons name={isListed ? "heart" : "heart-outline"} size={30} color={Colors.primary} />
        </TouchableOpacity>
        {/* Discount Badge */}
        {hasDiscount && (
          <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-full">
            <Text className="text-white text-xs font-bold">{discountText}</Text>
          </View>
        )}

        {/* Availability Badge */}
        {!hasVariations && (
          <View className="absolute top-2 right-2 bg-gray-800/70 px-2 py-1 rounded-full">
            <Text className="text-white text-xs">Out of Stock</Text>
          </View>
        )}
      </View>

      {/* Content Section */}
      <View className="p-3">
        {/* Service Tags */}
        {product.services.length > 0 && (
          <View className="flex-row flex-wrap gap-1 mb-2">
            {product.services.slice(0, 2).map((service) => (
              <View key={service._id} className="bg-blue-50 px-2 py-0.5 rounded-full">
                <Text className="text-blue-600 text-xs font-medium" numberOfLines={1}>
                  {service.name}
                </Text>
              </View>
            ))}
            {product.services.length > 2 && (
              <View className="bg-gray-100 px-2 py-0.5 rounded-full">
                <Text className="text-body text-xs">+{product.services.length - 2}</Text>
              </View>
            )}
          </View>
        )}

        {/* Product Name */}
        <Text className="text-heading font-semibold text-base mb-1" numberOfLines={1}>
          {product.name}
        </Text>

        {/* Description */}
        <Text className="text-body text-xs mb-2" numberOfLines={2}>
          {product.description}
        </Text>

        {/* Attributes */}
        {product.attributes.length > 0 && (
          <View className="flex-row flex-wrap gap-1">
            {product.attributes.map((attr) => (
              <View key={attr._id} className="bg-gray-100 px-2 py-0.5 rounded">
                <Text className="text-body text-xs">{attr.name}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Add to Cart Button */}
        <PressableScale
          className={`mt-3 h-12  justify-center rounded-3xl items-center ${hasVariations ? "bg-primary" : "bg-body"}`}
          disabled={!hasVariations}
          onPress={() => {
            dispatch(setSelectedProduct(product));
            dispatch(setSelectionModal(true));
          }}
          // activeOpacity={0.8}
        >
          <Text className={`font-bold text-lg ${hasVariations ? "text-white" : "text-body"}`}>
            {hasVariations ? "Add to Cart" : "Unavailable"}
          </Text>
        </PressableScale>
      </View>
    </PressableScale>
  );
};

export default ProductCard;
