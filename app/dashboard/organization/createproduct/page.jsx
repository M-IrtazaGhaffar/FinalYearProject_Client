"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { organizationApi } from "@/app/axiosInstance";
import { toast } from "sonner";

export default function CreateProductPage() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    detail: "",
    consumption: "",
    sideeffects: "",
    other: "",
    formula: "",
    organization_id: "",
  });

  useEffect(() => {
    if (session?.user?.id) {
      setFormData((prev) => ({
        ...prev,
        organization_id: session.user.id,
      }));
    }
  }, [session]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await organizationApi.post("/product/create", formData);
      if (response.data?.success) {
        toast.success("Product Created Successfully!");
        setFormData({
          name: "",
          description: "",
          detail: "",
          consumption: "",
          sideeffects: "",
          other: "",
          formula: "",
          organization_id: session?.user?.id || "",
        });
      } else {
        const msg = response.data?.message || "Failed to create product.";
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      console.error("Product creation error:", err);
      const msg = err?.response?.data?.message || "Server error.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 space-y-5">
      <h2 className="text-2xl font-bold">Create a Product</h2>

      <div className="space-y-4">
        {[
          { label: "Name", name: "name" },
          { label: "Description", name: "description" },
          { label: "Detail", name: "detail" },
          { label: "Consumption", name: "consumption" },
          { label: "Side Effects", name: "sideeffects" },
          { label: "Other Info", name: "other" },
          { label: "Formula", name: "formula" },
        ].map(({ label, name }) => (
          <div key={name}>
            <Label htmlFor={name}>{label}</Label>
            <Textarea
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="min-h-[80px]"
            />
          </div>
        ))}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </div>
  );
}
