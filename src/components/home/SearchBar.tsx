import { Colors } from "@/context/ThemeProvider";
import { Search } from "lucide-react-native";
import { Pressable, TextInput } from "react-native";

const SearchBar = ({ onSearch }: { onSearch?: () => void }) => {
  return (
    <Pressable
      onPress={onSearch}
      className="px-4 h-12 flex-row border border-border items-center bg-foreground rounded-xl mx-4 py-3 gap-3"
      accessibilityRole="search"
      accessibilityLabel="Search products"
    >
      <TextInput
        placeholder="Search products..."
        placeholderTextColor={Colors.body}
        className="flex-1 text-heading text-base"
        editable={false}
      />
      <Search size={20} color={Colors.body} />
    </Pressable>
  );
};

export default SearchBar;
