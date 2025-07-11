"use client";

import { useState } from "react";
import { retailerApi } from "@/app/axiosInstance";
import { useSession } from "next-auth/react";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppBreadcrumb } from "@/components/app-breadcrumb";

export default function CreateSalePage() {
  const { data: session } = useSession();

  const [products, setProducts] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "" });
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [saleItems, setSaleItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  const fetchProducts = async () => {
    if (!session?.user?.id) return toast.error("Session not loaded");

    setProductLoading(true);
    try {
      const response = await retailerApi.post("/product/all", {
        retailer_id: parseInt(session.user.id),
      });
      if (response.data?.success) {
        setProducts(response.data.data || []);
        toast.success("Products loaded successfully");
      } else {
        toast.error(response.data?.message || "Failed to load products");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching products");
    } finally {
      setProductLoading(false);
    }
  };

  const addItemToSale = () => {
    if (!selectedProductId || !quantity) {
      toast.error("Please select product and quantity");
      return;
    }

    setSaleItems([
      ...saleItems,
      {
        retailerproduct_id: selectedProductId,
        quantity,
      },
    ]);

    setSelectedProductId("");
    setQuantity("");
  };

  const removeItem = (index) => {
    const updatedItems = [...saleItems];
    updatedItems.splice(index, 1);
    setSaleItems(updatedItems);
  };

  const handleSubmitSale = async () => {
    if (!customerInfo.name || !customerInfo.email || saleItems.length === 0) {
      toast.error("Please fill customer details and add products");
      return;
    }

    setLoading(true);
    try {
      const response = await retailerApi.post("/order/create", {
        name: customerInfo.name,
        email: customerInfo.email,
        retailer_id: parseInt(session?.user?.id),
        items: saleItems,
      });

      if (response.data?.success) {
        toast.success("Sale created successfully");
        setCustomerInfo({ name: "", email: "" });
        setSaleItems([]);
      } else {
        toast.error(response.data?.message || "Failed to create sale");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 space-y-6">
      <h2 className="text-2xl font-bold">Create Sale</h2>
      <AppBreadcrumb />

      <Button onClick={fetchProducts} disabled={productLoading}>
        {productLoading ? "Loading Products..." : "Load Products"}
      </Button>

      {/* Customer Info */}
      <div className="space-y-4">
        <div>
          <Label>Customer Name</Label>
          <Input
            placeholder="e.g. Ali"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
          />
        </div>
        <div>
          <Label>Customer Email</Label>
          <Input
            placeholder="e.g. ali@example.com"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
          />
        </div>
      </div>

      {/* Add Product */}
      <div className="space-y-4">
        <Label>Select Product</Label>
        <Select value={selectedProductId} onValueChange={setSelectedProductId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id.toString()}>
                {product.product?.name} - Stock: {product.stock} - Price: {product.price}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-4">
          <div className="flex-1">
            <Label>Quantity</Label>
            <Input
              placeholder="e.g. 2"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        <Button type="button" onClick={addItemToSale}>
          Add Item
        </Button>

        {saleItems.length > 0 && (
          <div className="overflow-x-auto mt-4">
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2">Product</th>
                  <th className="border px-3 py-2">Quantity</th>
                  <th className="border px-3 py-2">Price</th>
                  <th className="border px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {saleItems.map((item, index) => {
                  const product = products.find((p) => p.id.toString() === item.retailerproduct_id);
                  return (
                    <tr key={index}>
                      <td className="border px-3 py-2">{product?.product?.name}</td>
                      <td className="border px-3 py-2">{item.quantity}</td>
                      <td className="border px-3 py-2">{product?.price}</td>
                      <td className="border px-3 py-2">
                        <Button variant="outline" size="sm" onClick={() => removeItem(index)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Button onClick={handleSubmitSale} disabled={loading}>
        {loading ? "Creating Sale..." : "Create Sale"}
      </Button>
    </div>
  );
}
