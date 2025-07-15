"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import Logo1 from "@/assets/1.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

function Page() {
  const handleLogin = async (prevState, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch(
        "https://advancedpos.duckdns.org/api/retailer/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid email or password");
        return;
      }

      toast.success(data.message);

      await signIn("credentials", {
        redirect: true,
        redirectTo: "/dashboard/retailer",
        id: data?.data?.id,
        email: data?.data?.email,
        name: data?.data?.username,
        owner: data?.data?.owner,
        type: data?.data?.type,
        token: data?.data?.token,
      });
    } catch (error) {
      console.error(error);
      toast.error("Network error, please try again.");
    }
  };

  const [state, formAction, isPending] = useActionState(handleLogin, undefined);

  return (
    <main className="p-4 sm:p-6 lg:p-10 flex justify-center items-center min-h-screen bg-gray-50">
      <form
        action={formAction}
        className="border rounded shadow-2xl p-6 sm:p-8 w-full max-w-md flex flex-col gap-4 bg-white"
      >
        <div className="flex justify-center">
          <Image
            src={Logo1}
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        <h2 className="text-xl sm:text-2xl text-center font-bold mb-2">
          Authentication for Retailer
        </h2>

        <div className="w-full">
          <label htmlFor="email" className="text-sm block mb-1">
            Your Email
          </label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            required
            disabled={isPending}
          />
        </div>

        <div className="w-full">
          <label htmlFor="password" className="text-sm block mb-1">
            Your Password
          </label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            required
            disabled={isPending}
          />
        </div>

        <Link
          href="/auth/forgotpassword"
          className="underline text-xs self-start text-blue-600 hover:text-blue-800"
        >
          Forgot Your Password?
        </Link>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full hover:bg-white hover:text-black shadow-md border flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <span className="loader animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
              Authenticating...
            </>
          ) : (
            "Login Retailer"
          )}
        </Button>
      </form>
    </main>
  );
}

export default Page;
