import React from "react";
import { View, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import { Package, Heart, MapPin, Bell, HelpCircle, Settings, LogOut, ChevronRight, ShoppingBag } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/context/ThemeProvider";
import { navigate, navigateProtected } from "@/utils/NavigationUtils";
import { showToast } from "@/utils/commonFunction";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeToken, setUser } from "@/store/reducer/authReducer";
import Images from "@/constants/Images";
import { useNavigation } from "@react-navigation/native";

interface ProfileScreenProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    memberSince?: string;
    loyaltyPoints?: number;
  };
  stats?: {
    totalOrders: number;
    wishlistItems: number;
    savedAddresses: number;
  };
  onSignUp?: () => void;
  onEditProfile?: () => void;
  onWishlist?: () => void;
  onPayments?: () => void;
  onRewards?: () => void;
  onNotifications?: () => void;
  onSecurity?: () => void;
  onHelp?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  stats = {
    totalOrders: 24,
    wishlistItems: 12,
    savedAddresses: 3,
  },
  onSignUp = () => navigate("Signup"),
  onEditProfile = () => showToast({ message: "Coming soon..." }),
  onHelp = () => showToast({ message: "Coming soon..." }),
  onSettings = () => showToast({ message: "Coming soon..." }),
}) => {
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const MenuItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    badge,
    iconColor = "#14b8a6",
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onPress: () => void;
    badge?: string;
    iconColor?: string;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="bg-foreground border-border mb-3 flex-row items-center rounded-xl border p-4 active:opacity-80"
    >
      <View className="bg-background mr-4 h-10 w-10 items-center justify-center rounded-full">
        <Icon size={20} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text className="text-heading text-base font-semibold">{title}</Text>
        {subtitle && <Text className="text-body mt-0.5 text-sm">{subtitle}</Text>}
      </View>
      {badge && (
        <View className="mr-2 rounded-full bg-[#14b8a6] px-2.5 py-1">
          <Text className="text-heading text-xs font-semibold">{badge}</Text>
        </View>
      )}
      <ChevronRight size={20} color={Colors.body} />
    </TouchableOpacity>
  );

  const StatCard = ({ icon: Icon, value, label, iconColor }: { icon: any; value: string | number; label: string; iconColor: string }) => (
    <View className="bg-foreground border-border flex-1 items-center rounded-xl border p-4">
      <View className="mb-2 h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: `${iconColor}20` }}>
        <Icon size={24} color={iconColor} />
      </View>
      <Text className="text-heading text-xl font-bold">{value}</Text>
      <Text className="text-body mt-1 text-xs">{label}</Text>
    </View>
  );

  if (!accessToken) {
    return (
      <SafeAreaView className="bg-background flex-1">
        <ScrollView className="flex-1 px-5 pt-6">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-heading text-3xl font-bold">Profile</Text>
            <Text className="text-body mt-2 text-base">Sign in to access your account</Text>
          </View>

          {/* Welcome Card */}
          <View className="bg-foreground border-border mb-6 rounded-2xl border p-6">
            <View className="bg-primary mb-4 h-16 w-16 items-center justify-center rounded-full">
              <ShoppingBag size={32} color={Colors.heading} />
            </View>
            <Text className="text-heading mb-2 text-2xl font-bold">Welcome to Nitto Ponno</Text>
            <Text className="text-body mb-6 text-base leading-relaxed">
              Sign in to track orders, save favorites, and enjoy a personalized shopping experience
            </Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => {
                  navigate("Signin");
                }}
                className="bg-primary flex-1 rounded-xl py-3.5 active:opacity-80"
              >
                <Text className="text-center text-base font-bold text-white">Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onSignUp} className="bg-secondary border-border flex-1 rounded-xl border py-3.5 active:opacity-80">
                <Text className="text-center text-base font-bold text-gray-800">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Guest Features */}
          <View className="mb-6">
            <Text className="text-heading mb-4 text-lg font-bold">Browse as Guest</Text>
            <MenuItem
              icon={Package}
              title="Track Order"
              subtitle="Check your order status"
              onPress={() => showToast({ message: "Coming soon..." })}
              iconColor="#14b8a6"
            />
            <MenuItem icon={HelpCircle} title="Help Center" subtitle="Get support and answers" onPress={onHelp} iconColor="#8b5cf6" />
            <MenuItem
              icon={Settings}
              title="App Settings"
              subtitle="Preferences and language"
              onPress={onSettings}
              iconColor={Colors.body}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="bg-background flex-1">
      <ScrollView className="flex-1 px-5">
        {/* Header */}
        <View className="mb-4">
          <Text className="text-heading text-3xl font-bold">Profile</Text>
        </View>

        {/* Profile Card */}
        <View className="bg-foreground mb-6 rounded-2xl p-5">
          <View className="mb-4 flex-row items-center">
            <View className="mr-4 h-16 w-16  overflow-hidden rounded-full">
              <Image source={Images.LOGO} className="bg-primary h-16 w-16  rounded-full" />
            </View>
            <View className="flex-1">
              <Text className="text-heading text-xl font-bold">{user?.fullName}</Text>
              <Text className="text-body mt-1 text-sm">{user?.email}</Text>
            </View>
          </View>
          <View className="flex-row gap-3">
            <StatCard icon={Package} value={stats.totalOrders} label="Orders" iconColor="#14b8a6" />
            <StatCard icon={Heart} value={stats.wishlistItems} label="Wishlist" iconColor="#ef4444" />
            <StatCard icon={MapPin} value={stats.savedAddresses} label="Addresses" iconColor="#8b5cf6" />
          </View>
          {/* Edit Profile Button */}
          <TouchableOpacity onPress={onEditProfile} className="bg-primary mt-4 rounded-xl py-3 active:opacity-80">
            <Text className="text-center text-base font-semibold text-white">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}

        {/* Shopping Section */}
        <View className="mb-6">
          <Text className="text-heading mb-4 text-lg font-bold">Shopping</Text>
          <MenuItem
            icon={Package}
            title="My Orders"
            subtitle="Track and manage orders"
            onPress={() => {
              navigate("Orders");
            }}
            badge={stats.totalOrders > 0 ? stats.totalOrders.toString() : undefined}
            iconColor="#14b8a6"
          />
          <MenuItem
            icon={Heart}
            title="Wishlist"
            subtitle="Saved items and favorites"
            onPress={() => {
              navigateProtected(navigation, Boolean(accessToken), "Wishlist");
            }}
            badge={stats.wishlistItems > 0 ? stats.wishlistItems.toString() : undefined}
            iconColor="#ef4444"
          />
          <MenuItem
            icon={Bell}
            title="Notification"
            subtitle="Order updates and offers"
            onPress={() => {
              navigateProtected(navigation, Boolean(accessToken), "Notification");
            }}
            badge={stats.wishlistItems > 0 ? stats.wishlistItems.toString() : undefined}
            iconColor="#ef4444"
          />
          <MenuItem
            icon={MapPin}
            title="Saved Addresses"
            subtitle="Manage delivery locations"
            onPress={() => {
              navigate("MyAddress");
            }}
            iconColor="#8b5cf6"
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={() => {
            dispatch(setUser(null));
            dispatch(removeToken());
          }}
          className="bg-foreground border-border mb-8 flex-row items-center justify-center rounded-xl border p-4 active:opacity-80"
        >
          <LogOut size={20} color="#ef4444" />
          <Text className="ml-2 text-base font-semibold text-[#ef4444]">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
