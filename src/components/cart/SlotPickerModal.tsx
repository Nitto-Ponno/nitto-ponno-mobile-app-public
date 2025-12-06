import React, { useState, useEffect } from "react";
import { Modal, View, Pressable, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import NText from "../global/NText";
import { useTheme } from "@/context/ThemeProvider";

interface SlotPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (value: { date: string; from: string; to: string }) => void;
  initialValue: { date: string; from: string; to: string };
}

export const SlotPickerModal: React.FC<SlotPickerModalProps> = ({ visible, onClose, onConfirm, initialValue }) => {
  const [local, setLocal] = useState(initialValue);
  const [openPicker, setOpenPicker] = useState<null | "date" | "from" | "to">(null);
  const [error, setError] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    setLocal(initialValue);
    setError("");
  }, [visible]);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const formatTime = (date: Date) => date.toTimeString().slice(0, 5);

  // Format date for display (e.g., "Dec 5, 2024")
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "Select Date";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Format time for display (e.g., "2:30 PM")
  const formatTimeDisplay = (timeStr: string) => {
    if (!timeStr) return "Select Time";
    const [h, m] = timeStr.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  };

  // Compare HH:mm strings by converting them to minutes
  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  // VALIDATION
  const validate = (updated: { date: string; from: string; to: string }) => {
    const today = formatDate(new Date());

    // 1️⃣ No past dates
    if (updated.date && updated.date < today) {
      setError("Date cannot be in the past.");
      return false;
    }

    // 2️⃣ from <= to
    if (updated.from && updated.to) {
      if (toMinutes(updated.from) > toMinutes(updated.to)) {
        setError("From time cannot be greater than To time.");
        return false;
      }
    }

    setError("");
    return true;
  };

  const updateLocal = (key: "date" | "from" | "to", value: string) => {
    const updated = { ...local, [key]: value };
    setLocal(updated);
    validate(updated);
  };

  return (
    <Modal transparent statusBarTranslucent={true} visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center px-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
        <View className="w-full max-w-md bg-accent border border-border rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <View className=" p-4 pb-0">
            <NText className="text-2xl font-bold text-heading">Select Time Slot</NText>
            <NText className="text-body text-sm mt-1">Choose your preferred date and time</NText>
          </View>

          <ScrollView className="p-4 pb-0" showsVerticalScrollIndicator={false}>
            {/* Date Picker */}
            <View className="mb-4">
              <NText className="text-sm font-semibold text-heading mb-2">📅 Date</NText>
              <Pressable className="bg-foreground p-4 rounded-2xl border border-border  " onPress={() => setOpenPicker("date")}>
                <NText className="text-base font-medium text-body">{formatDateDisplay(local.date)}</NText>
              </Pressable>
            </View>

            {/* Time Range */}
            <View className="flex-row gap-3 mb-4">
              {/* From Time */}
              <View className="flex-1">
                <NText className="text-sm font-semibold text-heading mb-2">🕐 From</NText>
                <Pressable className="bg-foreground p-4 rounded-2xl border border-border  " onPress={() => setOpenPicker("from")}>
                  <NText className="text-base font-medium text-body">{formatTimeDisplay(local.from)}</NText>
                </Pressable>
              </View>

              {/* To Time */}
              <View className="flex-1">
                <NText className="text-sm font-semibold text-heading mb-2">🕐 To</NText>
                <Pressable className="bg-foreground p-4 rounded-2xl border border-border  " onPress={() => setOpenPicker("to")}>
                  <NText className="text-base font-medium text-body">{formatTimeDisplay(local.to)}</NText>
                </Pressable>
              </View>
            </View>

            {/* Error Message */}
            {error.length > 0 && (
              <View className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4">
                <NText className="text-red-700 text-sm font-medium">⚠️ {error}</NText>
              </View>
            )}

            {/* Summary Card */}
            {local.date && local.from && local.to && !error && (
              <View className=" p-4 rounded-2xl border border-border mb-4">
                <NText className="text-xs font-semibold text-blue-600 mb-2">SELECTED SLOT</NText>
                <NText className="text-base text-blue-900 font-medium">
                  {formatDateDisplay(local.date)} • {formatTimeDisplay(local.from)} - {formatTimeDisplay(local.to)}
                </NText>
              </View>
            )}
          </ScrollView>

          {/* Real Pickers */}
          {openPicker === "date" && (
            <DateTimePicker
              themeVariant={theme}
              value={new Date(local.date || Date.now())}
              mode="date"
              display="spinner"
              minimumDate={new Date()}
              onChange={(_, selected) => {
                if (!selected) return setOpenPicker(null);
                updateLocal("date", formatDate(selected));
                setOpenPicker(null);
              }}
            />
          )}

          {openPicker === "from" && (
            <DateTimePicker
              themeVariant={theme}
              value={new Date(`1970-01-01T${local.from || "09:00"}:00`)}
              mode="time"
              display="spinner"
              onChange={(_, selected) => {
                if (!selected) return setOpenPicker(null);
                updateLocal("from", formatTime(selected));
                setOpenPicker(null);
              }}
            />
          )}

          {openPicker === "to" && (
            <DateTimePicker
              themeVariant={theme}
              value={new Date(`1970-01-01T${local.to || "10:00"}:00`)}
              mode="time"
              display="spinner"
              onChange={(_, selected) => {
                if (!selected) return setOpenPicker(null);
                updateLocal("to", formatTime(selected));
                setOpenPicker(null);
              }}
            />
          )}

          {/* Action Buttons */}
          <View className="flex-row border-t border-border">
            <Pressable onPress={onClose} className="flex-1 p-4 ">
              <NText className="text-center text-base font-semibold text-gray-600">Cancel</NText>
            </Pressable>

            <View className="w-px bg-gray-200" />

            <Pressable
              disabled={error.length > 0 || !local.date || !local.from || !local.to}
              onPress={() => {
                if (!validate(local)) return;
                onConfirm(local);
                onClose();
              }}
              className="flex-1 p-4 "
              style={{ opacity: error.length > 0 || !local.date || !local.from || !local.to ? 0.4 : 1 }}
            >
              <NText className="text-center text-base font-bold text-blue-600">Confirm</NText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
