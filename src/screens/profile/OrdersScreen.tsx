import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { OrderApi } from "@/services/api/orderApi";
import { handleErrorResponse } from "@/utils/handlers";
import { Pagination } from "@/services/types/genericTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import NText from "@/components/global/NText";

const OrdersScreen = () => {
  const [orders, setOrders] = useState<any | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNextPage: true,
    hasPrevPage: false,
    page: 0,
  });

  const getAllOrders = async () => {
    try {
      const response = await OrderApi.getAllOrders();
      console.log("response", JSON.stringify(response, null, 2));
      setOrders(response.data);
      response.meta && setPagination(response?.meta);
    } catch (err: any) {
      handleErrorResponse(err, "Get All Orders");
      console.log("err.response.data.message", JSON.stringify(err.response.data, null, 2));
    }
  };
  useEffect(() => {
    getAllOrders();

    return () => {};
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <NText>OrdersScreen</NText>
    </SafeAreaView>
  );
};

export default OrdersScreen;
