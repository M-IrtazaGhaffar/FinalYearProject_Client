"use client";

import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
import Logo1 from "@/assets/1.png";
import Image from "next/image";

function NewPasswordPage() {
  const params = useParams();
  const token = params?.token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

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
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleReset}
        className="bg-white p-6 rounded-md shadow-lg w-full max-w-md"
      >
        <div className="flex justify-center w-full">
          <Image
            src={Logo1}
            alt="Logo"
            width={250}
            height={250}
            className="p-2 w-[20%]"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">Set New Password</h1>
        <Input
          type="password"
          placeholder="New Password"
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          className="mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      </form>
    </main>
  );
}

export default NewPasswordPage;
