"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { organizationApi } from "@/app/axiosInstance";
import { toast } from "sonner";

export default function CreateBlogPage() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
    organization_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await organizationApi.post("/blog/create", {
        ...formData,
        organization_id: session?.user?.id || "",
      });
      if (res.data?.success) {
        toast("Blog created successfully!");
        setFormData({
          title: "",
          description: "",
          details: "",
          organization_id: session?.user?.id || "",
        });
      } else {
        const msg = res.data?.message || "Failed to create blog.";
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      console.error("Blog creation error:", err);
      const msg = err?.response?.data?.message || "Server error.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 space-y-5">
      <h2 className="text-2xl font-bold">Create a Blog</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short blog description"
          />
        </div>

        <div>
          <Label htmlFor="details">Details</Label>
          <Textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Full blog content"
            className="min-h-[150px]"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create Blog"}
        </Button>
      </div>
    </div>
  );
}
