import React from "react";
import { View, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import {
  Package,
  Heart,
  MapPin,
  CreditCard,
  Gift,
  Bell,
  Shield,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Star,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/context/ThemeProvider";
import { navigate } from "@/utils/NavigationUtils";
import { showToast } from "@/utils/commonFunction";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeToken, setRedirectTo, setUser } from "@/store/reducer/authReducer";
import Images from "@/constants/Images";

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
  onAddresses?: () => void;
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
  onWishlist = () => showToast({ message: "Coming soon..." }),
  onAddresses = () => showToast({ message: "Coming soon..." }),
  onPayments = () => showToast({ message: "Coming soon..." }),
  onRewards = () => showToast({ message: "Coming soon..." }),
  onNotifications = () => showToast({ message: "Coming soon..." }),
  onSecurity = () => showToast({ message: "Coming soon..." }),
  onHelp = () => showToast({ message: "Coming soon..." }),
  onSettings = () => showToast({ message: "Coming soon..." }),
}) => {
  const { user, accessToken } = useAppSelector((state) => state.auth);
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
      className="flex-row items-center bg-foreground border border-border p-4 rounded-xl mb-3 active:opacity-80"
    >
      <View className="w-10 h-10 rounded-full bg-background items-center justify-center mr-4">
        <Icon size={20} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text className="text-heading font-semibold text-base">{title}</Text>
        {subtitle && <Text className="text-body text-sm mt-0.5">{subtitle}</Text>}
      </View>
      {badge && (
        <View className="bg-[#14b8a6] px-2.5 py-1 rounded-full mr-2">
          <Text className="text-heading text-xs font-semibold">{badge}</Text>
        </View>
      )}
      <ChevronRight size={20} color={Colors.body} />
    </TouchableOpacity>
  );

  const StatCard = ({ icon: Icon, value, label, iconColor }: { icon: any; value: string | number; label: string; iconColor: string }) => (
    <View className="flex-1 bg-foreground border border-border p-4 rounded-xl items-center">
      <View className="w-12 h-12 rounded-full items-center justify-center mb-2" style={{ backgroundColor: `${iconColor}20` }}>
        <Icon size={24} color={iconColor} />
      </View>
      <Text className="text-heading text-xl font-bold">{value}</Text>
      <Text className="text-body text-xs mt-1">{label}</Text>
    </View>
  );

  if (!accessToken) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <ScrollView className="flex-1 px-5 pt-6">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-heading text-3xl font-bold">Profile</Text>
            <Text className="text-body text-base mt-2">Sign in to access your account</Text>
          </View>

          {/* Welcome Card */}
          <View className="bg-foreground border border-border p-6 rounded-2xl mb-6">
            <View className="w-16 h-16 bg-primary rounded-full items-center justify-center mb-4">
              <ShoppingBag size={32} color={Colors.heading} />
            </View>
            <Text className="text-heading text-2xl font-bold mb-2">Welcome to Nitto Ponno</Text>
            <Text className="text-body text-base leading-relaxed mb-6">
              Sign in to track orders, save favorites, and enjoy a personalized shopping experience
            </Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => {
                  navigate("Signin");
                  dispatch(setRedirectTo({ stack: "ProfileStack", screen: "Profile" }));
                }}
                className="flex-1 bg-primary py-3.5 rounded-xl active:opacity-80"
              >
                <Text className="text-white text-center font-bold text-base">Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onSignUp} className="flex-1 bg-secondary py-3.5 rounded-xl border border-border active:opacity-80">
                <Text className="text-gray-800 text-center font-bold text-base">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Guest Features */}
          <View className="mb-6">
            <Text className="text-heading text-lg font-bold mb-4">Browse as Guest</Text>
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
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <ScrollView className="flex-1 px-5">
        {/* Header */}
        <View className="mb-4">
          <Text className="text-heading text-3xl font-bold">Profile</Text>
        </View>

        {/* Profile Card */}
        <View className="bg-foreground p-5 rounded-2xl mb-6">
          <View className="flex-row items-center mb-4">
            <Image source={Images.LOGO} className="w-20 h-20 rounded-full mr-4" />
            <View className="flex-1">
              <Text className="text-heading text-xl font-bold">{user?.fullName}</Text>
              <Text className="text-body text-sm mt-1">{user?.email}</Text>
            </View>
          </View>
          <View className="flex-row gap-3">
            <StatCard icon={Package} value={stats.totalOrders} label="Orders" iconColor="#14b8a6" />
            <StatCard icon={Heart} value={stats.wishlistItems} label="Wishlist" iconColor="#ef4444" />
            <StatCard icon={MapPin} value={stats.savedAddresses} label="Addresses" iconColor="#8b5cf6" />
          </View>
          {/* Edit Profile Button */}
          <TouchableOpacity onPress={onEditProfile} className="bg-primary py-3 rounded-xl mt-4 active:opacity-80">
            <Text className="text-white text-center font-semibold text-base">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}

        {/* Shopping Section */}
        <View className="mb-6">
          <Text className="text-heading text-lg font-bold mb-4">Shopping</Text>
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
            onPress={onWishlist}
            badge={stats.wishlistItems > 0 ? stats.wishlistItems.toString() : undefined}
            iconColor="#ef4444"
          />
          <MenuItem icon={MapPin} title="Saved Addresses" subtitle="Manage delivery locations" onPress={onAddresses} iconColor="#8b5cf6" />
          <MenuItem
            icon={CreditCard}
            title="Payment Methods"
            subtitle="Cards and payment options"
            onPress={onPayments}
            iconColor="#f59e0b"
          />
          <MenuItem icon={Gift} title="Rewards & Offers" subtitle="Exclusive deals and coupons" onPress={onRewards} iconColor="#10b981" />
        </View>

        {/* Account Section */}
        <View className="mb-6">
          <Text className="text-heading text-lg font-bold mb-4">Account</Text>
          <MenuItem icon={Bell} title="Notifications" subtitle="Order updates and offers" onPress={onNotifications} iconColor="#3b82f6" />
          <MenuItem
            icon={Shield}
            title="Security & Privacy"
            subtitle="Password and data settings"
            onPress={onSecurity}
            iconColor={Colors.body}
          />
          <MenuItem icon={HelpCircle} title="Help & Support" subtitle="FAQs and customer service" onPress={onHelp} iconColor="#8b5cf6" />
          <MenuItem icon={Settings} title="App Settings" subtitle="Preferences and language" onPress={onSettings} iconColor={Colors.body} />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={() => {
            dispatch(setUser(null));
            dispatch(removeToken());
          }}
          className="bg-foreground border border-border p-4 rounded-xl mb-8 flex-row items-center justify-center active:opacity-80"
        >
          <LogOut size={20} color="#ef4444" />
          <Text className="text-[#ef4444] font-semibold text-base ml-2">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
