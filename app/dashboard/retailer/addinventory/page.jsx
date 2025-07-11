"use client";

import { useEffect, useState } from "react";
import { retailerApi } from "@/app/axiosInstance";
import { useSession } from "next-auth/react";
import axios from "axios";

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

export default function AddInventoryPage() {
  const { data: session } = useSession();

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    stock: "",
    wholesaleprice: "",
    price: "",
    product_id: "",
  });
  const [loading, setLoading] = useState(false); // For form submission
  const [productLoading, setProductLoading] = useState(false); // For product fetch
  const [error, setError] = useState("");

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      setProductLoading(true);
      try {
        const response = await axios.post(
          "https://advancedpos.duckdns.org/api/product/get"
        );
        if (response.data?.success) {
          setProducts(response.data.data || []);
        } else {
          console.error(response.data?.message || "Failed to load products");
          toast.error(response.data?.message || "Failed to load products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        toast.error("Error fetching products");
      } finally {
        setProductLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await retailerApi.post("/product/add", {
        ...formData,
        retailer_id: session?.user?.id,
      });

      if (response.data?.success) {
        toast.success("Inventory added successfully!");
        setFormData({
          stock: "",
          wholesaleprice: "",
          price: "",
          product_id: "",
        });
      } else {
        const msg = response.data?.message || "Failed to add inventory.";
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      console.error("Add inventory error:", err);
      const msg = err?.response?.data?.message || "Server error.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 space-y-5">
      <h2 className="text-2xl font-bold">Add Inventory</h2>
      <AppBreadcrumb />

      <div className="space-y-4">
        {/* Select Product */}
        <div>
          <Label>Select Product</Label>

          {productLoading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : (
            <Select
              value={formData.product_id}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  product_id: value,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name} ({product.formula}) -{" "}
                    {product.organization.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Stock */}
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="e.g. 100"
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
            placeholder="e.g. 7"
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
            placeholder="e.g. 10"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Inventory"}
        </Button>
      </div>
    </div>
  );
}
