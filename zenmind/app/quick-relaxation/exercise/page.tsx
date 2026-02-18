"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Dumbbell, Sun, Footprints,PersonStanding  } from "lucide-react";

export default function ExercisePage() {
  const exercises = [
    { icon: <Sun className="w-6 h-6 text-yellow-500" />, text: "🌞 Sun Salutation (5 mins)" },
    { icon: <PersonStanding className="w-6 h-6 text-purple-500" />, text: "🧘 Child’s Pose for relaxation" },
    { icon: <Dumbbell className="w-6 h-6 text-red-500" />, text: "💪 Light stretching for neck & shoulders" },
    { icon: <Footprints className="w-6 h-6 text-green-500" />, text: "🚶 A 10-min mindful walk" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 p-8 flex flex-col items-center mt-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold mb-8  text-center"
      >
        🏃 Quick Exercises & Yoga
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg mb-6 text-center max-w-xl"
      >
        Here are some quick exercises to refresh your mind and body:
      </motion.p>

      <div className="grid gap-4 sm:grid-cols-2 max-w-4xl w-full">
        {exercises.map((ex, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="flex items-center gap-3 p-4 bg-white rounded-xl  hover: shadow-lg transition"
          >
            {ex.icon}
            <span className="text-gray-800 font-medium hover:scale-105">{ex.text}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10"
      >
        <iframe
          width="380"
          height="220"
          src="https://www.youtube.com/embed/VaoV1PrYft4"
          title="Yoga for Stress Relief"
          className="rounded-xl shadow-lg"
          allowFullScreen
        ></iframe>
      </motion.div>

      <Link
        href="/quick-relaxation"
        className="mt-12 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-900 text-white font-semibold shadow-lg hover:scale-105 transition"
      >
        Back to Relaxation Hub
      </Link>
    </div>
  );
}
