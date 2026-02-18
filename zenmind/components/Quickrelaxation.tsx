// app/components/TherapyCard.tsx
"use client";
import Link from "next/link";

export default function QuickRelaxCard() {
  return (
    <div className="flex justify-center mt-10 m-10">
      <Link href="/quick-relaxation">
        <div className="w-2xl h-44 bg-gradient-to-r from-cyan-500 to-black text-white rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer">
          <h2 className="text-xl font-bold">Quick relaxation Hub</h2>
          <p className="text-sm opacity-90">
            Breathing exercise, Music, practices & exercise for mood relaxation.
          </p>
        </div>
      </Link>
    </div>
  );
}
