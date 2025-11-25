import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import React from "react";
import { dispatch, useAppSelector } from "@/store";
import { setSelectionModal } from "@/store/reducer/productReducer";
import { X } from "lucide-react-native";

import ProductSelection from "./ProductSelection";

// Mock data - replace with useAppSelector

const SelectionModal = () => {
  const { selectionModal } = useAppSelector((state) => state.product);
  console.log("selectionModal", JSON.stringify(selectionModal, null, 2));

  return (
    <Modal visible={selectionModal} transparent statusBarTranslucent={true}>
      <View className="flex-1 bg-black/20 justify-end">
        <Pressable
          className="h-64"
          onPress={() => {
            dispatch(setSelectionModal(false));
          }}
        />
        <View className="flex-1 bg-background pb-6 rounded-tl-3xl rounded-tr-3xl p-4">
          <TouchableOpacity
            onPress={() => {
              dispatch(setSelectionModal(false));
            }}
            className="absolute top-3 right-3 z-20"
          >
            <X size={30} className="text-heading" />
          </TouchableOpacity>
          <ProductSelection
            closeModal={() => {
              dispatch(setSelectionModal(false));
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SelectionModal;
