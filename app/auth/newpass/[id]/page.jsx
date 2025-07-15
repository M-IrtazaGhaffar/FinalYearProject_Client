"use client";

import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useActionState } from "react";
import { toast } from "sonner";
import Logo1 from "@/assets/1.png";
import Image from "next/image";

function NewPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.id;

  const handleReset = async (prevState, formData) => {
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("https://advancedpos.duckdns.org/api/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Reset failed");
      } else {
        toast.success(data.message || "Password reset successfully!");
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  const [state, formAction, isPending] = useActionState(handleReset, undefined);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        action={formAction}
        className="bg-white p-6 sm:p-8 rounded-md shadow-lg w-full max-w-md"
      >
        <div className="flex justify-center mb-4">
          <Image
            src={Logo1}
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">Set New Password</h1>

        <div className="mb-4">
          <Input
            type="password"
            name="password"
            placeholder="New Password"
            required
          />
        </div>

        <div className="mb-6">
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </main>
  );
}

export default NewPasswordPage;
