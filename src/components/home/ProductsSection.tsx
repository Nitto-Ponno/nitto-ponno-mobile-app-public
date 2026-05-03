import { FlatList, View } from "react-native";
import React, { useEffect } from "react";
import { dispatch, useAppSelector } from "@/store";
import { getFeaturedProducts } from "@/services/api/productApi";
import { navigate } from "@/utils/NavigationUtils";
import { setSelectedProduct } from "@/store/reducer/productReducer";
import SelectionModal from "../product/SelectionModal";
import ProductCard from "../product/ProductCard";
import { Product } from "@/services/types/productTypes";

const ProductsSection = () => {
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    (async () => {
      await getFeaturedProducts();
    })();

    return () => {};
  }, []);

  if (!products) return;
  const renderItem = ({ item }: { item: Product }) => {
    return (
      <ProductCard
        product={item}
        variant="v1"
        onPress={(p) => {
          dispatch(setSelectedProduct(p));
          navigate("ProductDetails");
        }}
      />
    );
  };
  return (
    <View className="pb-3">
      <View className="px-3 gap-3">
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerClassName="gap-3 flex-1"
          columnWrapperClassName="gap-3"
        />
        <SelectionModal />
      </View>
    </View>
  );
};

export default ProductsSection;
