import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { dispatch, useAppSelector } from "@/store";
import ProductCardV1 from "../card/ProductCardV1";
import { getFeaturedProducts } from "@/services/api/productApi";
import { navigate } from "@/utils/NavigationUtils";
import { setSelectedProduct, setSelectionModal } from "@/store/reducer/productReducer";
import { showToast } from "@/utils/commonFunction";

const FeaturedSection = () => {
  const { products } = useAppSelector((state) => state.product);
  useEffect(() => {
    (async () => {
      await getFeaturedProducts();
    })();

    return () => {};
  }, []);

  return (
    <View className="pb-3">
      <Text className="px-3 text-2xl font-bold text-heading mb-2">Laundry Products</Text>
      <View className="px-3 gap-3">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <ProductCardV1
              product={product}
              key={product.id}
              onAddToCart={() => {
                showToast({ message: "Add to cart Pressed" });
                dispatch(setSelectedProduct(product));
                dispatch(setSelectionModal(true));
              }}
              onPress={(p) => {
                dispatch(setSelectedProduct(p));
                navigate("ProductDetails");
              }}
            />
          ))}
      </View>
    </View>
  );
};

export default FeaturedSection;
