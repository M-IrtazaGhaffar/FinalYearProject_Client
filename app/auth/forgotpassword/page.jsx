"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useActionState } from "react";
import Logo1 from "@/assets/1.png";
import Image from "next/image";
import { toast } from "sonner";

function Page() {
  const handleForm = async (prevState, formData) => {
    const email = formData.get("email");

    try {
      const res = await fetch(
        "https://advancedpos.duckdns.org/api/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
      } else {
        toast.success(data.message || "Reset link sent successfully!");
      }
      return;
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again.");
      return;
    }
  };

  const [data, formAction, isPending] = useActionState(handleForm, undefined);

  return (
    <main className="p-4 sm:p-6 lg:p-10 flex justify-center items-center min-h-screen">
      <form
        action={formAction}
        className="w-full max-w-md sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[30%] border rounded shadow-2xl p-6 sm:p-8 flex flex-col gap-4 bg-white"
      >
        <div className="flex justify-center">
          <Image
            src={Logo1}
            alt="Logo"
            width={120}
            height={120}
            className="w-24 sm:w-28 object-contain"
          />
        </div>

        <h2 className="text-xl sm:text-2xl text-center font-bold">Forget Your Password</h2>

        <div className="w-full">
          <label htmlFor="email" className="text-sm block mb-1">
            Your Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <Button
          className="w-full hover:bg-white hover:text-black shadow-md border"
          disabled={isPending}
        >
          {isPending ? "Sending Email..." : "Forget Password"}
        </Button>
      </form>
    </main>
  );
}

export default Page;
