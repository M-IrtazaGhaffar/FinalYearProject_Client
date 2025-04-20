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
    },
    {
      type: "me",
      msg: "What is Paracetamol used for?",
    },
    {
      type: "ai",
      msg: "Used to treat fever and mild pain.",
    },
    {
      type: "me",
      msg: "How much Ibuprofen should I take?",
    },
    {
      type: "ai",
      msg: "200-400mg every 4-6 hours.",
    },
    {
      type: "me",
      msg: "What is the recommended dose of Amoxicillin?.",
    },
    {
      type: "ai",
      msg: "500mg every 8 hours.",
    },
    {
      type: "me",
      msg: "What medicine is used for diabetes?",
    },
    {
      type: "ai",
      msg: "Metformin.",
    },
    {
      type: "me",
      msg: "How often should I take Cetirizine?",
    },
    {
      type: "ai",
      msg: "10mg once daily.",
    }
  ];

  return (
    <div className="space-y-2 overflow-auto">
      <h2 className="text-2xl font-bold">AI Assistance</h2>
      <AppBreadcrumb />
      <div className="flex flex-col justify-end w-full gap-2 p-5 bg-slate-50 shadow rounded-lg h-[70vh] overflow-auto">
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
