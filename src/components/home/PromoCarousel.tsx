import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const PromoCarousel = ({ promos }: { promos: any }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View className="py-4">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
          setActiveIndex(index);
        }}
        contentContainerClassName="px-4 gap-4"
      >
        {promos.map((promo: any) => (
          <Pressable
            key={promo.id}
            className="w-[340px] bg-red-500 border border-border min-h-36 rounded-2xl overflow-hidden"
            accessibilityRole="button"
            accessibilityLabel={`Promo: ${promo.title}`}
          >
            <Image source={require("../../assets/images/icon.jpg")} className="w-10 h-10" resizeMode="cover" />
            <View className="absolute bg-foreground inset-0 p-6 justify-end">
              <View className="bg-secondary px-3 py-1 rounded-full self-start mb-2">
                <Text className="text-xs font-bold text-gray-700">{promo.description}</Text>
              </View>
              <Text className="text-3xl font-bold text-heading mb-1">{promo.title}</Text>
              <Text className="text-lg text-body">{promo.subtitle}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View className="flex-row justify-center gap-2 mt-3">
        {promos.map((_: any, index: number) => (
          <View key={index} className={`h-2 rounded-full ${index === activeIndex ? "w-6 bg-primary" : "w-2 bg-line"}`} />
        ))}
      </View>
    </View>
  );
};

export default PromoCarousel;
