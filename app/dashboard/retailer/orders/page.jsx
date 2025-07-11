"use client";

import { useState } from "react";
import { retailerApi } from "@/app/axiosInstance";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppBreadcrumb } from "@/components/app-breadcrumb";
import axios from "axios";

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [singleOrders, setSingleOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    if (!session?.user?.id) return toast.error("Session not loaded");

    setLoading(true);
    try {
      const response = await retailerApi.post("/order/get", {
        retailer_id: parseInt(session.user.id),
      });

      if (response.data?.success) {
        setOrders(response.data.data || []);
        toast.success("Orders loaded");
      } else {
        toast.error(response.data?.message || "Failed to load orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderById = async () => {
    if (!orderId) return toast.error("Please enter an Order ID");

    setLoading(true);
    try {
      const response = await axios.post(
        "https://advancedpos.duckdns.org/api/order/getbyid",
        {
          id: parseInt(orderId),
        }
      );

      console.log(response.data.data);
      

      if (response.data?.success) {
        setSingleOrders(response.data.data || []);
        toast.success("Order loaded");
      } else {
        toast.error(response.data?.message || "Failed to load order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching order");
    } finally {
      setLoading(false);
    }
  };

  const renderOrderTable = (ordersList) => (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">Order ID</th>
            <th className="border px-3 py-2">Customer</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Amount</th>
            <th className="border px-3 py-2">Products & Details</th>
          </tr>
        </thead>
        <tbody>
          {ordersList.map((order) => (
            <tr key={order.id}>
              <td className="border px-3 py-2">{order.id}</td>
              <td className="border px-3 py-2">{order.name}</td>
              <td className="border px-3 py-2">{order.email}</td>
              <td className="border px-3 py-2">{order.amount}</td>
              <td className="border px-3 py-2">
                {(order.OrderedItems || []).length > 0 ? (
                  <ul className="space-y-2">
                    {order.OrderedItems.map((item) => (
                      <li key={`${order.id}-${item.product_id}`}>
                        <div>
                          <b>Product:</b> {item.product?.name || "-"}
                        </div>
                        <div>
                          <b>Description:</b> {item.product?.description || "-"}
                        </div>
                        <div>
                          <b>Quantity:</b> {item.quantity}
                        </div>
                        <div>
                          <b>Price:</b> {item.price}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>No products</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="py-5 space-y-6">
      <h2 className="text-2xl font-bold">Orders</h2>
      <AppBreadcrumb />

      <div className="flex gap-4">
        <Button onClick={fetchAllOrders} disabled={loading}>
          {loading ? "Loading..." : "Get All Orders"}
        </Button>
      </div>

      {orders.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg pt-4">All Orders</h3>
          {renderOrderTable(orders)}
        </div>
      )}

      <div className="pt-6 space-y-4">
        <Label>Search Order By ID</Label>
        <Input
          placeholder="e.g. 1"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Button onClick={fetchOrderById} disabled={loading}>
          {loading ? "Searching..." : "Get Order by ID"}
        </Button>
      </div>

      {singleOrders.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg pt-4">Order Details</h3>
          {renderOrderTable(singleOrders)}
        </div>
      )}
    </div>
  );
}
