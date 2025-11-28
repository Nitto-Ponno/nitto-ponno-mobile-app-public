import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import { Package, Search, Filter, ChevronRight, Truck, CheckCircle, XCircle, Clock, RotateCcw } from "lucide-react-native";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "delivered" | "processing" | "shipped" | "cancelled";
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
}

interface OrdersScreenProps {
  orders?: Order[];
  onOrderPress?: (orderId: string) => void;
  onTrackOrder?: (orderId: string) => void;
  onReorder?: (orderId: string) => void;
  onFilterPress?: () => void;
}

const OrdersScreen: React.FC<OrdersScreenProps> = ({
  //   orders = [],
  onOrderPress = () => {},
  onTrackOrder = () => {},
  onReorder = () => {},
  onFilterPress = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "text-emerald-500";
      case "processing":
        return "text-indigo-500";
      case "shipped":
        return "text-blue-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  const getStatusBgColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-500/10";
      case "processing":
        return "bg-indigo-500/10";
      case "shipped":
        return "bg-blue-500/10";
      case "cancelled":
        return "bg-red-500/10";
      default:
        return "bg-gray-500/10";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return CheckCircle;
      case "processing":
        return Clock;
      case "shipped":
        return Truck;
      case "cancelled":
        return XCircle;
      default:
        return Package;
    }
  };

  const filters = [
    { id: "all", label: "All Orders" },
    { id: "processing", label: "Processing" },
    { id: "shipped", label: "Shipped" },
    { id: "delivered", label: "Delivered" },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === "all" || order.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className="px-6 pt-16 pb-6">
        <Text className="text-4xl font-bold text-white mb-2">Orders</Text>
        <Text className="text-base text-gray-400">Track and manage your purchases</Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 mb-6">
        <View className="flex-row items-center bg-neutral-900 rounded-xl px-4 py-3 border border-neutral-800">
          <Search size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-3 text-white text-base"
            placeholder="Search orders..."
            placeholderTextColor="#6b7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={onFilterPress}>
            <Filter size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 mb-6" contentContainerClassName="gap-3">
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setSelectedFilter(filter.id)}
              className={`px-5 py-2.5 rounded-full border ${
                selectedFilter === filter.id ? "bg-primary border-outline" : "bg-transparent border-neutral-800"
              }`}
            >
              <Text className={`text-sm font-medium ${selectedFilter === filter.id ? "text-white" : "text-gray-400"}`}>{filter.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* Orders List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {filteredOrders.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Package size={64} color="#374151" />
            <Text className="text-xl font-semibold text-white mt-4">No orders found</Text>
            <Text className="text-base text-gray-400 mt-2 text-center">
              {searchQuery ? "Try adjusting your search" : "Your orders will appear here"}
            </Text>
          </View>
        ) : (
          <View className="gap-4 pb-6">
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <TouchableOpacity
                  key={order.id}
                  onPress={() => onOrderPress(order.id)}
                  className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden"
                  activeOpacity={0.7}
                >
                  {/* Order Header */}
                  <View className="p-5 border-b border-neutral-800">
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-row items-center gap-2">
                        <Text className="text-sm font-medium text-gray-400">Order</Text>
                        <Text className="text-sm font-semibold text-white">#{order.orderNumber}</Text>
                      </View>
                      <View className={`flex-row items-center gap-2 px-3 py-1.5 rounded-full ${getStatusBgColor(order.status)}`}>
                        <StatusIcon
                          size={14}
                          color={
                            order.status === "delivered"
                              ? "#10b981"
                              : order.status === "processing"
                                ? "#6366f1"
                                : order.status === "shipped"
                                  ? "#3b82f6"
                                  : "#ef4444"
                          }
                        />
                        <Text className={`text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>{order.status}</Text>
                      </View>
                    </View>
                    <Text className="text-sm text-gray-400">{order.date}</Text>
                  </View>

                  {/* Order Items */}
                  <View className="p-5">
                    {order.items.slice(0, 2).map((item, index) => (
                      <View key={item.id} className={`flex-row items-center gap-4 ${index > 0 ? "mt-4" : ""}`}>
                        <Image source={{ uri: item.image }} className="w-16 h-16 rounded-lg bg-neutral-800" />
                        <View className="flex-1">
                          <Text className="text-base font-medium text-white mb-1" numberOfLines={1}>
                            {item.name}
                          </Text>
                          <Text className="text-sm text-gray-400">Qty: {item.quantity}</Text>
                        </View>
                        <Text className="text-base font-semibold text-white">${item.price.toFixed(2)}</Text>
                      </View>
                    ))}
                    {order.items.length > 2 && <Text className="text-sm text-gray-400 mt-3">+{order.items.length - 2} more items</Text>}
                  </View>

                  {/* Order Footer */}
                  <View className="px-5 py-4 border-t border-neutral-800 flex-row items-center justify-between">
                    <View>
                      <Text className="text-sm text-gray-400 mb-1">Total Amount</Text>
                      <Text className="text-xl font-bold text-white">${order.total.toFixed(2)}</Text>
                    </View>
                    <View className="flex-row gap-2">
                      {order.status === "delivered" && (
                        <TouchableOpacity
                          onPress={() => onReorder(order.id)}
                          className="flex-row items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-700"
                          activeOpacity={0.7}
                        >
                          <RotateCcw size={16} color="#ffffff" />
                          <Text className="text-sm font-medium text-white">Reorder</Text>
                        </TouchableOpacity>
                      )}
                      {(order.status === "processing" || order.status === "shipped") && (
                        <TouchableOpacity
                          onPress={() => onTrackOrder(order.id)}
                          className="flex-row items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600"
                          activeOpacity={0.7}
                        >
                          <Truck size={16} color="#ffffff" />
                          <Text className="text-sm font-medium text-white">Track</Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        onPress={() => onOrderPress(order.id)}
                        className="w-10 h-10 items-center justify-center rounded-lg border border-neutral-700"
                        activeOpacity={0.7}
                      >
                        <ChevronRight size={20} color="#ffffff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default OrdersScreen;
const orders = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    date: "January 15, 2024",
    status: "delivered" as const,
    total: 299.99,
    trackingNumber: "TRK123456789",
    items: [
      {
        id: "1",
        name: "Wireless Headphones Pro",
        quantity: 1,
        price: 199.99,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "2",
        name: "USB-C Cable 2m",
        quantity: 2,
        price: 50.0,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    date: "January 20, 2024",
    status: "shipped" as const,
    total: 599.99,
    trackingNumber: "TRK987654321",
    items: [
      {
        id: "3",
        name: "Smart Watch Series 5",
        quantity: 1,
        price: 599.99,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    date: "January 22, 2024",
    status: "processing" as const,
    total: 149.99,
    items: [
      {
        id: "4",
        name: "Portable Charger 20000mAh",
        quantity: 1,
        price: 79.99,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "5",
        name: "Phone Case Premium",
        quantity: 1,
        price: 70.0,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
];
