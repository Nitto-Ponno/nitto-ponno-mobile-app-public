// AddressModal.tsx
import { AddressPayload } from "@/services/types/cartTypes";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Platform } from "react-native";

interface AddressModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (payload: AddressPayload) => void;
  initialData?: AddressPayload;
}

const AddressModal: React.FC<AddressModalProps> = ({ visible, onClose, onSubmit, initialData }) => {
  const [pickupAddress, setPickupAddress] = useState(initialData?.pickupAddress.fullAddress || "");
  const [pickupApartment, setPickupApartment] = useState(initialData?.pickupAddress.apartment || "");
  const [deliveryAddress, setDeliveryAddress] = useState(initialData?.deliveryAddress.fullAddress || "");
  const [deliveryApartment, setDeliveryApartment] = useState(initialData?.deliveryAddress.apartment || "");
  const [sameAsPickup, setSameAsPickup] = useState(initialData?.deliveryAddress.sameAsPickup || false);

  const handleSubmit = () => {
    if (!pickupAddress.trim()) {
      alert("Please enter a pickup address");
      return;
    }
    if (!sameAsPickup && !deliveryAddress.trim()) {
      alert("Please enter a delivery address");
      return;
    }

    const payload: AddressPayload = {
      pickupAddress: {
        fullAddress: pickupAddress,
        ...(pickupApartment && { apartment: pickupApartment }),
      },
      deliveryAddress: {
        fullAddress: sameAsPickup ? pickupAddress : deliveryAddress,
        ...(sameAsPickup ? pickupApartment && { apartment: pickupApartment } : deliveryApartment && { apartment: deliveryApartment }),
        sameAsPickup: sameAsPickup,
      },
    };

    onSubmit(payload);
    onClose();
  };

  const handleSameAsPickupToggle = () => {
    const newValue = !sameAsPickup;
    setSameAsPickup(newValue);
    if (newValue) {
      setDeliveryAddress(pickupAddress);
      setDeliveryApartment(pickupApartment);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl max-h-[90%]">
            {/* Header */}
            <View className="px-6 py-4 border-b border-gray-200">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold text-gray-900">Address Details</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text className="text-4xl text-gray-500">×</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className="px-6 py-4">
              {/* Pickup Address */}
              <View className="mb-6">
                <Text className="text-lg font-semibold text-gray-900 mb-3">Pickup Address</Text>
                <View className="mb-3">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Full Address *</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
                    placeholder="Enter street address"
                    value={pickupAddress}
                    onChangeText={setPickupAddress}
                    multiline
                  />
                </View>
                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Apartment/Suite (Optional)</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
                    placeholder="Apt, Suite, Floor"
                    value={pickupApartment}
                    onChangeText={setPickupApartment}
                  />
                </View>
              </View>

              {/* Same as Pickup Checkbox */}
              <TouchableOpacity onPress={handleSameAsPickupToggle} className="flex-row items-center mb-6 py-3">
                <View
                  className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
                    sameAsPickup ? "bg-blue-600 border-blue-600" : "border-gray-400"
                  }`}
                >
                  {sameAsPickup && <Text className="text-white text-xs font-bold">✓</Text>}
                </View>
                <Text className="text-base text-gray-700">Delivery address same as pickup</Text>
              </TouchableOpacity>

              {/* Delivery Address */}
              {!sameAsPickup && (
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-gray-900 mb-3">Delivery Address</Text>
                  <View className="mb-3">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Full Address *</Text>
                    <TextInput
                      className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
                      placeholder="Enter street address"
                      value={deliveryAddress}
                      onChangeText={setDeliveryAddress}
                      multiline
                    />
                  </View>
                  <View>
                    <Text className="text-sm font-medium text-gray-700 mb-2">Apartment/Suite (Optional)</Text>
                    <TextInput
                      className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
                      placeholder="Apt, Suite, Floor"
                      value={deliveryApartment}
                      onChangeText={setDeliveryApartment}
                    />
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Footer Button */}
            <View className="px-6 py-4 border-t border-gray-200">
              <TouchableOpacity onPress={handleSubmit} className="bg-blue-600 rounded-lg py-4 items-center">
                <Text className="text-white text-base font-semibold">Confirm Addresses</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddressModal;

// Usage Example:
/*
const [showModal, setShowModal] = useState(false);

<AddressModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  onSubmit={(payload) => {
    console.log('Payload:', payload);
    // Output structure:
    // {
    //   pickupAddress: {
    //     fullAddress: "123 Main St",
    //     apartment: "Apt 4B"
    //   },
    //   deliveryAddress: {
    //     fullAddress: "456 Oak Ave",
    //     apartment: "Suite 200",
    //     sameAsPickup: false
    //   }
    // }
  }}
/>
*/
