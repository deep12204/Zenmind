"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ChatbotPage() {   
  const [messages, setMessages] = useState<{role:string,text:string}[]>([
    {
      role: "ai",
    text: "Hello! I’m ZenMind, your mental health support chatbot. 😊\n\nYou can share how you’re feeling, and I’ll provide some tips and guidance to help you manage stress and stay positive."
  }
    
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  const sendMessage = async () => {
  if (!input.trim()) return;

  const newMessages = [...messages, { role: "user", text: input }];
  setMessages(newMessages);

  try {
    const res = await axios.post("http://localhost:8000/chat", {
      model_name: "llama-3.3-70b-versatile",
      model_provider: "Groq",
      system_prompt: "You are a friendly mental health support chatbot.When giving advice or suggestions, always: -word limit between 250-300 word.-Always use one newline per point (short lines)-Use short, simple sentences.-Include headings if necessary.-give short paragraphs.-Make it actionable and easy to read for someone feeling stressed or anxious.-remove * and replace it to number - If the user mentions serious distress or crisis, suggest contacting a counsellor from college. ",
      messages: newMessages,   
      allow_search: false,
    });

    setMessages([
      ...newMessages,
      { role: "ai", text: res.data.response },
    ]);
    setInput("");
 } catch (err: any) {
  console.error("Chat error:", {
    message: err.message,
    response: err.response?.data,
    status: err.response?.status,
    headers: err.response?.headers,
  });
  setMessages([
    ...newMessages,
    { role: "ai", text: "Error: unable to get response." },
  ]);
}

};


  return (
    <div className="flex flex-col h-screen p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-center mt-10">ZenMind Chatbot</h1>

      <div className="flex-1 overflow-y-auto p-2 border rounded mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 my-1 rounded w-2xl ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto w-[30%] border rounded"
                : "bg-white text-black self-start mr-auto border rounded-2xl"
            }`}
             dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, "<br />") }}
          >
          
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-teal-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
