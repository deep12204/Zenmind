"use client";
import Link from "next/link";
import BreathingExercise from "@/components/BreathingExercise"; 

export default function BreathingExercisePage() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold  mb-6">Breathing Exercises</h1>

      <div className="mb-8">
        <BreathingExercise /> 
      </div>

      <ul className="space-y-3 text-lg ">
        <li> 4-7-8 Breathing: Inhale for 4s, hold for 7s, exhale for 8s.</li>
        <li>Box Breathing: Inhale 4s, hold 4s, exhale 4s, hold 4s.</li>
        <li>Alternate Nostril Breathing for calming effect.</li>
      </ul>

      <Link
        href="/quick-relaxation"
        className="mt-10 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-black text-white shadow hover:bg-green-700 transition"
      >
        Back to Relaxation Hub
      </Link>
    </div>
  );
}
