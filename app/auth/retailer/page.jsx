import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import Logo1 from "@/assets/1.png";
import Image from "next/image";

function page() {
  return (
    <main className="p-5 lg:p-10 flex justify-center items-center min-h-[100vh] min-w-[100vw]">
      <form
        action=""
        className="border-[1px] rounded shadow-2xl p-10 w-[50vw] flex flex-col gap-3 justify-center items-center"
      >
        <Image
          src={Logo1}
          alt="image"
          width={250}
          height={250}
          className="p-2 w-[20%]"
        />
        <h2 className="text-2xl text-center font-bold">
          Authentication for Retailer
        </h2>
        <div className="w-full">
          <label htmlFor="email" className="text-xs">
            Your Email
          </label>
          <Input name="email" id="email" type="email" placeholder="Email" />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="text-xs">
            Your Password
          </label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <Link href="/auth/forgotpassword" className="underline text-xs self-start">
          Forgot Your Password?
        </Link>
        <Button className="w-full hover:bg-white hover:text-black shadow-2xl border-[1px]">
          Login Retailer
        </Button>
      </form>
    </main>
  );
}

export default page;
