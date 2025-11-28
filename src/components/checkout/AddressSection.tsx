// AddressSection.tsx
import { AddressPayload } from "@/services/types/cartTypes";
import { dispatch, useAppSelector } from "@/store";
import { setAddress } from "@/store/reducer/cartReducer";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AddressModal from "./AddressModal";
import { EditIcon, MapPinIcon, PackageIcon, Truck } from "lucide-react-native";

// Main Address Display Section Component
const AddressSection: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { addresses } = useAppSelector((state) => state.cart);
  const handleAddressSubmit = (payload: AddressPayload) => {
    dispatch(setAddress(payload));
  };

  // If no addresses set, show add button
  if (!addresses) {
    return (
      <View className="bg-surface rounded-xl p-6 my-3 border-outline border">
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
    <View className="bg-surface rounded-xl p-5 my-3 border-outline border">
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
          <Text className="text-base text-heading font-medium">{addresses.pickupAddress.fullAddress}</Text>
          {addresses.pickupAddress.apartment && <Text className="text-sm text-gray-600 mt-1">{addresses.pickupAddress.apartment}</Text>}
        </View>
      </View>
      {/* Delivery Address */}
      <View>
        <View className="flex-row items-center mb-2">
          <Truck />
          <Text className="text-sm font-semibold text-heading ml-2">Delivery Address</Text>
          {addresses.deliveryAddress.sameAsPickup && (
            <View className="bg-green-100 px-2 py-1 rounded ml-2">
              <Text className="text-xs font-medium text-green-700">Same as pickup</Text>
            </View>
          )}
        </View>
        <View className="bg-green-50 rounded-lg p-3 ml-7">
          <Text className="text-base text-heading font-medium">{addresses.deliveryAddress.fullAddress}</Text>
          {addresses.deliveryAddress.apartment && <Text className="text-sm text-gray-600 mt-1">{addresses.deliveryAddress.apartment}</Text>}
        </View>
      </View>

      <AddressModal visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleAddressSubmit} initialData={addresses} />
    </View>
  );
};

export default AddressSection;
