import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PressableScale } from "./PressableScale";
import { ArrowLeft } from "lucide-react-native";
import { Colors } from "@/context/ThemeProvider";
import { goBack } from "@/utils/NavigationUtils";

const TitleHeader = ({ title, onPress, canGoBack = true }: { canGoBack?: boolean; title: string; onPress?: () => void }) => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }} className="flex-row items-center pb-3  gap-3 mb-4 px-5 border-b border-border">
      {canGoBack && (
        <BackButton
          onPress={() => {
            onPress ? onPress() : goBack();
          }}
        />
      )}
      <Text className="text-2xl font-bold text-heading capitalize">{title}</Text>
    </View>
  );
};

export default TitleHeader;
export const BackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <PressableScale onPress={onPress} className="w-10 h-10 items-center justify-center rounded-full bg-foreground border border-border ">
      <ArrowLeft size={24} color={Colors.heading} />
    </PressableScale>
  );
};
