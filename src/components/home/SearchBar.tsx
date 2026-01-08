import { Colors } from "@/context/ThemeProvider";
import { Bell, Search } from "lucide-react-native";
import NText from "../global/NText";
import { PressableScale } from "../common/PressableScale";
import { View } from "react-native";
import { navigate } from "@/utils/NavigationUtils";

const SearchBar = ({ onSearch }: { onSearch?: () => void }) => {
  return (
    <View className="flex-row items-center gap-3 mx-4">
      <PressableScale
        onPress={onSearch}
        className="px-4 h-14 flex-1 flex-row border border-border items-center bg-foreground rounded-full gap-3 justify-between"
        accessibilityRole="search"
        accessibilityLabel="Search products"
      >
        <NText className="text-body">Search Products...</NText>
        <Search size={25} color={Colors.body} />
      </PressableScale>
      <PressableScale
        onPress={() => {
          navigate("Notification");
        }}
        className="h-14 w-14 rounded-full justify-center items-center border-border border bg-foreground"
      >
        <Bell size={25} color={Colors.body} />
      </PressableScale>
    </View>
  );
};

export default SearchBar;
