import React from "react";
import { View, Text, TextInput, Switch, Pressable } from "react-native";
import { SlotPickerModal } from "./SlotPickerModal";

export interface OrderInfo {
  paymentMethod: "COD";
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

export const OrderInfoSection = ({ value, onChange }: { value: OrderInfo; onChange: (key: keyof OrderInfo, val: any) => void }) => {
  const [pickupModal, setPickupModal] = React.useState(false);
  const [deliveryModal, setDeliveryModal] = React.useState(false);

  return (
    <View className="w-full px-4 py-5 rounded-lg gap-6">
      {/* Payment Method */}
      <View>
        <Text className="font-semibold text-lg mb-1">Payment Method</Text>
      </View>

      {/* Pickup Slot */}
      <View>
        <Text className="font-semibold text-lg mb-1">Pickup Slot</Text>

        <Pressable className="border border-gray-300 rounded p-3" onPress={() => setPickupModal(true)}>
          <Text>
            {value.preferredPickupSlot.date
              ? `${value.preferredPickupSlot.date} ${value.preferredPickupSlot.from}-${value.preferredPickupSlot.to}`
              : "Select Pickup Slot"}
          </Text>
        </Pressable>
      </View>

      {/* Delivery Slot */}
      <View>
        <Text className="font-semibold text-lg mb-1">Delivery Slot</Text>

        <Pressable className="border border-gray-300 rounded p-3" onPress={() => setDeliveryModal(true)}>
          <Text>
            {value.preferredDeliverySlot.date
              ? `${value.preferredDeliverySlot.date} ${value.preferredDeliverySlot.from}-${value.preferredDeliverySlot.to}`
              : "Select Delivery Slot"}
          </Text>
        </Pressable>
      </View>

      {/* Special Instructions */}
      <View>
        <Text className="font-semibold text-lg mb-1">Special Instructions</Text>
        <TextInput
          placeholder="Notes…"
          value={value.specialInstructions}
          onChangeText={(t) => onChange("specialInstructions", t)}
          className="border border-gray-300 rounded p-3 h-24"
          multiline
        />
      </View>

      {/* Toggles */}
      <View className="flex-row justify-between items-center">
        <Text className="font-medium text-base">Perfume</Text>
        <Switch value={value.perfume} onValueChange={(v) => onChange("perfume", v)} />
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="font-medium text-base">Fold Only</Text>
        <Switch value={value.foldOnly} onValueChange={(v) => onChange("foldOnly", v)} />
      </View>

      {/* Weight */}
      <View>
        <Text className="font-semibold text-lg mb-1">Total Weight (Kg)</Text>
        <TextInput
          keyboardType="numeric"
          value={String(value.totalWeightKg)}
          onChangeText={(t) => onChange("totalWeightKg", Number(t) || 0)}
          className="border border-gray-300 rounded p-3"
        />
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
