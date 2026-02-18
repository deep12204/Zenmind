"use client";
import Link from "next/link";

export default function QuestionnairePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h2 className="text-2xl font-bold ">
        Choose a Test 🧠
      </h2>

      <div className="space-y-6">
        <Link href="/questionnaire/anxiety">
          <button className="px-6 py-3 w-64 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-black text-white shadow-md hover:scale-105 transform transition m-5 h-20 w-full">
            Anxiety Test (GAD-7)
          </button>
        </Link>

        <Link href="/questionnaire/stress">
          <button className="px-6 py-3 w-64 text-lg font-semibold rounded-lg bg-gradient-to-r from-green-400 to-black text-white shadow-md hover:scale-105 transform transition h-20 w-full m-5">
            Stress Test (PHQ-9 / GHQ)
          </button>
        </Link>
      </div>
    </div>
  );
}
