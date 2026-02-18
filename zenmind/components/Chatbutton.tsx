"use client";
import Link from "next/link";

export default function ChatButton() {
  return (
    <div className="flex justify-center mt-8">
      <Link href="/chatbot">
        <button className="px-6 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-teal-600 to-blue-700 text-white shadow-lg hover:scale-110 transform transition">
          Talk to chatbot
        </button>
      </Link>
    </div>
  );
}
