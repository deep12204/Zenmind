"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Footprints, BookOpen, Droplet, Power, Sunrise } from "lucide-react";

export default function PracticesPage() {
  const practices = [
    { 
      icon: <Footprints className="w-6 h-6 text-green-600" />, 
      text: "Take a mindful walk in nature.", 
      img: "/Blog-4-3-1024x683.jpg" 
    },
    { 
      icon: <BookOpen className="w-6 h-6 text-blue-600" />, 
      text: "Journal your thoughts for 10 mins daily.", 
      img: "/carlos-muza-hpjSkU2UYSU-unsplash.jpg" 
    },
    { 
      icon: <Droplet className="w-6 h-6 text-cyan-600" />, 
      text: "Stay hydrated — drink water every hour.", 
      img: "/360_F_1355307469_1eSD9wsGi63HHhtrsUYByKtEYVGtkxeO.jpg" 
    },
    { 
      icon: <Power className="w-6 h-6 text-red-500" />, 
      text: "Digital detox: Switch off phone for 30 mins.", 
      img: "/why-and-how-to-do-a-digital-detox-4771321-FINAL-d129381fa4524c5db792951fd9b987d2.webp" 
    },
    { 
      icon: <Sunrise className="w-6 h-6 text-yellow-500" />, 
      text: "Practice gratitude before bed.", 
      img: "/Gratitude-Quotes-2-1.jpg.webp" 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-orange-100 to-yellow-200 p-8 flex flex-col items-center">
      
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl text-center mb-8"
      >
        <Image
          src="/Live-longer_001.webp"
          alt="Healthy Lifestyle"
          width={800}
          height={200}
          className="rounded-2xl shadow-lg mb-6 flex items-center"
        />
        <h1 className="text-4xl font-bold text-yellow-800 drop-shadow">
          🚶 Healthy Practices
        </h1>
        <p className="text-gray-700 mt-3">
          Build small habits that nourish your mind 🌿 and body 💪.
        </p>
      </motion.div>

      
      <div className="grid sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {practices.map((practice, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="flex flex-col items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <Image
              src={practice.img}
              alt={practice.text}
              width={400}
              height={200}
              className="w-full h-40 object-cover"
            />
            <div className="flex items-center gap-3 p-4">
              {practice.icon}
              <span className="text-lg font-medium text-gray-800">
                {practice.text}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      
      <motion.blockquote
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: practices.length * 0.2 + 0.4 }}
        className="mt-10 italic text-xl text-gray-700 bg-white/70 px-6 py-4 rounded-2xl shadow max-w-2xl text-center"
      >
        “Your daily habits shape your future. Start small, stay consistent, and
        wellness will follow.” 🌸
      </motion.blockquote>

      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: practices.length * 0.2 + 0.8 }}
      >
        <Link
          href="/quick-relaxation"
          className="mt-10 inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-800 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          Back to Relaxation Hub
        </Link>
      </motion.div>
    </div>
  );
}
