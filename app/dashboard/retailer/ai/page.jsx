"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

function Page() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    const userInput = input; // Store the input before clearing it
    setInput("");

    try {
      const res = await fetch(
        "https://advancedpos.duckdns.org/api/chatbot/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: userInput }),
        }
      );

      const data = await res.json();
      
      // Add both user message and bot response at the same time
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: userInput },
        {
          sender: "bot",
          text: data?.data?.solution || "No response from chatbot.",
        },
      ]);
    } catch (error) {
      console.error(error);
      // Add both user message and error response
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: userInput },
        { sender: "bot", text: "Something went wrong. Please try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <main className="flex flex-col h-[calc(100vh-2rem)]">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#199A8E"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
          <h2 className="text-2xl font-bold">MediChat Bot</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Ask your queries about medicines and their uses with our well-trained
          chatbot.
        </p>
      </div>

      <ScrollArea className="flex-1 pr-4 pb-10 mb-4">
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) => (
            <span
              key={i}
              className={`p-4 w-fit max-w-[80%] shadow rounded-t-xl ${
                msg.sender === "user"
                  ? "ml-auto bg-muted text-black rounded-bl-xl"
                  : "bg-primary text-white rounded-br-xl"
              }`}
            >
              <p className="text-xs mb-1 font-light">
                {msg.sender === "user" ? "User (You)" : "Chatbot"}
              </p>
              <p>{msg.text}</p>
            </span>
          ))}
        </div>
      </ScrollArea>

      <div className="flex gap-2 bg-background shadow-lg p-3 rounded-xl w-[77%] fixed bottom-4 right-4">
        <Input
          placeholder="Type your query here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="w-full"
          autoComplete="off"
        />
        <Button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>
    </main>
  );
}

export default Page;