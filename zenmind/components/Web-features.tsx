// app/components/TherapyCard.tsx
"use client";
import { div } from "framer-motion/client";
import Link from "next/link";

export default function FeatureCards() {
  return (
    <div className="">
      <div className="flex justify-center mt-10 m-10">
      <Link href="/therapy">
        <div className="w-2xl h-44 bg-gradient-to-r from-cyan-500 to-black text-white rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer">
          <h2 className="text-xl font-bold">Available 24/7:Can access Anytime</h2>
          <p className="text-sm opacity-90">
            Always here, anytime you need support
          </p>
        </div>
      </Link>
    </div>
    <div className="flex justify-center mt-10 m-10">
      <Link href="/therapy">
        <div className="w-2xl h-44 bg-gradient-to-r from-cyan-500 to-black text-white rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer">
          <h2 className="text-xl font-bold">No Stigma:Completely anonymous</h2>
          <p className="text-sm opacity-90">
            Judgment-free, private, and confidential help
          </p>
        </div>
      </Link>
    </div>
    <div className="flex justify-center mt-10 m-10">
      <Link href="/therapy">
        <div className="w-2xl ml-10 mr-10 h-44 bg-gradient-to-r from-cyan-500 to-black text-white rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer">
          <h2 className="text-xl font-bold">Safe</h2>
          <p className="text-sm opacity-90">
            Your conversations are protected with care n concern
          </p>
        </div>
      </Link>
    </div>
    </div>
  );
}
