"use client";

import { useState } from "react";
import { retailerApi } from "@/app/axiosInstance";
import { useSession } from "next-auth/react";

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

import { toast } from "sonner";
import { AppBreadcrumb } from "@/components/app-breadcrumb";

export default function UpdateInventoryPage() {
  const { data: session } = useSession();

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: "", // RetailerProduct ID
    stock: "",
    wholesaleprice: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  const fetchRetailerProducts = async () => {
    if (!session?.user?.id) {
      toast.error("Please login first.");
      return;
    }

    setProductLoading(true);
    try {
      const response = await retailerApi.post("/product/all", {
        retailer_id: parseInt(session.user.id),
      });

      if (response.data?.success) {
        setProducts(response.data.data || []);
      } else {
        toast.error(response.data?.message || "Failed to load products.");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Error fetching products.");
    } finally {
      setProductLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.id) {
      toast.error("Please select a product to update.");
      return;
    }

    setLoading(true);
    try {
      const response = await retailerApi.post("/product/update", {
        ...formData,
      });

      if (response.data?.success) {
        toast.success("Retailer product updated successfully!");
        setFormData({
          id: "",
          stock: "",
          wholesaleprice: "",
          price: "",
        });
      } else {
        toast.error(response.data?.message || "Failed to update product.");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err?.response?.data?.message || "Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 space-y-5">
      <h2 className="text-2xl font-bold">Update Inventory</h2>
      <AppBreadcrumb />

      <Button onClick={fetchRetailerProducts} disabled={productLoading}>
        {productLoading ? "Loading..." : "Load My Products"}
      </Button>

      <div className="space-y-4">
        {/* Select Retailer Product */}
        <div>
          <Label>Select Retailer Product</Label>
          <Select
            value={formData.id}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                id: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a product to update" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id.toString()}>
                  {product.product?.name} ({product.product?.formula}) - Stock: {product.stock} - Price: {product.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stock */}
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="e.g. 150"
          />
        </div>

        {/* Wholesale Price */}
        <div>
          <Label htmlFor="wholesaleprice">Wholesale Price</Label>
          <Input
            id="wholesaleprice"
            name="wholesaleprice"
            value={formData.wholesaleprice}
            onChange={handleChange}
            placeholder="e.g. 50"
          />
        </div>

        {/* Price */}
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 80"
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Updating..." : "Update Inventory"}
        </Button>
      </div>
    </div>
  );
}
