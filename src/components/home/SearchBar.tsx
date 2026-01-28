import { Colors } from "@/context/ThemeProvider";
import { Bell, Search } from "lucide-react-native";
import NText from "../global/NText";
import { PressableScale } from "../common/PressableScale";
import { View } from "react-native";
import { navigateProtected } from "@/utils/NavigationUtils";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@/store";

const SearchBar = ({ onSearch }: { onSearch?: () => void }) => {
  const navigation = useNavigation();
  const { accessToken } = useAppSelector((state) => state.auth);
  return (
    <View className="mx-4 flex-row items-center gap-3">
      <PressableScale
        onPress={onSearch}
        className="border-border bg-foreground h-14 flex-1 flex-row items-center justify-between gap-3 rounded-full border px-4"
        accessibilityRole="search"
        accessibilityLabel="Search products"
      >
        <NText className="text-body">Search Products...</NText>
        <Search size={25} color={Colors.body} />
      </PressableScale>
      <PressableScale
        onPress={() => {
          navigateProtected(navigation, Boolean(accessToken), "Notification");
        }}
        className="border-border bg-foreground h-14 w-14 items-center justify-center rounded-full border"
      >
        <Bell size={25} color={Colors.body} />
      </PressableScale>
    </View>
  );
};

export default SearchBar;
