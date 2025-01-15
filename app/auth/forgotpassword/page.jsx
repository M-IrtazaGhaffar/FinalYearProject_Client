import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        <h2 className="text-2xl text-center font-bold">Forget Your Password</h2>
        <div className="w-full">
          <label htmlFor="email" className="text-xs">
            Your Email
          </label>
          <Input type="email" id="email" name="email" placeholder="Email" />
        </div>
        <Button className="w-full hover:bg-white hover:text-black shadow-2xl border-[1px]">
          Forget Password
        </Button>
      </form>
    </main>
  );
}

export default page;
