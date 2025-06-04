"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { organizationApi } from "@/app/axiosInstance";
import axios from "axios";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    formula: "",
    description: "",
    detail: "",
    consumption: "",
    sideeffects: "",
    other: "",
  });

  // Search state
  const [search, setSearch] = useState("");

  // Fetch products for organization_id 1
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://advancedpos.duckdns.org/api/product/getbyorganizationid",
        { organization_id: 1 }
      );
      setProducts(res.data.data || []);
    } catch (error) {
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open modal and set product data
  const handleEditClick = (product) => {
    setEditProduct(product);
    setEditData({
      name: product.name || "",
      formula: product.formula || "",
      description: product.description || "",
      detail: product.detail || "",
      consumption: product.consumption || "",
      sideeffects: product.sideeffects || "",
      other: product.other || "",
    });
    setOpen(true);
  };

  // Save changes
  const handleSave = async () => {
    if (!editProduct) return;
    try {
      await organizationApi.post("/product/update", {
        id: editProduct.id,
        ...editData,
      });
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? { ...p, ...editData } : p))
      );
      setOpen(false);
      setEditProduct(null);
      alert("Product updated successfully!");
    } catch (error) {
      alert("Failed to update product");
    }
  };

  // Filter products by search
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5">
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Organization Products</h1>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
          <Button onClick={fetchProducts} variant="outline" disabled={loading}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
          </Button>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Formula</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.formula}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEditClick(product)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                    >
                      <a
                        href={`https://final-year-project-web-app.vercel.app/products/${product.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View Product"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                        </svg>
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Edit Product Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-2">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                name="name"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Formula</label>
              <Input
                name="formula"
                value={editData.formula}
                onChange={(e) =>
                  setEditData({ ...editData, formula: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <Input
                name="description"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Detail</label>
              <Input
                name="detail"
                value={editData.detail}
                onChange={(e) =>
                  setEditData({ ...editData, detail: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Consumption
              </label>
              <Input
                name="consumption"
                value={editData.consumption}
                onChange={(e) =>
                  setEditData({ ...editData, consumption: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Side Effects
              </label>
              <Input
                name="sideeffects"
                value={editData.sideeffects}
                onChange={(e) =>
                  setEditData({ ...editData, sideeffects: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Other</label>
              <Input
                name="other"
                value={editData.other}
                onChange={(e) =>
                  setEditData({ ...editData, other: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>Save</Button>
            <DialogClose asChild>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductsPage;
