import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useAppSelector } from "@/store";
import ProductCardV1 from "../card/ProductCardV1";
import { showToast } from "@/utils/commonFunction";
import { getFeaturedProducts, getSingleProduct } from "@/services/api/productApi";

const FeaturedSection = () => {
  const { products } = useAppSelector((state) => state.product);
  useEffect(() => {
    (async () => {
      await getFeaturedProducts();
    })();

    return () => {};
  }, []);

  return (
    <View>
      <Text className=" px-3 text-2xl font-bold text-heading mb-2">Laundry Products</Text>
      <View className="px-3 gap-3">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <ProductCardV1
              product={product}
              key={product.id}
              onAddToCart={() => {
                showToast({ message: "Coming soon..." });
              }}
              onPress={(p) => {
                getSingleProduct({ productId: p._id });
              }}
            />
          ))}
      </View>
    </View>
  );
};

export default FeaturedSection;
