import React from "react";
import { Modal, View, Text, Pressable } from "react-native";

interface SlotPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (value: { date: string; from: string; to: string }) => void;
  initialValue: { date: string; from: string; to: string };
}

export const SlotPickerModal: React.FC<SlotPickerModalProps> = ({ visible, onClose, onConfirm, initialValue }) => {
  const [local, setLocal] = React.useState(initialValue);

  React.useEffect(() => {
    setLocal(initialValue);
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-11/12 bg-white p-5 rounded-xl gap-4">
          <Text className="text-xl font-semibold">Select Slot</Text>

          {/* Replace these with actual pickers */}
          <Pressable
            className="p-3 border rounded"
            onPress={() => {
              // placeholder: you can open a real date picker here
              setLocal({ ...local, date: "2025-02-10" });
            }}
          >
            <Text>Date: {local.date || "Select Date"}</Text>
          </Pressable>

          <Pressable
            className="p-3 border rounded"
            onPress={() => {
              // Replace with time picker
              setLocal({ ...local, from: "10:00" });
            }}
          >
            <Text>From: {local.from || "Select Time"}</Text>
          </Pressable>

          <Pressable
            className="p-3 border rounded"
            onPress={() => {
              // Replace with time picker
              setLocal({ ...local, to: "12:00" });
            }}
          >
            <Text>To: {local.to || "Select Time"}</Text>
          </Pressable>

          {/* Actions */}
          <View className="flex-row justify-end gap-4 pt-2">
            <Pressable onPress={onClose}>
              <Text className="text-red-500 font-semibold">Cancel</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                onConfirm(local);
                onClose();
              }}
            >
              <Text className="text-blue-600 font-semibold">Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
