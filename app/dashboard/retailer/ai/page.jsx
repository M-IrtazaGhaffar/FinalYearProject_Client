import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function page() {
  const Data = [
    {
      type: "me",
      msg: "Hey there!",
    },
    {
      type: "ai",
      msg: "How may I help you, sir!",
    },
    {
      type: "me",
      msg: "Tell me about Panadol.",
    },
    {
      type: "ai",
      msg: "Panadol is a widely known brand name for paracetamol (also known as acetaminophen in some countries), which is an over-the-counter medication commonly used for pain relief and fever reduction. Manufactured by GlaxoSmithKline, Panadol is available in various formulations, including tablets, caplets, syrups, and even forms designed specifically for children.",
    }
  ];

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">AI Assistance</h2>
      <AppBreadcrumb />
      <div className="flex flex-col justify-end w-full gap-2 p-5 bg-slate-50 shadow rounded-lg h-[70vh] overflow-y-scroll">
        {Data.map((message, index) => (
          <div
            key={index}
            className={`w-fit py-2 px-4 flex flex-col ${
              message.type === "me"
                ? "bg-slate-800 text-white self-end items-end rounded-l-3xl rounded-t-3xl"
                : "bg-slate-200 text-black self-start rounded-r-3xl rounded-t-3xl"
            }`}
          >
            <span className="text-xs">{message.type === "me" ? "Me" : "AI"}</span>
            <span>{message.msg}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input type="text" placeholder="Your Query" />
        <Button className="text-white">Ask</Button>
      </div>
    </div>
  );
}

export default page;
