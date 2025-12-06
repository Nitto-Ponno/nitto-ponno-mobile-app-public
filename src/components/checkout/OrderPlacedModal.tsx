import { View, Text, Modal, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Package,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Tag,
  Weight,
  Sparkles,
  Shirt,
  MessageSquare,
  CheckCircle2,
  Truck,
  CreditCard,
  Home,
} from "lucide-react-native";
import { Colors } from "@/context/ThemeProvider";
import NText from "../global/NText";
import { navigate } from "@/utils/NavigationUtils";

type props = {
  visible: boolean;
  onClose: () => void;
  order: OrderData;
};

const OrderPlacedModal = ({ visible, onClose, order }: props) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (timeStr: string) => {
    const [h, m] = timeStr.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  };

  // Format date and time range
  const formatSlot = (slot: { date: string; from: string; to: string }) => {
    return {
      date: formatDate(slot.date),
      time: `${formatTime(slot.from)} - ${formatTime(slot.to)}`,
    };
  };

  const pickupSlot = formatSlot(order.preferredPickupSlot);
  const deliverySlot = formatSlot(order.preferredDeliverySlot);

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300" };
      case "picked_up":
        return { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300" };
      case "in_progress":
        return { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300" };
      case "ready":
        return { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-300" };
      case "delivered":
        return { bg: "bg-green-100", text: "text-green-700", border: "border-green-300" };
      case "cancelled":
        return { bg: "bg-red-100", text: "text-red-700", border: "border-red-300" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" };
    }
  };

  const statusColors = getStatusColor(order.status);
  return (
    <Modal visible={visible}>
      <SafeAreaView className="flex-1 bg-background">
        <ScrollView className="flex-1 bg-background">
          <View className="p-4 gap-4">
            {/* Header Card */}
            <View className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 shadow-lg">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center gap-3">
                  <View className="bg-white/20 p-3 rounded-2xl">
                    <Package size={28} color={Colors.body} />
                  </View>
                  <View>
                    <Text className="text-body text-xs font-semibold mb-1">ORDER ID</Text>
                    <Text className="text-heading text-lg font-bold">{order.orderId}</Text>
                  </View>
                </View>
                <View className={`px-4 py-2 rounded-full ${statusColors.bg} border ${statusColors.border}`}>
                  <Text className={`${statusColors.text} font-bold text-sm uppercase`}>{order.status.replace("_", " ")}</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-2 bg-white/10 rounded-xl p-3">
                <Calendar size={16} color={Colors.body} />
                <Text className="text-body text-sm">Placed on {formatDate(order.createdAt)}</Text>
              </View>
            </View>

            {/* Addresses Card */}
            <View className="bg-foreground rounded-3xl p-5 shadow-sm">
              <View className="flex-row items-center gap-2 mb-4">
                <MapPin size={22} color="#3B82F6" />
                <Text className="text-lg font-bold text-heading">Addresses</Text>
              </View>

              {/* Pickup Address */}
              <View className="bg-foreground rounded-2xl p-4 mb-3 border border-border">
                <View className="flex-row items-center gap-2 mb-2">
                  <Truck size={18} color="#3B82F6" />
                  <Text className="text-sm font-bold text-blue-700">PICKUP ADDRESS</Text>
                </View>
                <Text className="text-body text-base leading-5">{order.pickupAddress.fullAddress}</Text>
              </View>

              {/* Delivery Address */}
              <View className="bg-foreground rounded-2xl p-4 border border-border">
                <View className="flex-row items-center gap-2 mb-2">
                  <Home size={18} color="#8B5CF6" />
                  <Text className="text-sm font-bold text-purple-700">DELIVERY ADDRESS</Text>
                </View>
                {order.deliveryAddress.sameAsPickup ? (
                  <View className="flex-row items-center gap-2">
                    <CheckCircle2 size={16} color="#8B5CF6" />
                    <Text className="text-purple-600 font-semibold">Same as pickup address</Text>
                  </View>
                ) : (
                  <Text className="text-gray-700 text-base leading-5">{order.deliveryAddress.fullAddress}</Text>
                )}
              </View>
            </View>

            {/* Schedule Card */}
            <View className="bg-foreground border border-border rounded-3xl p-5 shadow-sm">
              <View className="flex-row items-center gap-2 mb-4">
                <Clock size={22} color="#F59E0B" />
                <Text className="text-lg font-bold text-heading">Schedule</Text>
              </View>

              <View className="gap-3">
                {/* Pickup Slot */}
                <View className=" rounded-2xl p-4 border border-border">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-sm font-bold text-amber-700">PICKUP SLOT</Text>
                    <Truck size={16} color="#F59E0B" />
                  </View>
                  <View className="flex-row items-center gap-2 mb-1">
                    <Calendar size={14} color="#D97706" />
                    <Text className="text-heading font-semibold">{pickupSlot.date}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Clock size={14} color="#D97706" />
                    <Text className="text-body">{pickupSlot.time}</Text>
                  </View>
                </View>

                {/* Delivery Slot */}
                <View className=" rounded-2xl p-4 border border-border">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-sm font-bold text-green-700">DELIVERY SLOT</Text>
                    <Package size={16} color="#10B981" />
                  </View>
                  <View className="flex-row items-center gap-2 mb-1">
                    <Calendar size={14} color="#059669" />
                    <Text className="text-heading font-semibold">{deliverySlot.date}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Clock size={14} color="#059669" />
                    <Text className="text-body">{deliverySlot.time}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Order Items Card */}
            <View className="bg-foreground rounded-3xl p-5 border border-border">
              <View className="flex-row items-center gap-2 mb-4">
                <Tag size={22} color="#EC4899" />
                <Text className="text-lg font-bold text-heading">Order Items</Text>
              </View>

              {order.items.map((item, index) => (
                <View key={index} className="flex-row items-center justify-between border border-border rounded-2xl p-4 mb-2">
                  <View className="flex-1">
                    <Text className="text-heading font-semibold text-base mb-1">Laundry Service</Text>
                    <Text className="text-gray-500 text-sm">Quantity: {item.quantity}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-heading font-bold text-lg">৳{item.subtotal}</Text>
                    <Text className="text-gray-400 text-xs line-through">৳{item.unitPrice}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Service Options Card */}
            <View className="bg-foreground border border-border rounded-3xl p-5">
              <View className="flex-row items-center gap-2 mb-4">
                <Sparkles size={22} color="#8B5CF6" />
                <Text className="text-lg font-bold text-heading">Service Options</Text>
              </View>

              <View className="gap-3">
                {/* Weight */}
                <View className="flex-row items-center justify-between border border-border rounded-2xl p-4">
                  <View className="flex-row items-center gap-3">
                    <View className="bg-green-100 p-2 rounded-xl">
                      <Weight size={20} color="#10B981" />
                    </View>
                    <Text className="text-body font-semibold">Total Weight</Text>
                  </View>
                  <Text className="text-heading font-bold text-lg">{order.totalWeightKg} KG</Text>
                </View>

                {/* Perfume */}
                <View className={`flex-row items-center justify-between rounded-2xl p-4 border border-border`}>
                  <View className="flex-row items-center gap-3">
                    <View className={`p-2 rounded-xl ${order.perfume ? "bg-pink-100" : "bg-gray-100"}`}>
                      <Sparkles size={20} color={order.perfume ? "#EC4899" : "#9CA3AF"} />
                    </View>
                    <Text className={`font-semibold ${order.perfume ? "text-pink-700" : "text-gray-500"}`}>Add Perfume</Text>
                  </View>
                  {order.perfume && <CheckCircle2 size={24} color="#EC4899" />}
                </View>

                {/* Fold Only */}
                <View className={`flex-row items-center justify-between rounded-2xl p-4 border border-border`}>
                  <View className="flex-row items-center gap-3">
                    <View className={`p-2 rounded-xl ${order.foldOnly ? "bg-purple-100" : "bg-gray-100"}`}>
                      <Shirt size={20} color={order.foldOnly ? "#8B5CF6" : "#9CA3AF"} />
                    </View>
                    <Text className={`font-semibold ${order.foldOnly ? "text-purple-700" : "text-gray-500"}`}>Fold Only</Text>
                  </View>
                  {order.foldOnly && <CheckCircle2 size={24} color="#8B5CF6" />}
                </View>
              </View>
            </View>

            {/* Special Instructions */}
            {order.specialInstructions && (
              <View className="bg-foreground border border-border rounded-3xl p-5 shadow-sm">
                <View className="flex-row items-center gap-2 mb-3">
                  <MessageSquare size={22} color="#F59E0B" />
                  <Text className="text-lg font-bold text-heading">Special Instructions</Text>
                </View>
                <View className="bg-background rounded-2xl p-4 border-l-4 border-amber-400">
                  <Text className="text-body text-base leading-6">{order.specialInstructions}</Text>
                </View>
              </View>
            )}

            {/* Payment Summary Card */}
            <View className="bg-foreground border border-border rounded-3xl p-5 shadow-sm">
              <View className="flex-row items-center gap-2 mb-4">
                <DollarSign size={22} color="#10B981" />
                <Text className="text-lg font-bold text-heading">Payment Summary</Text>
              </View>

              <View className="gap-3">
                {/* Payment Method */}
                <View className="flex-row items-center justify-between rounded-2xl p-4 border border-border">
                  <View className="flex-row items-center gap-3">
                    <CreditCard size={20} color="#10B981" />
                    <Text className="text-green-700 font-bold">{order.paymentMethod.toUpperCase()}</Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${order.paymentStatus === "pending" ? "bg-yellow-100" : "bg-green-100"}`}>
                    <Text className={`text-xs font-bold ${order.paymentStatus === "pending" ? "text-yellow-700" : "text-green-700"}`}>
                      {order.paymentStatus.toUpperCase()}
                    </Text>
                  </View>
                </View>

                {/* Price Breakdown */}
                <View className="bg-accent rounded-2xl p-4 gap-3">
                  <View className="flex-row justify-between">
                    <Text className="text-body">Subtotal</Text>
                    <Text className="text-heading font-semibold">৳{order.subtotal.toFixed(2)}</Text>
                  </View>

                  {order.itemDiscountTotal > 0 && (
                    <View className="flex-row justify-between">
                      <Text className="text-body">Discount</Text>
                      <Text className="text-green-600 font-semibold">-৳{order.itemDiscountTotal.toFixed(2)}</Text>
                    </View>
                  )}

                  {order.tax > 0 && (
                    <View className="flex-row justify-between">
                      <Text className="text-body">Tax</Text>
                      <Text className="text-heading font-semibold">৳{order.tax.toFixed(2)}</Text>
                    </View>
                  )}

                  {order.deliveryCharge > 0 && (
                    <View className="flex-row justify-between">
                      <Text className="text-body">Delivery Charge</Text>
                      <Text className="text-heading font-semibold">৳{order.deliveryCharge.toFixed(2)}</Text>
                    </View>
                  )}

                  <View className="border-t-2 border-border pt-3 mt-1">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-heading font-bold text-lg">Total Amount</Text>
                      <Text className="text-green-600 font-bold text-2xl">৳{order.totalAmount.toFixed(2)}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Timeline Card */}
            <View className="bg-foreground border border-border rounded-3xl p-5 shadow-sm mb-6">
              <View className="flex-row items-center gap-2 mb-4">
                <Clock size={22} color="#6366F1" />
                <Text className="text-lg font-bold text-heading">Order Timeline</Text>
              </View>

              {order.timeline.map((event, index) => (
                <View key={index} className="flex-row gap-3 mb-4">
                  <View className="items-center">
                    <View className="bg-indigo-100 p-2 rounded-full">
                      <CheckCircle2 size={16} color="#6366F1" />
                    </View>
                    {index < order.timeline.length - 1 && <View className="w-0.5 flex-1 bg-indigo-200 mt-2" style={{ minHeight: 20 }} />}
                  </View>
                  <View className="flex-1 pb-2">
                    <Text className="text-heading font-semibold mb-1">{event.status.replace("_", " ").toUpperCase()}</Text>
                    <Text className="text-body text-sm mb-1">{event.note}</Text>
                    <Text className="text-gray-400 text-xs">{new Date(event.timestamp).toLocaleString()}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            onClose();
            navigate("BottomTabNavigator", {
              screen: "HomeStack",
              params: {
                screen: "Home",
              },
            });
          }}
          className="h-14 justify-center items-center bg-primary mx-4 rounded-2xl"
        >
          <NText className="font-semibold text-lg text-white">Continue Shopping</NText>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default OrderPlacedModal;
interface OrderData {
  orderId: string;
  user: string;
  pickupAddress: {
    fullAddress: string;
  };
  deliveryAddress: {
    fullAddress: string;
    sameAsPickup: boolean;
  };
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    variations: any[];
    attributeValues: any[];
  }>;
  subtotal: number;
  itemDiscountTotal: number;
  tax: number;
  deliveryCharge: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  preferredPickupSlot: {
    date: string;
    from: string;
    to: string;
  };
  preferredDeliverySlot: {
    date: string;
    from: string;
    to: string;
  };
  status: string;
  timeline: Array<{
    status: string;
    timestamp: string;
    note: string;
  }>;
  specialInstructions: string;
  perfume: boolean;
  foldOnly: boolean;
  totalWeightKg: number;
  source: string;
  createdAt: string;
}
