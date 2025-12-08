// AddressModal.tsx
import { Colors } from "@/context/ThemeProvider";
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
          <View className="bg-foreground rounded-t-3xl max-h-[90%]">
            {/* Header */}
            <View className="px-6 py-4 border-b border-border">
              <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-bold text-heading">Address Details</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text className="text-4xl text-error">×</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className="px-6 py-4">
              {/* Pickup Address */}
              <View className="mb-6">
                <Text className="text-lg font-semibold text-heading mb-3">Pickup Address</Text>
                <View className="mb-3">
                  <Text className="text-sm font-medium text-heading mb-2">Full Address *</Text>
                  <TextInput
                    className="border border-border rounded-lg px-4 py-3 text-base text-heading"
                    placeholder="Enter street address"
                    value={pickupAddress}
                    onChangeText={setPickupAddress}
                    multiline
                    placeholderTextColor={Colors.body}
                  />
                </View>
                <View>
                  <Text className="text-sm font-medium text-heading mb-2">Apartment/Suite (Optional)</Text>
                  <TextInput
                    className="border border-border rounded-lg px-4 py-3 text-base text-heading"
                    placeholder="Apt, Suite, Floor"
                    value={pickupApartment}
                    onChangeText={setPickupApartment}
                    placeholderClassName="text-body"
                    placeholderTextColor={Colors.body}
                  />
                </View>
              </View>

              {/* Same as Pickup Checkbox */}
              <TouchableOpacity onPress={handleSameAsPickupToggle} className="flex-row items-center mb-3">
                <View
                  className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${
                    sameAsPickup ? "bg-success border-success" : "border-body"
                  }`}
                >
                  {sameAsPickup && <Text className="text-white text-xs font-bold">✓</Text>}
                </View>
                <Text className={`text-lg  ${sameAsPickup ? "text-success" : "text-body"}`}>Delivery address same as pickup</Text>
              </TouchableOpacity>

              {/* Delivery Address */}
              {!sameAsPickup && (
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-heading mb-3">Delivery Address</Text>
                  <View className="mb-3">
                    <Text className="text-sm font-medium text-heading mb-2">Full Address *</Text>
                    <TextInput
                      className="border border-border rounded-lg px-4 py-3 text-base text-heading"
                      placeholder="Enter street address"
                      value={deliveryAddress}
                      onChangeText={setDeliveryAddress}
                      multiline
                      placeholderTextColor={Colors.body}
                    />
                  </View>
                  <View>
                    <Text className="text-sm font-medium text-heading mb-2">Apartment/Suite (Optional)</Text>
                    <TextInput
                      className="border border-border rounded-lg px-4 py-3 text-base text-heading"
                      placeholder="Apt, Suite, Floor"
                      value={deliveryApartment}
                      onChangeText={setDeliveryApartment}
                      placeholderTextColor={Colors.body}
                    />
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Footer Button */}
            <View className="px-6 py-4 border-t border-border">
              <TouchableOpacity onPress={handleSubmit} className="bg-primary rounded-lg py-4 items-center">
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
