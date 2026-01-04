import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack } from "@/utils/NavigationUtils";

// Types
interface Notification {
  _id: string;
  type: "order" | "promotion" | "reminder" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: {
    orderId?: string;
    image?: string;
    actionUrl?: string;
  };
}

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      _id: "1",
      type: "order",
      title: "Order Delivered Successfully",
      message: "Your order LAUNDRY-2025-00345 has been delivered. Thank you for using our service!",
      timestamp: "2026-01-05T10:30:00Z",
      read: false,
      data: {
        orderId: "LAUNDRY-2025-00345",
      },
    },
    {
      _id: "2",
      type: "order",
      title: "Out for Delivery",
      message: "Your order LAUNDRY-2025-00340 is out for delivery. Expected delivery in 30 minutes.",
      timestamp: "2026-01-05T09:15:00Z",
      read: false,
      data: {
        orderId: "LAUNDRY-2025-00340",
      },
    },
    {
      _id: "3",
      type: "promotion",
      title: "🎉 Special Weekend Offer",
      message: "Get 25% OFF on all dry cleaning services this weekend. Use code: WEEKEND25",
      timestamp: "2026-01-05T08:00:00Z",
      read: true,
      data: {
        image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400",
      },
    },
    {
      _id: "4",
      type: "order",
      title: "Order Being Processed",
      message: "Your clothes are being carefully washed and ironed. Order LAUNDRY-2025-00340.",
      timestamp: "2026-01-04T16:45:00Z",
      read: true,
      data: {
        orderId: "LAUNDRY-2025-00340",
      },
    },
    {
      _id: "5",
      type: "reminder",
      title: "Pickup Scheduled",
      message: "Your laundry pickup is scheduled for tomorrow at 10:00 AM. Please keep your items ready.",
      timestamp: "2026-01-04T14:20:00Z",
      read: true,
    },
    {
      _id: "6",
      type: "order",
      title: "Order Confirmed",
      message: "Your order LAUNDRY-2025-00340 has been confirmed. Our rider will pick up shortly.",
      timestamp: "2026-01-04T11:00:00Z",
      read: true,
      data: {
        orderId: "LAUNDRY-2025-00340",
      },
    },
    {
      _id: "7",
      type: "system",
      title: "Welcome to Our Laundry Service",
      message: "Thank you for joining us! Enjoy hassle-free laundry service at your doorstep.",
      timestamp: "2026-01-03T09:00:00Z",
      read: true,
    },
    {
      _id: "8",
      type: "promotion",
      title: "💰 Cashback on First Order",
      message: "Get ৳100 cashback on your first order above ৳500. Start your laundry journey today!",
      timestamp: "2026-01-03T09:05:00Z",
      read: true,
      data: {
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      },
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif._id === id ? { ...notif, read: true } : notif)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif._id !== id));
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

    return time.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, string> = {
      order: "📦",
      promotion: "🎁",
      reminder: "⏰",
      system: "🔔",
    };
    return icons[type] || "📢";
  };

  const getNotificationColor = (type: string) => {
    const colors: Record<string, string> = {
      order: "bg-green-100",
      promotion: "bg-emerald-100",
      reminder: "bg-orange-100",
      system: "bg-gray-100",
    };
    return colors[type] || "bg-gray-100";
  };

  const filteredNotifications = filter === "all" ? notifications : notifications.filter((n) => !n.read);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce(
    (groups, notification) => {
      const date = new Date(notification.timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let label = "";
      if (date.toDateString() === today.toDateString()) {
        label = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        label = "Yesterday";
      } else {
        label = date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
      }

      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(notification);
      return groups;
    },
    {} as Record<string, Notification[]>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-background pb-4 px-5 border-b border-border">
        {/* Back Button and Title Row */}
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={goBack} className="w-10 h-10 items-center justify-center mr-2 -ml-2">
            <Text className="text-2xl text-heading">←</Text>
          </TouchableOpacity>

          <View className="flex-1">
            <Text className="text-2xl font-bold text-heading">Notifications</Text>
            {unreadCount > 0 && <Text className="text-sm text-body mt-0.5">{unreadCount} unread</Text>}
          </View>

          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllAsRead} className="px-3 py-2 bg-green-50 rounded-lg">
              <Text className="text-green-600 font-semibold text-sm">Mark All Read</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Tabs */}
        <View className="flex-row space-x-2">
          <TouchableOpacity
            onPress={() => setFilter("all")}
            className={`px-4 py-2 rounded-full ${filter === "all" ? "bg-green-600" : "bg-gray-100"}`}
          >
            <Text className={`font-semibold ${filter === "all" ? "text-white" : "text-gray-600"}`}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter("unread")}
            className={`px-4 py-2 rounded-full flex-row items-center ${filter === "unread" ? "bg-green-600" : "bg-gray-100"}`}
          >
            <Text className={`font-semibold ${filter === "unread" ? "text-white" : "text-gray-600"}`}>Unread</Text>
            {unreadCount > 0 && filter !== "unread" && (
              <View className="ml-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {filteredNotifications.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Text className="text-6xl mb-4">🔔</Text>
            <Text className="text-xl font-bold text-heading mb-2">
              {filter === "unread" ? "No Unread Notifications" : "No Notifications"}
            </Text>
            <Text className="text-body text-center px-8">
              {filter === "unread"
                ? "You're all caught up! Check back later for updates."
                : "We'll notify you when something important happens"}
            </Text>
          </View>
        ) : (
          <View className="pb-4">
            {Object.entries(groupedNotifications).map(([date, notifs]) => (
              <View key={date}>
                {/* Date Header */}
                <View className="px-5 py-3 bg-foreground">
                  <Text className="text-sm font-semibold text-gray-600">{date}</Text>
                </View>

                {/* Notifications */}
                {notifs.map((notification) => (
                  <TouchableOpacity
                    key={notification._id}
                    onPress={() => markAsRead(notification._id)}
                    className={`bg-white border-b border-gray-100 ${!notification.read ? "bg-green-50" : ""}`}
                  >
                    <View className="flex-row p-4">
                      {/* Icon */}
                      <View
                        className={`w-12 h-12 rounded-full ${getNotificationColor(notification.type)} items-center justify-center flex-shrink-0`}
                      >
                        <Text className="text-2xl">{getNotificationIcon(notification.type)}</Text>
                      </View>

                      {/* Content */}
                      <View className="flex-1 ml-3">
                        <View className="flex-row items-start justify-between mb-1">
                          <Text
                            className={`text-base flex-1 ${!notification.read ? "font-bold text-heading" : "font-semibold text-gray-800"}`}
                            numberOfLines={2}
                          >
                            {notification.title}
                          </Text>
                          {!notification.read && <View className="w-2 h-2 bg-green-600 rounded-full ml-2 mt-2" />}
                        </View>

                        <Text className="text-sm text-gray-600 mb-2" numberOfLines={3}>
                          {notification.message}
                        </Text>

                        {/* Image if available */}
                        {notification.data?.image && (
                          <Image source={{ uri: notification.data.image }} className="w-full h-32 rounded-lg mb-2" resizeMode="cover" />
                        )}

                        <View className="flex-row items-center justify-between">
                          <Text className="text-xs text-gray-400">{getTimeAgo(notification.timestamp)}</Text>

                          <View className="flex-row space-x-3">
                            {notification.data?.orderId && (
                              <TouchableOpacity className="px-3 py-1 bg-green-600 rounded-md">
                                <Text className="text-white text-xs font-semibold">View Order</Text>
                              </TouchableOpacity>
                            )}
                            <TouchableOpacity
                              onPress={() => deleteNotification(notification._id)}
                              className="px-3 py-1 bg-gray-100 rounded-md"
                            >
                              <Text className="text-gray-600 text-xs font-semibold">Delete</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;
