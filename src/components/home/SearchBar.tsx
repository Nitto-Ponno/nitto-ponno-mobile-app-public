import { Colors } from "@/context/ThemeProvider";
import { Search } from "lucide-react-native";
import NText from "../global/NText";
import { PressableScale } from "../common/PressableScale";

const SearchBar = ({ onSearch }: { onSearch?: () => void }) => {
  return (
    <PressableScale
      onPress={onSearch}
      className="px-4 h-14 flex-row border border-border items-center bg-foreground rounded-full mx-4 py-3 gap-3 justify-between"
      accessibilityRole="search"
      accessibilityLabel="Search products"
    >
      <NText className="text-body">Search Products...</NText>
      <Search size={25} color={Colors.body} />
    </PressableScale>
  );
};

export default SearchBar;
