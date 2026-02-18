"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Smile, Frown, Coffee, Zap } from "lucide-react";
const playlists = {
  happy: {
    en: [
      "https://www.youtube.com/watch?v=tvTRZJ-4EyI", // Taylor Swift - Shake It Off
      "https://www.youtube.com/watch?v=fHI8X4OXluQ", // The Weeknd - Blinding Lights
      "https://www.youtube.com/watch?v=fRh_vgS2dFE", // Justin Bieber - Sorry
      "https://www.youtube.com/watch?v=OPf0YbXqDm0", // Bruno Mars - Uptown Funk
      "https://www.youtube.com/watch?v=E07s5ZYygMg", // Harry Styles - Watermelon Sugar
      "https://www.youtube.com/watch?v=QcIy9NiNbmo"
    ],
    hi: [
      "https://www.youtube.com/watch?v=Umqb9KENgmk", // Arijit Singh - Tum Hi Ho
  "https://www.youtube.com/watch?v=69CEiHfS_mc", // Yo Yo Honey Singh - Lungi Dance
  "https://www.youtube.com/watch?v=NTHz9ephYTw", // Badshah - Kar Gayi Chull
  "https://www.youtube.com/watch?v=WuMWwPHTSoY", // Dil Dhadakne Do - Zindagi Na Milegi Dobara
  "https://www.youtube.com/watch?v=jCEdTq3j-0U", // Gallan Goodiyan - Dil Dhadakne Do
  "https://www.youtube.com/watch?v=YxWlaYCA8MU", // 
    ],
  },
  sad: {
    en: [
      "https://www.youtube.com/watch?v=8xg3vE8Ie_E", // Taylor Swift - All Too Well
      "https://www.youtube.com/watch?v=XXYlFuWEuKI&rco=1", // The Weeknd - Save Your Tears
      "https://www.youtube.com/watch?v=Fp8msa5uYsc", // Justin Bieber - Ghost
      "https://www.youtube.com/watch?v=ekzHIouo8Q4", // Bruno Mars - When I Was Your Man
      "https://www.youtube.com/watch?v=qN4ooNx77u0", // Harry Styles - Sign of the Times
      "https://www.youtube.com/watch?v=KNtJGQkC-WI&list=RDKNtJGQkC-WI&start_radio=1"
    ],
    hi: [
      "https://www.youtube.com/watch?v=284Ov7ysmfA", // Arijit Singh - Channa Mereya
  "https://www.youtube.com/watch?v=sK7riqg2mr4", // Agar Tum Saath Ho - Tamasha
  "https://www.youtube.com/watch?v=hJBHSmyqv0Y&list=RDhJBHSmyqv0Y&start_radio=1", // Tum Jo Aaye - Once Upon a Time in Mumbaai
  "https://www.youtube.com/watch?v=6w67NOaRe-w&list=RD6w67NOaRe-w&start_radio=1", // Atif Aslam - Jeene Laga Hoon
  "https://www.youtube.com/watch?v=T94PHkuydcw&list=RDT94PHkuydcw&start_radio=1", // Mohit Chauhan - Tum Se Hi
  "https://www.youtube.com/watch?v=jHNNMj5bNQw&list=RDjHNNMj5bNQw&start_radio=1",
    ],
  },
  chill: {
    en: [
      "https://www.youtube.com/watch?v=H58vbez_m4E&list=RDH58vbez_m4E&start_radio=1",
      "https://www.youtube.com/watch?v=ekr2nIex040&list=PLChOO_ZAB22X-YcE6ene9dPzWyfCsDrPT",
      "https://www.youtube.com/watch?v=tCXGJQYZ9JA", // Taylor Swift - Delicate
      
      "https://www.youtube.com/watch?v=tQ0yjYUFKAE", // Justin Bieber - Peaches
      "https://www.youtube.com/watch?v=0KSOMA3QBU0", // Bruno Mars - Versace on the Floor
      "https://www.youtube.com/watch?v=Ho32Oh6b4jc",
      "https://www.youtube.com/watch?v=QU9c0053UAU&list=RDQU9c0053UAU&start_radio=1", 
      "https://www.youtube.com/watch?v=UNo0TG9LwwI&list=RDUNo0TG9LwwI&start_radio=1",// Harry Styles - Fine Line
    ],
    hi: [
      "https://www.youtube.com/watch?v=nJZcbidTutE&list=RDnJZcbidTutE&start_radio=1", // Arijit Singh - Raabta
      "https://www.youtube.com/watch?v=YEf_hnXBbyI&list=RDYEf_hnXBbyI&start_radio=1", // Yo Yo Honey Singh - Angreji Beat
      "https://www.youtube.com/watch?v=Jyst8oIHOAY&list=RDJyst8oIHOAY&start_radio=1", // Badshah - Mercy
      "https://www.youtube.com/watch?v=EiqEA6u9oyc&list=RDnJZcbidTutE&index=2", // Atif Aslam - Tera Hone Laga Hoon
      "https://www.youtube.com/watch?v=hAB2MptEqWQ&list=RDnJZcbidTutE&index=6",
      "https://www.youtube.com/watch?v=yDv0WSgXJVg&list=RDnJZcbidTutE&index=19", // Mohit Chauhan - Hawayein
    ],
  },
  energetic: {
    en: [
      "https://www.youtube.com/watch?v=Nj2U6rhnucI&list=PLiA-8fV0cXuWgVfDBy_ldR_RSxJa0ju-H&index=9", // Taylor Swift - You Belong With Me
      "https://www.youtube.com/watch?v=H5v3kku4y6Q&list=PLiA-8fV0cXuWgVfDBy_ldR_RSxJa0ju-H&index=5",
      "https://www.youtube.com/watch?v=983bBbJx0Mk&list=RD983bBbJx0Mk&start_radio=1",
      "https://www.youtube.com/watch?v=KEI4qSrkPAs", // The Weeknd - Can't Feel My Face
      "https://www.youtube.com/watch?v=DK_0jXPuIr0", // Justin Bieber - What Do You Mean?
      "https://www.youtube.com/watch?v=3tmd-ClpJxA", // Bruno Mars - 24K Magic
      "https://www.youtube.com/watch?v=OMOGaugKpzs", // Harry Styles - Kiwi
    ],
    hi: [
      "https://www.youtube.com/watch?v=vs1IDdap3X4&list=RDvs1IDdap3X4&start_radio=1",
      "https://www.youtube.com/watch?v=II2EO3Nw4m0&list=PLHg6TgBP44G2gWqM-uQhfZlPGOkGSryNV&index=3", // Arijit Singh - Phir Le Aaya Dil
      "https://www.youtube.com/watch?v=RpuhD_xKadk&list=RDEMEG9QDAxNn8ms1y2yZn9zXg&index=2", // Yo Yo Honey Singh - Lungi Dance
      "https://www.youtube.com/watch?v=jCEdTq3j-0U&list=RDEMEG9QDAxNn8ms1y2yZn9zXg&index=7", // Badshah - Kar Gayi Chull
      "https://www.youtube.com/watch?v=ZTmF2v59CtI&list=RDdbdtBQ16CXc&index=10", // Atif Aslam - Dil Diyan Gallan
      "https://www.youtube.com/watch?v=udra3Mfw2oo&list=RDudra3Mfw2oo&start_radio=1", // Mohit Chauhan - Dilli Wali Girlfriend
    ],
  },
};

const moodOptions = [
  { key: "happy", label: "Happy", icon: <Smile className="w-6 h-6 text-yellow-600" /> },
  { key: "sad", label: "Sad", icon: <Frown className="w-6 h-6 text-blue-500" /> },
  { key: "chill", label: "Chill", icon: <Coffee className="w-6 h-6 text-purple-500" /> },
  { key: "energetic", label: "Energetic", icon: <Zap className="w-6 h-6 text-red-500" /> },
];

export default function MusicPage() {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [mood, setMood] = useState<"happy" | "sad" | "chill" | "energetic">("happy");

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-50 to-black p-10 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold mb-8 text-center mt-10"
      >
        🎶 Mood-based Superhit Songs
      </motion.h1>

      {/* Language Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8 flex items-center gap-4"
      >
        <label className="font-semibold">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as "en" | "hi")}
          className="p-2 rounded-lg border shadow"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </motion.div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 text-black">
        {moodOptions.map((m) => (
          <motion.button
            key={m.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMood(m.key as typeof mood)}
            className={`p-4 rounded-xl shadow-lg flex flex-col items-center gap-2 transition ${
              mood === m.key ? "bg-gradient-to-b from-pink-200 to-blue-200 text-white" : "bg-white"
            }`}
          >
            {m.icon}
            <span className="font-medium">{m.label}</span>
          </motion.button>
        ))}
      </div>

      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[70%]"
      >
        {playlists[mood][language].map((url, index) => {
          const videoId = new URL(url).searchParams.get("v") || url.split("/").pop();
          return (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="bg-white p-3 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`${mood} song ${index + 1}`}
                className="rounded-lg"
                allowFullScreen
              ></iframe>
            </motion.div>
          );
        })}
      </motion.div>

      
      <motion.div whileHover={{ scale: 1.05 }} className="mt-12">
        <Link
          href="/quick-relaxation"
          className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-purple-800 text-white font-semibold shadow-lg"
        >
          Back to Relaxation Hub
        </Link>
      </motion.div>
    </div>
  );
}