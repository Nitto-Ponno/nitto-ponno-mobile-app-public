import TitleHeader from "@/components/common/TitleHeader";
import { showToast } from "@/utils/commonFunction";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";

// -----------------------------
// Types
// -----------------------------
type ApiStatus = {
  code: number;
  message: string;
  date?: string;
};

type DivisionsResponse = {
  status: ApiStatus;
  data: Array<{
    division: string;
    divisionbn: string;
    coordinates: string;
  }>;
};

type DivisionDetailsResponse = {
  status: ApiStatus;
  data: Array<{
    district: string;
    coordinates: string;
    upazilla: string[];
  }>;
};

type UseAddressType = "Home" | "Office" | "Other";

type AddressForm = {
  firstName: string;
  lastName: string;
  phone: string;
  streetAddress: string;

  division: string; // e.g. "Dhaka"
  district: string; // e.g. "Dhaka"
  area: string; // upazilla name

  useAs: UseAddressType | "";
};

// -----------------------------
// API helpers
// -----------------------------
const BASE_URL = "https://bdapis.com/api/v1.2";

async function safeFetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}

async function fetchDivisions() {
  return safeFetchJson<DivisionsResponse>(`${BASE_URL}/divisions`);
}

async function fetchDivisionDetails(divisionName: string) {
  // API examples show: /division/rangpur (lowercase)
  return safeFetchJson<DivisionDetailsResponse>(`${BASE_URL}/division/${encodeURIComponent(divisionName.toLowerCase())}`);
}

// -----------------------------
// Small UI Select (inline dropdown)
// -----------------------------
type SelectOption = { label: string; value: string };

function Select({
  label,
  placeholder,
  value,
  options,
  disabled,
  loading,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: SelectOption[];
  disabled?: boolean;
  loading?: boolean;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (disabled || options.length === 0) setOpen(false);
  }, [disabled, options.length]);

  return (
    <View className="w-full">
      <Text className="text-base font-semibold text-slate-900 mb-2">
        {label} <Text className="text-red-600">*</Text>
      </Text>

      <Pressable
        disabled={disabled}
        onPress={() => setOpen((p) => !p)}
        className={["border border-slate-200 rounded-2xl px-4 py-4 bg-white", disabled ? "opacity-50" : "opacity-100"].join(" ")}
      >
        <View className="flex-row items-center justify-between">
          <Text className={value ? "text-slate-900" : "text-slate-400"}>{value ? value : placeholder}</Text>

          {loading ? <ActivityIndicator /> : <Text className="text-slate-400 text-xl">▾</Text>}
        </View>
      </Pressable>

      {open && !disabled && (
        <View className="mt-2 border border-slate-200 rounded-2xl bg-white overflow-hidden">
          <ScrollView style={{ maxHeight: 220 }}>
            {options.length === 0 ? (
              <Text className="p-4 text-slate-500">No options</Text>
            ) : (
              options.map((opt) => (
                <Pressable
                  key={opt.value}
                  onPress={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className="px-4 py-4 border-b border-slate-100"
                >
                  <Text className="text-slate-900">{opt.label}</Text>
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

// -----------------------------
// Screen
// -----------------------------
export default function AddressAddScreen() {
  const [form, setForm] = useState<AddressForm>({
    firstName: "",
    lastName: "",
    phone: "",
    streetAddress: "",
    division: "",
    district: "",
    area: "",
    useAs: "",
  });

  const [loadingDivisions, setLoadingDivisions] = useState(false);
  const [loadingDivisionDetails, setLoadingDivisionDetails] = useState(false);

  const [divisions, setDivisions] = useState<SelectOption[]>([]);
  const [districts, setDistricts] = useState<SelectOption[]>([]);
  const [areas, setAreas] = useState<SelectOption[]>([]);

  // ✅ This holds full division response, including upazilla per district
  const [divisionDetails, setDivisionDetails] = useState<DivisionDetailsResponse["data"]>([]);

  const useAsOptions: SelectOption[] = useMemo(
    () => [
      { label: "Home", value: "Home" },
      { label: "Office", value: "Office" },
      { label: "Other", value: "Other" },
    ],
    []
  );

  function setField<K extends keyof AddressForm>(key: K, value: AddressForm[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  // -----------------------------
  // Load divisions on mount
  // -----------------------------
  useEffect(() => {
    (async () => {
      try {
        setLoadingDivisions(true);
        const res = await fetchDivisions();

        setDivisions(
          res.data.map((d) => ({
            label: d.division,
            value: d.division,
          }))
        );
      } catch (e: any) {
        Alert.alert("Error", e?.message ?? "Failed to load divisions");
      } finally {
        setLoadingDivisions(false);
      }
    })();
  }, []);

  // -----------------------------
  // Division change => load districts + store divisionDetails
  // -----------------------------
  useEffect(() => {
    if (!form.division) {
      setDistricts([]);
      setAreas([]);
      setDivisionDetails([]);
      return;
    }

    (async () => {
      try {
        setLoadingDivisionDetails(true);

        const res = await fetchDivisionDetails(form.division);

        // store full response for later
        setDivisionDetails(res.data);

        // district list
        const districtNames = res.data.map((x) => x.district);
        setDistricts(
          districtNames.map((d) => ({
            label: d,
            value: d,
          }))
        );

        // Reset dependent fields when division changes
        setForm((p) => ({ ...p, district: "", area: "" }));
        setAreas([]);
      } catch (e: any) {
        Alert.alert("Error", e?.message ?? "Failed to load division details");
      } finally {
        setLoadingDivisionDetails(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.division]);

  // -----------------------------
  // District change => set Areas from divisionDetails (NO API CALL)
  // -----------------------------
  useEffect(() => {
    if (!form.district) {
      setAreas([]);
      return;
    }

    const matched = divisionDetails.find((d) => d.district === form.district);
    const upazillas = matched?.upazilla ?? [];

    setAreas(
      upazillas.map((u) => ({
        label: u,
        value: u,
      }))
    );

    // reset area when district changes
    setForm((p) => ({ ...p, area: "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.district, divisionDetails]);

  // -----------------------------
  // Validation
  // -----------------------------
  function validate(): string | null {
    if (!form.firstName.trim()) return "First Name is required";
    if (!form.lastName.trim()) return "Last Name is required";
    if (!form.phone.trim()) return "Contact Number is required";
    if (!form.streetAddress.trim()) return "Address is required";
    if (!form.division) return "Division is required";
    if (!form.district) return "City/District is required";
    if (!form.area) return "Area/Upazila is required";
    if (!form.useAs) return "Use Address is required";
    return null;
  }

  // -----------------------------
  // Actions
  // -----------------------------
  function onSave() {
    const err = validate();
    if (err) {
      Alert.alert("Validation Error", err);
      return;
    }

    // ✅ Replace this with: API call / Redux / AsyncStorage etc.
    showToast({ message: "Coming soon..." });
    Alert.alert("Saved!", JSON.stringify(form, null, 2));
  }

  function onCancel() {
    Alert.alert("Cancelled", "Address entry cancelled.");
  }

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <View className="flex-1 bg-slate-50">
      <TitleHeader title="My Address" />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="px-5">
        {/* Row 1 */}
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Text className="text-base font-semibold text-slate-900 mb-2">
              First Name <Text className="text-red-600">*</Text>
            </Text>
            <TextInput
              value={form.firstName}
              onChangeText={(t) => setField("firstName", t)}
              placeholder="Enter your first name"
              className="border border-slate-200 rounded-2xl px-4 py-4 bg-white"
            />
          </View>

          <View className="flex-1">
            <Text className="text-base font-semibold text-slate-900 mb-2">
              Last Name <Text className="text-red-600">*</Text>
            </Text>
            <TextInput
              value={form.lastName}
              onChangeText={(t) => setField("lastName", t)}
              placeholder="Enter your last name"
              className="border border-slate-200 rounded-2xl px-4 py-4 bg-white"
            />
          </View>
        </View>

        <View className="flex-row gap-4 mt-5">
          <View className="flex-1">
            <Text className="text-base font-semibold text-slate-900 mb-2">
              Contact Number <Text className="text-red-600">*</Text>
            </Text>
            <TextInput
              value={form.phone}
              onChangeText={(t) => setField("phone", t)}
              placeholder="Enter your number"
              keyboardType="phone-pad"
              className="border border-slate-200 rounded-2xl px-4 py-4 bg-white"
            />
          </View>

          <View className="flex-1">
            <Text className="text-base font-semibold text-slate-900 mb-2">
              Address <Text className="text-red-600">*</Text>
            </Text>
            <TextInput
              value={form.streetAddress}
              onChangeText={(t) => setField("streetAddress", t)}
              placeholder="Enter H. no, R. no, block/sector"
              className="border border-slate-200 rounded-2xl px-4 py-4 bg-white"
            />
          </View>
        </View>
        {/* Row 3 */}
        <View className="flex-row gap-4 mt-5">
          <View className="flex-1">
            <Select
              label="Division"
              placeholder={loadingDivisions ? "Loading..." : "Select division"}
              value={form.division}
              options={divisions}
              loading={loadingDivisions}
              onChange={(v) => setField("division", v)}
            />
          </View>

          <View className="flex-1">
            <Select
              label="City"
              placeholder={form.division ? (loadingDivisionDetails ? "Loading..." : "Select district") : "Select division first"}
              value={form.district}
              options={districts}
              disabled={!form.division}
              loading={loadingDivisionDetails}
              onChange={(v) => setField("district", v)}
            />
          </View>
        </View>
        {/* Row 4 */}
        <View className="flex-row gap-4 mt-5">
          <View className="flex-1">
            <Select
              label="Area"
              placeholder={form.district ? "Select area (upazila)" : "Select district first"}
              value={form.area}
              options={areas}
              disabled={!form.district}
              onChange={(v) => setField("area", v)}
            />
          </View>

          <View className="flex-1">
            <Select
              label="Use Address"
              placeholder="Select use as my Address"
              value={form.useAs}
              options={useAsOptions}
              onChange={(v) => setField("useAs", v as UseAddressType)}
            />
          </View>
        </View>
        {/* Buttons */}
        <View className="flex-row gap-4 mt-8">
          <Pressable onPress={onSave} className="flex-1 bg-[#0B2E59] rounded-2xl py-5 items-center justify-center">
            <Text className="text-white font-bold text-lg">Save Address</Text>
          </Pressable>

          <Pressable onPress={onCancel} className="flex-1 border border-[#0B2E59] rounded-2xl py-5 items-center justify-center bg-white">
            <Text className="text-[#0B2E59] font-bold text-lg">Cancel</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
