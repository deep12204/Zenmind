// app/components/TherapyCard.tsx
"use client";
import Link from "next/link";

export default function IndividualCard() {
  return (
    <div className="flex justify-center mt-10 m-10">
      <Link href="/student">
        <div className="w-50% h-44 bg-gradient-to-r from-cyan-500 to-black text-white rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer">
          <h2 className="text-xl font-bold">Individual</h2>
          <p className="text-sm opacity-90 flex justify-center">
            Personal chatbot,Test,professional Support & others 
          </p>
        </div>
      </Link>
    </div>
  );
}
