"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import Logo1 from "@/assets/1.png";
import Image from "next/image";
import axios from "axios";
import { signIn } from "next-auth/react";

function Page() {
  const [Data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://advancedpos.duckdns.org/api/organization/login",
        Data
      );

      await signIn("credentials", {
        redirect: true,
        redirectTo: "/dashboard/organization",
        id: res?.data?.data?.id,
        email: res?.data?.data?.email,
        name: res?.data?.data?.username,
        owner: res?.data?.data?.owner,
        type: res?.data?.data?.type,
        token: res?.data?.data?.token,
      });
    } catch (error) {
      alert("Invalid email or password");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-5 lg:p-10 flex justify-center items-center min-h-[100vh] min-w-[100vw]">
      <form
        onSubmit={handleSubmit}
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
          Authentication for Organization
        </h2>
        <div className="w-full">
          <label htmlFor="email" className="text-xs">
            Your Email
          </label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setData({ ...Data, email: e.target.value })}
            disabled={loading}
          />
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
            required
            onChange={(e) => setData({ ...Data, password: e.target.value })}
            disabled={loading}
          />
        </div>
        <Link
          href="/auth/forgotpassword"
          className="underline text-xs self-start"
        >
          Forgot Your Password?
        </Link>
        <Button
          type="submit"
          disabled={loading}
          className="w-full hover:bg-white hover:text-black shadow-2xl border-[1px] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="loader mr-2 animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
              Authenticating...
            </>
          ) : (
            "Login Organization"
          )}
        </Button>
      </form>
    </main>
  );
}

export default Page;
