import React from "react";
import { Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductsSection from "@/components/home/ProductsSection";
import PromoCarousel from "@/components/home/PromoCarousel";
import SearchBar from "@/components/home/SearchBar";
import { showToast } from "@/utils/commonFunction";
import DropdownComponent from "@/components/global/DropdownComponent";

export default function HomeScreen() {
  const handleSearch = () => {
    console.log("[v0] Open search");
    showToast({ message: "Coming soon..." });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <FlatList
        data={[1]}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <DropdownComponent />
            <SearchBar onSearch={handleSearch} />
            <PromoCarousel promos={promos} />
            <Text className="px-3 text-2xl font-bold text-heading mb-2">Laundry Products</Text>
          </>
        }
        renderItem={() => <ProductsSection />}
      />
    </SafeAreaView>
  );
}

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
