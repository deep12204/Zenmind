"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TherapyCard from "@/components/Therapycard";
import QuickRelaxCard from "@/components/Quickrelaxation";

export default function BreathingExercisePage() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center mt-10">
      
      
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6"
      >
        Content for you
      </motion.h1>

      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        className="mb-8 w-full max-w-5xl"
      >
        <TherapyCard />
        <QuickRelaxCard />
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link
          href="/"
          className="mt-10 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-black text-white shadow hover:scale-105 transition-transform duration-300"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
