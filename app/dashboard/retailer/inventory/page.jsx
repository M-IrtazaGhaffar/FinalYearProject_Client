"use client";

import { useEffect, useState } from "react";
import { retailerApi } from "@/app/axiosInstance";
import { useSession } from "next-auth/react";

import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppBreadcrumb } from "@/components/app-breadcrumb";

export default function InventoryPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRetailerProducts = async () => {
    setLoading(true);
    try {
      const response = await retailerApi.post("/product/all", {
        retailer_id: parseInt(session?.user?.id),
      });
      if (response.data?.success) {
        setProducts(response.data.data || []);
      } else {
        toast.error(response.data?.message || "Failed to load inventory");
      }
    } catch (err) {
      console.error("Error fetching inventory:", err);
      toast.error("Server error while fetching inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchRetailerProducts();
    }
  }, [session?.user?.id]);

  return (
    <div className="py-5 space-y-5">
      <h2 className="text-2xl font-bold">Retailer Inventory</h2>
      <AppBreadcrumb />

      {loading ? (
        <p className="text-gray-500">Loading inventory...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Formula</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Wholesale Price</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.product?.name}</TableCell>
                  <TableCell>{product.product?.formula}</TableCell>
                  <TableCell>{product.product?.organization?.name}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.wholesaleprice}</TableCell>
                  <TableCell>{product.price}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
