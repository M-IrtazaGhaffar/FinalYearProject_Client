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
    <main className="p-5 lg:p-10 flex justify-center items-center min-h-[100vh] min-w-[100vw]">
      <form
        action={formAction}
        className="border-[1px] rounded shadow-2xl p-10 w-[50vw] flex flex-col gap-3 justify-center items-center"
      >
        <Image
          src={Logo1}
          alt="Logo"
          width={250}
          height={250}
          className="p-2 w-[20%]"
        />
        <h2 className="text-2xl text-center font-bold">Forget Your Password</h2>
        <div className="w-full">
          <label htmlFor="email" className="text-xs">
            Your Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <Button
          className="w-full hover:bg-white hover:text-black shadow-2xl border-[1px]"
          disabled={isPending}
        >
          {
            isPending ? 'Sending Email' : 'Forget Password'
          }
        </Button>
      </form>
    </main>
  );
}

export default Page;
