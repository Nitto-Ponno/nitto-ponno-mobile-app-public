// AddressSection.tsx
import { AddressPayload } from "@/services/types/cartTypes";
import { dispatch, useAppSelector } from "@/store";
import { updateOrderPayload } from "@/store/reducer/orderReducer";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AddressModal from "./AddressModal";
import { EditIcon, MapPinIcon, PackageIcon, Truck } from "lucide-react-native";

// Main Address Display Section Component
const AddressSection: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { pickupAddress, deliveryAddress } = useAppSelector((state) => state.order);
  const handleAddressSubmit = (payload: AddressPayload) => {
    // dispatch(setAddress(payload));
    dispatch(updateOrderPayload({ key: "pickupAddress", value: payload.pickupAddress }));
    dispatch(updateOrderPayload({ key: "deliveryAddress", value: payload.deliveryAddress }));
  };

  // If no addresses set, show add button
  if (!pickupAddress?.fullAddress || !deliveryAddress?.fullAddress) {
    return (
      <View className="bg-foreground rounded-xl p-6 my-3 border-border border">
        <View className="flex-row items-center mb-4">
          <MapPinIcon />
          <Text className="text-lg font-bold text-heading ml-2">Addresses</Text>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="border-2 border-dashed border-gray-300 rounded-lg py-6 items-center"
        >
          <Text className="text-4xl mb-2">+</Text>
          <Text className="text-base font-medium text-heading">Add Pickup & Delivery Address</Text>
        </TouchableOpacity>

        <AddressModal visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleAddressSubmit} />
      </View>
    );
  }

  // If addresses exist, show them
  return (
    <View className="bg-foreground rounded-xl p-5 my-3 border-border border">
      {/* Header with Edit Button */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <MapPinIcon />
          <Text className="text-lg font-bold text-heading ml-2">Addresses</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)} className="flex-row items-center bg-secondary px-3 py-2 rounded-lg">
          <EditIcon />
          <Text className=" font-semibold text-heading ml-1">Change</Text>
        </TouchableOpacity>
      </View>

      {/* Pickup Address */}
      <View className="mb-4">
        <View className="flex-row items-center mb-2">
          <PackageIcon />
          <Text className="text-sm font-semibold text-heading ml-2">Pickup Address</Text>
        </View>
        <View className="bg-blue-50 rounded-lg p-3 ml-7">
          <Text className="text-base text-heading font-medium">{pickupAddress.fullAddress}</Text>
          {pickupAddress.apartment && <Text className="text-sm text-gray-600 mt-1">{pickupAddress.apartment}</Text>}
        </View>
      </View>
      {/* Delivery Address */}
      <View>
        <View className="flex-row items-center mb-2">
          <Truck />
          <Text className="text-sm font-semibold text-heading ml-2">Delivery Address</Text>
          {deliveryAddress?.sameAsPickup && (
            <View className="bg-green-100 px-2 py-1 rounded ml-2">
              <Text className="text-xs font-medium text-green-700">Same as pickup</Text>
            </View>
          )}
        </View>
        <View className="bg-green-50 rounded-lg p-3 ml-7">
          <Text className="text-base text-heading font-medium">{deliveryAddress?.fullAddress}</Text>
          {deliveryAddress?.apartment && <Text className="text-sm text-gray-600 mt-1">{deliveryAddress.apartment}</Text>}
        </View>
      </View>

      {modalVisible && (
        <AddressModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAddressSubmit}
          initialData={{ pickupAddress, deliveryAddress }}
        />
      )}
    </View>
  );
};

export default AddressSection;
