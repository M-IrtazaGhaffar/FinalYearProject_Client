import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <main className="min-h-screen flex flex-col gap-10 items-center justify-center p-4">
        <h1 className="text-4xl font-bold">
          Welcome to the Advanced POS Dashboard App!
        </h1>
        <div className="flex gap-10">
          <Link href="/auth/retailer">
            <Button variant="outline" className="mb-4">
              Goto Retailer
            </Button>
          </Link>
          <Link href="/auth/organization">
            <Button variant="outline" className="mb-4">
              Goto Organization
            </Button>
          </Link>
        </div>
    </main>
  );
}

export default page;
