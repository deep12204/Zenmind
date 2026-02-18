"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cloud, Dumbbell, Music, Footprints } from "lucide-react";

export default function QuickRelaxationPage() {
  const sections = [
    { title: "Breathing", link: "/quick-relaxation/breathingexercise", color: "from-green-800 to-green-300", icon: <Cloud className="w-8 h-8 mr-2" />, emoji: "💨" },
    { title: "Exercise / Yoga", link: "/quick-relaxation/exercise", color: "from-blue-800 to-blue-300", icon: <Dumbbell className="w-8 h-8 mr-2" />, emoji: "🧘‍♂️" },
    { title: "Music", link: "/quick-relaxation/music", color: "from-purple-800 to-purple-300", icon: <Music className="w-8 h-8 mr-2" />, emoji: "🎵" },
    { title: "Practices", link: "/quick-relaxation/practices", color: "from-yellow-800 to-yellow-300", icon: <Footprints className="w-8 h-8 mr-2" />, emoji: "🌿" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-cyan-500 overflow-hidden">

      
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12 bg-white/30 rounded-full"
          initial={{ y: 0, x: 0, opacity: 0.5 }}
          animate={{ y: [-20, 20], x: [-15, 15], opacity: [0.6, 0.4] }}
          transition={{ repeat: Infinity, duration: 6 + i }}
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
        />
      ))}

      
      <div className="grid sm:grid-cols-2 gap-20 w-full max-w-5xl z-10">
        {sections.map((sec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <Link
              href={sec.link}
              className={`relative flex flex-col items-center justify-center text-center h-[130%] font-semibold text-2xl rounded-3xl shadow-2xl
                bg-gradient-to-br ${sec.color} bg-white/20 backdrop-blur-md
                p-8 hover:scale-105 hover:rotate-2 hover:shadow-3xl transition-all duration-500`}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2 + i }}
                className="text-5xl mb-2"
              >
                {sec.emoji}
              </motion.div>
              <div className="flex items-center">
                {sec.icon}
                {sec.title}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
