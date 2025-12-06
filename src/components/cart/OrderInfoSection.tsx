import React from "react";
import { View, Text, TextInput, Pressable, Animated } from "react-native";
import { Calendar, Clock, Package, Truck, MessageSquare, Weight, Sparkles, Shirt, AlertCircle } from "lucide-react-native";
import { SlotPickerModal } from "./SlotPickerModal";
import { Colors } from "@/context/ThemeProvider";

export interface OrderInfo {
  paymentMethod: "cod";
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
  specialInstructions: string;
  perfume: boolean;
  foldOnly: boolean;
  totalWeightKg: number;
  source: "app" | "website" | "admin";
}

// Custom Toggle Switch Component
const CustomSwitch = ({
  value,
  onValueChange,
  icon: Icon,
  label,
  activeColor = "#3B82F6",
}: {
  value: boolean;
  onValueChange: (v: boolean) => void;
  icon: any;
  label: string;
  activeColor?: string;
}) => {
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: value ? 1 : 0,
      useNativeDriver: false,
      tension: 50,
      friction: 7,
    }).start();
  }, [value]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 28],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.body, activeColor],
  });

  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      className="flex-row items-center justify-between bg-background p-4 rounded-2xl border border-border "
    >
      <View className="flex-row items-center gap-3">
        <View className={`p-2 rounded-xl border-border border ${value ? "bg-blue-50" : "bg-foreground "}`}>
          <Icon size={20} color={value ? activeColor : Colors.body} />
        </View>
        <Text className={`text-base font-semibold ${value ? "text-heading" : "text-gray-500"}`}>{label}</Text>
      </View>

      <Animated.View style={{ backgroundColor }} className="w-14 h-7 rounded-full justify-center">
        <Animated.View style={{ transform: [{ translateX }] }} className="w-5 h-5 bg-background rounded-full shadow-md" />
      </Animated.View>
    </Pressable>
  );
};

export const OrderInfoSection = ({ value, onChange }: { value: OrderInfo; onChange: (key: keyof OrderInfo, val: any) => void }) => {
  const [pickupModal, setPickupModal] = React.useState(false);
  const [deliveryModal, setDeliveryModal] = React.useState(false);

  // Format date for display
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Format time for display
  const formatTimeDisplay = (timeStr: string) => {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  };

  // Validate delivery slot is not before pickup slot
  const validateSlots = () => {
    const pickup = value.preferredPickupSlot;
    const delivery = value.preferredDeliverySlot;

    if (!pickup.date || !delivery.date) return null;

    // Compare dates
    if (delivery.date < pickup.date) {
      return "Delivery date cannot be before pickup date";
    }

    // If same date, compare times
    if (delivery.date === pickup.date && delivery.from && pickup.to) {
      const pickupEnd = pickup.to.split(":").map(Number);
      const deliveryStart = delivery.from.split(":").map(Number);

      const pickupEndMinutes = pickupEnd[0] * 60 + pickupEnd[1];
      const deliveryStartMinutes = deliveryStart[0] * 60 + deliveryStart[1];

      if (deliveryStartMinutes < pickupEndMinutes) {
        return "Delivery time must be after pickup time on the same day";
      }
    }

    return null;
  };

  const slotError = validateSlots();

  return (
    <View className="bg-foreground border border-border mt-4 p-4 rounded-lg gap-4 mb-4">
      {/* Payment Method */}
      <View className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
        <View className="flex-row items-center gap-3">
          <View className="bg-green-100 p-2 rounded-xl">
            <Package size={24} color="#059669" />
          </View>
          <View>
            <Text className="text-xs font-semibold text-green-700 mb-0.5">PAYMENT METHOD</Text>
            <Text className="text-lg font-bold text-green-900">Cash on Delivery</Text>
          </View>
        </View>
      </View>

      {/* Pickup Slot */}
      <View>
        <View className="flex-row items-center gap-2 mb-3">
          <Truck size={20} color="#3B82F6" />
          <Text className="font-bold text-lg text-heading">Pickup Slot</Text>
        </View>

        <Pressable className="bg-background border border-border rounded-2xl p-4  " onPress={() => setPickupModal(true)}>
          {value.preferredPickupSlot.date ? (
            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Calendar size={16} color={Colors.body} />
                <Text className="text-base font-semibold text-heading">{formatDateDisplay(value.preferredPickupSlot.date)}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Clock size={16} color={Colors.body} />
                <Text className="text-sm text-gray-600">
                  {formatTimeDisplay(value.preferredPickupSlot.from)} - {formatTimeDisplay(value.preferredPickupSlot.to)}
                </Text>
              </View>
            </View>
          ) : (
            <View className="flex-row items-center gap-2">
              <Calendar size={18} color={Colors.body} />
              <Text className="text-gray-400 text-base">Select Pickup Slot</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Delivery Slot */}
      <View>
        <View className="flex-row items-center gap-2 mb-3">
          <Package size={20} color="#8B5CF6" />
          <Text className="font-bold text-lg text-heading">Delivery Slot</Text>
        </View>

        <Pressable className="bg-background border border-border rounded-2xl p-4  " onPress={() => setDeliveryModal(true)}>
          {value.preferredDeliverySlot.date ? (
            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Calendar size={16} color={Colors.body} />
                <Text className="text-base font-semibold text-heading">{formatDateDisplay(value.preferredDeliverySlot.date)}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Clock size={16} color={Colors.body} />
                <Text className="text-sm text-gray-600">
                  {formatTimeDisplay(value.preferredDeliverySlot.from)} - {formatTimeDisplay(value.preferredDeliverySlot.to)}
                </Text>
              </View>
            </View>
          ) : (
            <View className="flex-row items-center gap-2">
              <Calendar size={18} color={Colors.body} />
              <Text className="text-gray-400 text-base">Select Delivery Slot</Text>
            </View>
          )}
        </Pressable>

        {/* Slot Validation Error */}
        {slotError && (
          <View className="mt-3 bg-red-50 border-l-4 border-red-500 p-3 rounded-lg flex-row items-start gap-2">
            <AlertCircle size={18} color="#EF4444" style={{ marginTop: 2 }} />
            <Text className="text-red-700 text-sm font-medium flex-1">{slotError}</Text>
          </View>
        )}
      </View>

      {/* Special Instructions */}
      <View>
        <View className="flex-row items-center gap-2 mb-3">
          <MessageSquare size={20} color="#F59E0B" />
          <Text className="font-bold text-lg text-heading">Special Instructions</Text>
        </View>
        <TextInput
          placeholder="Add any special notes or instructions..."
          placeholderTextColor={Colors.body}
          value={value.specialInstructions}
          onChangeText={(t) => onChange("specialInstructions", t)}
          className="bg-background border border-border rounded-2xl p-4 text-base text-heading"
          style={{ minHeight: 100, textAlignVertical: "top" }}
          multiline
        />
      </View>

      {/* Service Options */}
      <View>
        <Text className="font-bold text-lg text-heading mb-3">Service Options</Text>
        <View className="gap-3">
          <CustomSwitch
            value={value.perfume}
            onValueChange={(v) => onChange("perfume", v)}
            icon={Sparkles}
            label="Add Perfume"
            activeColor="#EC4899"
          />

          <CustomSwitch
            value={value.foldOnly}
            onValueChange={(v) => onChange("foldOnly", v)}
            icon={Shirt}
            label="Fold Only"
            activeColor="#8B5CF6"
          />
        </View>
      </View>

      {/* Weight */}
      <View>
        <View className="flex-row items-center gap-2 mb-3">
          <Weight size={20} color="#10B981" />
          <Text className="font-bold text-lg text-heading">Total Weight</Text>
        </View>
        <View className="flex-row items-center bg-background border border-border rounded-2xl overflow-hidden">
          <TextInput
            keyboardType="numeric"
            value={String(value.totalWeightKg)}
            onChangeText={(t) => onChange("totalWeightKg", Number(t) || 0)}
            placeholder="0"
            placeholderTextColor={Colors.body}
            className="flex-1 p-4 text-base font-semibold text-heading"
          />
          <View className=" px-4 py-3">
            <Text className="text-gray-600 font-bold">KG</Text>
          </View>
        </View>
      </View>

      {/* Modals */}
      <SlotPickerModal
        visible={pickupModal}
        onClose={() => setPickupModal(false)}
        initialValue={value.preferredPickupSlot}
        onConfirm={(slot) => onChange("preferredPickupSlot", slot)}
      />

      <SlotPickerModal
        visible={deliveryModal}
        onClose={() => setDeliveryModal(false)}
        initialValue={value.preferredDeliverySlot}
        onConfirm={(slot) => onChange("preferredDeliverySlot", slot)}
      />
    </View>
  );
};
