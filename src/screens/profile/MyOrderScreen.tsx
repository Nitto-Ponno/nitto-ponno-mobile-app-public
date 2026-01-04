import { goBack } from "@/utils/NavigationUtils";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, RefreshControl, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Types
interface User {
  _id: string;
  name: string;
  phone: string;
}

interface Address {
  fullAddress: string;
  apartment: string;
  landmark: string;
  lat: number;
  lng: number;
}

interface ProductId {
  _id: string;
  name: string;
  image: string;
}

interface ServiceId {
  _id: string;
  name: string;
}

interface OrderItem {
  productId: ProductId;
  serviceId: ServiceId;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface TimelineEvent {
  status: string;
  timestamp: string;
  note: string;
  rider: string;
}

interface Order {
  _id: string;
  orderId: string;
  user: User;
  status: "pending" | "confirmed" | "picked_up" | "processing" | "ready" | "out_for_delivery" | "delivered" | "cancelled";
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  pickupAddress: Address;
  deliveryAddress: Address;
  pickupTime: string;
  actualPickupTime: string;
  actualDeliveryTime: string;
  pickupRider: User;
  deliveryRider: User;
  items: OrderItem[];
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

// Mock data
const mockOrders: Order[] = [
  {
    _id: "1",
    orderId: "LAUNDRY-2025-00345",
    user: { _id: "1", name: "John Doe", phone: "+1234567890" },
    status: "out_for_delivery",
    totalAmount: 450,
    paymentMethod: "cod",
    paymentStatus: "pending",
    pickupAddress: {
      fullAddress: "123 Main St, Downtown",
      apartment: "Apt 4B",
      landmark: "Near Central Park",
      lat: 23.8103,
      lng: 90.4125,
    },
    deliveryAddress: {
      fullAddress: "123 Main St, Downtown",
      apartment: "Apt 4B",
      landmark: "Near Central Park",
      lat: 23.8103,
      lng: 90.4125,
    },
    pickupTime: "2026-01-03T10:00:00Z",
    actualPickupTime: "2026-01-03T10:15:00Z",
    actualDeliveryTime: "",
    pickupRider: { _id: "2", name: "Mike Rider", phone: "+1234567891" },
    deliveryRider: { _id: "3", name: "Sarah Delivery", phone: "+1234567892" },
    items: [
      {
        productId: { _id: "1", name: "Shirt", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200" },
        serviceId: { _id: "1", name: "Wash & Iron" },
        quantity: 3,
        unitPrice: 50,
        subtotal: 150,
      },
      {
        productId: { _id: "2", name: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200" },
        serviceId: { _id: "1", name: "Wash & Iron" },
        quantity: 2,
        unitPrice: 150,
        subtotal: 300,
      },
    ],
    timeline: [
      { status: "pending", timestamp: "2026-01-03T09:00:00Z", note: "Order placed", rider: "" },
      { status: "confirmed", timestamp: "2026-01-03T09:30:00Z", note: "Order confirmed", rider: "" },
      { status: "picked_up", timestamp: "2026-01-03T10:15:00Z", note: "Picked up by rider", rider: "Mike Rider" },
    ],
    createdAt: "2026-01-03T09:00:00Z",
    updatedAt: "2026-01-04T10:00:00Z",
  },
  {
    _id: "2",
    orderId: "LAUNDRY-2025-00320",
    user: { _id: "1", name: "John Doe", phone: "+1234567890" },
    status: "delivered",
    totalAmount: 850,
    paymentMethod: "online",
    paymentStatus: "paid",
    pickupAddress: {
      fullAddress: "456 Oak Avenue",
      apartment: "Suite 12",
      landmark: "Behind Mall",
      lat: 23.8103,
      lng: 90.4125,
    },
    deliveryAddress: {
      fullAddress: "456 Oak Avenue",
      apartment: "Suite 12",
      landmark: "Behind Mall",
      lat: 23.8103,
      lng: 90.4125,
    },
    pickupTime: "2026-01-01T14:00:00Z",
    actualPickupTime: "2026-01-01T14:10:00Z",
    actualDeliveryTime: "2026-01-02T16:30:00Z",
    pickupRider: { _id: "2", name: "Mike Rider", phone: "+1234567891" },
    deliveryRider: { _id: "3", name: "Sarah Delivery", phone: "+1234567892" },
    items: [
      {
        productId: { _id: "3", name: "Suit", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200" },
        serviceId: { _id: "2", name: "Dry Clean" },
        quantity: 1,
        unitPrice: 500,
        subtotal: 500,
      },
      {
        productId: { _id: "4", name: "Dress", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200" },
        serviceId: { _id: "2", name: "Dry Clean" },
        quantity: 1,
        unitPrice: 350,
        subtotal: 350,
      },
    ],
    timeline: [{ status: "delivered", timestamp: "2026-01-02T16:30:00Z", note: "Order delivered successfully", rider: "Sarah Delivery" }],
    createdAt: "2026-01-01T13:00:00Z",
    updatedAt: "2026-01-02T16:30:00Z",
  },
  {
    _id: "3",
    orderId: "LAUNDRY-2025-00298",
    user: { _id: "1", name: "John Doe", phone: "+1234567890" },
    status: "processing",
    totalAmount: 320,
    paymentMethod: "cod",
    paymentStatus: "pending",
    pickupAddress: {
      fullAddress: "789 Pine Road",
      apartment: "Floor 3",
      landmark: "Near Hospital",
      lat: 23.8103,
      lng: 90.4125,
    },
    deliveryAddress: {
      fullAddress: "789 Pine Road",
      apartment: "Floor 3",
      landmark: "Near Hospital",
      lat: 23.8103,
      lng: 90.4125,
    },
    pickupTime: "2025-12-30T11:00:00Z",
    actualPickupTime: "2025-12-30T11:20:00Z",
    actualDeliveryTime: "",
    pickupRider: { _id: "2", name: "Mike Rider", phone: "+1234567891" },
    deliveryRider: { _id: "3", name: "Sarah Delivery", phone: "+1234567892" },
    items: [
      {
        productId: { _id: "5", name: "T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200" },
        serviceId: { _id: "1", name: "Wash & Iron" },
        quantity: 4,
        unitPrice: 40,
        subtotal: 160,
      },
      {
        productId: { _id: "6", name: "Towel", image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=200" },
        serviceId: { _id: "3", name: "Wash & Fold" },
        quantity: 4,
        unitPrice: 40,
        subtotal: 160,
      },
    ],
    timeline: [{ status: "processing", timestamp: "2025-12-30T12:00:00Z", note: "In laundry processing", rider: "" }],
    createdAt: "2025-12-30T10:00:00Z",
    updatedAt: "2025-12-30T12:00:00Z",
  },
];

const MyOrdersScreen = () => {
  const [orders] = useState<Order[]>(mockOrders);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "active" | "completed">("all");
  const [refreshing, setRefreshing] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      picked_up: "bg-purple-100 text-purple-800",
      processing: "bg-orange-100 text-orange-800",
      ready: "bg-teal-100 text-teal-800",
      out_for_delivery: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const filteredOrders = orders.filter((order) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "active") return !["delivered", "cancelled"].includes(order.status);
    if (selectedFilter === "completed") return ["delivered", "cancelled"].includes(order.status);
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center pb-3  gap-3 mb-4 px-5 border-b border-border">
        <Pressable onPress={() => goBack()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-100">
          <ArrowLeft size={24} color="#374151" />
        </Pressable>
        <Text className="text-2xl font-bold text-gray-900 ">My Orders</Text>
      </View>

      <View className="flex-row gap-2 px-4 pb-4">
        {(["all", "active", "completed"] as const).map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-full ${selectedFilter === filter ? "bg-green-600" : "bg-gray-100"}`}
          >
            <Text className={`font-semibold capitalize ${selectedFilter === filter ? "text-white" : "text-gray-600"}`}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List */}
      <ScrollView className="flex-1" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View className="px-4 gap-4">
          {filteredOrders.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Text className="text-gray-400 text-lg">No orders found</Text>
            </View>
          ) : (
            filteredOrders.map((order) => (
              <View key={order._id} className="bg-foreground border border-border rounded-xl shadow-sm overflow-hidden">
                {/* Order Header */}
                <TouchableOpacity onPress={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)} className="p-4">
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                      <Text className="text-base font-bold text-gray-900 mb-1">{order.orderId}</Text>
                      <Text className="text-sm text-gray-500">
                        {formatDate(order.createdAt)} • {formatTime(order.createdAt)}
                      </Text>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      <Text className="text-xs font-semibold">{getStatusText(order.status)}</Text>
                    </View>
                  </View>

                  {/* Items Preview */}
                  <View className="flex-row gap-3 mb-3">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <View key={idx} className="relative">
                        <Image source={{ uri: item.productId.image }} className="w-14 h-14 rounded-lg" />
                        <View className="absolute -top-1 -right-1 bg-green-600 rounded-full w-5 h-5 items-center justify-center">
                          <Text className="text-white text-xs font-bold">{item.quantity}</Text>
                        </View>
                      </View>
                    ))}
                    {order.items.length > 3 && (
                      <View className="w-14 h-14 rounded-lg bg-gray-100 items-center justify-center">
                        <Text className="text-gray-600 font-semibold">+{order.items.length - 3}</Text>
                      </View>
                    )}
                  </View>

                  {/* Order Summary */}
                  <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                    <Text className="text-gray-600">
                      {order.items.length} item{order.items.length > 1 ? "s" : ""}
                    </Text>
                    <Text className="text-lg font-bold text-gray-900">৳{order.totalAmount}</Text>
                  </View>
                </TouchableOpacity>

                {/* Expanded Details */}
                {expandedOrder === order._id && (
                  <View className="px-4 pb-4 border-t border-gray-100">
                    {/* Items Detail */}
                    <View className="mt-3 gap-2">
                      <Text className="font-semibold text-gray-900 mb-2">Items</Text>
                      {order.items.map((item, idx) => (
                        <View key={idx} className="flex-row items-center gap-3">
                          <Image source={{ uri: item.productId.image }} className="w-12 h-12 rounded-lg" />
                          <View className="flex-1">
                            <Text className="font-medium text-gray-900">{item.productId.name}</Text>
                            <Text className="text-sm text-gray-500">{item.serviceId.name}</Text>
                          </View>
                          <Text className="text-gray-600">x{item.quantity}</Text>
                          <Text className="font-semibold text-gray-900 w-16 text-right">৳{item.subtotal}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Address */}
                    <View className="mt-4 gap-2">
                      <Text className="font-semibold text-gray-900">Delivery Address</Text>
                      <Text className="text-gray-600 text-sm">{order.deliveryAddress.fullAddress}</Text>
                      {order.deliveryAddress.apartment && <Text className="text-gray-500 text-sm">{order.deliveryAddress.apartment}</Text>}
                    </View>

                    {/* Payment */}
                    <View className="mt-4 flex-row justify-between">
                      <View>
                        <Text className="text-sm text-gray-500">Payment Method</Text>
                        <Text className="font-medium text-gray-900 uppercase">{order.paymentMethod}</Text>
                      </View>
                      <View className="items-end">
                        <Text className="text-sm text-gray-500">Payment Status</Text>
                        <Text className={`font-medium capitalize ${order.paymentStatus === "paid" ? "text-green-600" : "text-orange-600"}`}>
                          {order.paymentStatus}
                        </Text>
                      </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="mt-4 flex-row gap-2">
                      {order.status !== "delivered" && order.status !== "cancelled" && (
                        <TouchableOpacity className="flex-1 bg-green-600 py-3 rounded-lg items-center">
                          <Text className="text-white font-semibold">Track Order</Text>
                        </TouchableOpacity>
                      )}
                      {order.status === "delivered" && (
                        <>
                          <TouchableOpacity className="flex-1 bg-green-600 py-3 rounded-lg items-center">
                            <Text className="text-white font-semibold">Reorder</Text>
                          </TouchableOpacity>
                          <TouchableOpacity className="flex-1 bg-gray-100 py-3 rounded-lg items-center">
                            <Text className="text-gray-700 font-semibold">Get Invoice</Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyOrdersScreen;
