import { View, FlatList } from "react-native";
import React, { useEffect } from "react";
import { navigate } from "@/utils/NavigationUtils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CategoryStackParamList } from "@/navigation/CategoryStack";
import { dispatch, useAppSelector } from "@/store";
import { getFeaturedProducts } from "@/services/api/productApi";
import { Product } from "@/services/types/productTypes";
import ProductCard from "@/components/product/ProductCard";
import { setSelectedProduct } from "@/store/reducer/productReducer";
import SelectionModal from "@/components/product/SelectionModal";
import TitleHeader from "@/components/common/TitleHeader";
type Props = NativeStackScreenProps<CategoryStackParamList, "CategoryProducts">;
const CategoryProductsScreen = ({ route }: Props) => {
  const { slug } = route.params;
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
    <View className="flex-1 bg-background">
      <TitleHeader title={`${slug} Products`} />
      <View className="px-4 flex-1">
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

export default CategoryProductsScreen;
