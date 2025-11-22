import Images from "@/constants/Images";
import { Product } from "@/services/types/productTypes";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface ProductCardV1Props {
  product: Product;
  onPress?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductCardV1: React.FC<ProductCardV1Props> = ({ product, onPress, onAddToCart }) => {
  const hasDiscount = product.discount && product.discount.value > 0;
  const discountText = hasDiscount
    ? product.discount?.type === "percent"
      ? `${product.discount.value}% OFF`
      : `৳${product?.discount?.value} OFF`
    : null;

  const formatPrice = (price: number) => `৳${price.toLocaleString()}`;

  const availableVariations = product.variations.filter((v) => v.isAvailable);
  const hasVariations = availableVariations.length > 0;

  return (
    <TouchableOpacity
      className="bg-card rounded-3xl border border-border  overflow-hidden"
      activeOpacity={0.7}
      onPress={() => onPress?.(product)}
    >
      {/* Image Section */}
      <View className="relative">
        <Image source={Images.LOGO} className="w-full h-32 bg-gray-100" resizeMode="cover" />

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
                <Text className="text-gray-500 text-xs">+{product.services.length - 2}</Text>
              </View>
            )}
          </View>
        )}

        {/* Product Name */}
        <Text className="text-gray-900 font-semibold text-base mb-1" numberOfLines={2}>
          {product.name}
        </Text>

        {/* Description */}
        <Text className="text-gray-500 text-xs mb-2" numberOfLines={2}>
          {product.description}
        </Text>

        {/* Attributes */}
        {product.attributes.length > 0 && (
          <View className="flex-row flex-wrap gap-1">
            {product.attributes.map((attr) => (
              <View key={attr._id} className="bg-gray-100 px-2 py-0.5 rounded">
                <Text className="text-gray-600 text-xs">{attr.name}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Price Section */}
        {/* <View className="flex-row items-center justify-between mt-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-primary-600 font-bold text-lg">{formatPrice(product.finalPrice)}</Text>
            {hasDiscount && <Text className="text-gray-400 text-sm line-through">{formatPrice(product.price)}</Text>}
          </View>

          {hasVariations && (
            <Text className="text-gray-400 text-xs">
              {availableVariations.length} option{availableVariations.length > 1 ? "s" : ""}
            </Text>
          )}
        </View> */}

        {/* Add to Cart Button */}
        <TouchableOpacity
          className={`mt-3 h-12  justify-center rounded-xl items-center ${hasVariations ? "bg-primary" : "bg-gray-400"}`}
          disabled={!hasVariations}
          onPress={() => onAddToCart?.(product)}
          activeOpacity={0.8}
        >
          <Text className={`font-bold text-lg ${hasVariations ? "text-white" : "text-gray-500"}`}>
            {hasVariations ? "Add to Cart" : "Unavailable"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardV1;
