import { Text, TouchableOpacity, View } from "react-native";

// Checkbox Component
const Checkbox = ({ isSelected, onPress }: { isSelected: boolean; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} className="mr-3">
    <View
      className={`w-6 h-6 rounded-md border-2 items-center justify-center ${isSelected ? "bg-primary border-primary" : "border-gray-300"}`}
    >
      {isSelected && <Text className="text-white text-xs font-bold">✓</Text>}
    </View>
  </TouchableOpacity>
);

export default Checkbox;
