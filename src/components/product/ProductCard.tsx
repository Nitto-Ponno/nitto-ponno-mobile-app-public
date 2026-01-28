import Images from "@/constants/Images";
import { Product } from "@/services/types/productTypes";
import { dispatch, useAppSelector } from "@/store";
import { cn } from "@/utils/cn";
import { Image, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { addToWishlist } from "@/store/reducer/wishlistReducer";
import { Colors } from "@/context/ThemeProvider";
import { PressableScale } from "../common/PressableScale";
import { setSelectedProduct, setSelectionModal } from "@/store/reducer/productReducer";
import NText from "../global/NText";
import { calculateFinalPrice } from "@/utils/commonFunction";

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
  const { finalPrice, originalPrice } = calculateFinalPrice(
    product.variations[0].price || 0,
    product.variations[0].discount || { type: "percent", value: 0 },
  );
  return (
    <PressableScale
      onPress={() => {
        onPress && onPress(product);
      }}
      className={cn("bg-foreground border-border overflow-hidden rounded-3xl border", containerWidth)}
      style={containerStyle}
    >
      <View className="relative">
        <Image source={Images.LOGO} className="h-40 w-full bg-gray-100" resizeMode="cover" />
        <TouchableOpacity
          onPress={() => {
            dispatch(addToWishlist(product));
          }}
          className="absolute right-3 top-3 z-10 h-10 w-10 items-center justify-center rounded-full"
        >
          <Ionicons name={isListed ? "heart" : "heart-outline"} size={30} color={Colors.primary} />
        </TouchableOpacity>
        {/* Discount Badge */}
        {hasDiscount && (
          <View className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1">
            <NText className="text-xs font-bold text-white">{discountText}</NText>
          </View>
        )}

        {/* Availability Badge */}
        {!hasVariations && (
          <View className="absolute right-2 top-2 rounded-full bg-gray-800/70 px-2 py-1">
            <NText className="text-xs text-white">Out of Stock</NText>
          </View>
        )}
      </View>

      {/* Content Section */}
      <View className="gap-1 p-3">
        {/* Service Tags */}
        {product.services.length > 0 && (
          <View className="flex-row flex-wrap gap-1">
            {product.services.slice(0, 2).map((service) => (
              <View key={service._id} className="rounded-full border border-blue-300 bg-blue-50 px-2 py-0.5">
                <NText className="text-xs font-medium text-blue-600" numberOfLines={1}>
                  {service.name}
                </NText>
              </View>
            ))}
            {product.services.length > 2 && (
              <View className="rounded-full bg-gray-100 px-2 py-0.5">
                <NText className="text-body text-xs">+{product.services.length - 2}</NText>
              </View>
            )}
          </View>
        )}

        {/* Product Name */}
        <NText className="text-heading text-base font-semibold" numberOfLines={1}>
          {product.name}
        </NText>

        {/* Attributes */}
        {product.attributes.length > 0 && (
          <View className="flex-row flex-wrap gap-1">
            {product.attributes.map((attr) => (
              <View key={attr._id} className="rounded border border-gray-300 bg-gray-100 px-2 py-0.5">
                <NText className="text-body text-xs">{attr.name}</NText>
              </View>
            ))}
          </View>
        )}
        <View className="flex-row items-center">
          {originalPrice > finalPrice && <NText className="text-body text-lg font-semibold line-through">৳{originalPrice}</NText>}
          <NText className="font-okra text-primary text-2xl font-bold">৳{finalPrice}</NText>
        </View>
        {/* Add to Cart Button */}
        <PressableScale
          className={`mt-2 h-12  items-center justify-center rounded-3xl ${hasVariations ? "bg-primary" : "bg-body"}`}
          disabled={!hasVariations}
          onPress={() => {
            dispatch(setSelectedProduct(product));
            dispatch(setSelectionModal(true));
          }}
          // activeOpacity={0.8}
        >
          <NText className={`text-lg font-bold ${hasVariations ? "text-white" : "text-body"}`}>
            {hasVariations ? "Add to Cart" : "Unavailable"}
          </NText>
        </PressableScale>
      </View>
    </PressableScale>
  );
};

export default ProductCard;
