'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Water = ({ initialData = [] }) => {
  const [data, setData] = useState(initialData);
  const [inputValue, setInputValue] = useState('');

  const latestValue = data.length ? parseInt(data[data.length - 1].water) : 0;
  const fillPercent = Math.min((latestValue / 5) * 100, 100);

  // Emotional state
  const emotion =
    fillPercent < 30 ? 'sad' : fillPercent < 70 ? 'neutral' : 'happy';

  const handleAddWater = () => {
    if (!inputValue || isNaN(inputValue)) return;
    const newEntry = { water: inputValue };
    setData((prev) => [...prev, newEntry]);
    setInputValue('');
  };

  // Dynamic feedback text and color
  let feedback = 'Drink More 💧';
  let feedbackColor = 'text-blue-500';
  if (fillPercent >= 30 && fillPercent < 70) {
    feedback = 'Doing Well 💦';
    feedbackColor = 'text-cyan-500';
  } else if (fillPercent >= 70) {
    feedback = 'Hydrated 😄';
    feedbackColor = 'text-green-500';
  }

  // Face expressions
  const faces = {
    sad: '•︵•',
    neutral: '•_•',
    happy: '•ᴗ•',
  };

  // Create random bubbles
  const bubbles = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    size: 6 + Math.random() * 6,
    x: Math.random() * 180 + 10,
    delay: Math.random() * 3,
  }));

  return (
    <div className=" rounded-3xl flex flex-col items-center justify-center  bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
      <div className="p-6  flex flex-col items-center gap-5 transition-all duration-500 hover:scale-105">
        
        {/* Drop Container */}
        <div
          className={`relative w-24 h-32 flex items-center justify-center ${
            emotion === 'happy' ? 'drop-glow' : ''
          }`}
        >
          <svg
            viewBox="0 0 200 300"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md"
          >
            {/* Outer Drop Shape */}
            <motion.path
              d="M100 0 C40 100, 0 150, 0 220 a100 100 0 0 0 200 0 C200 150, 160 100, 100 0 Z"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="5"
              animate={{
                stroke: emotion === 'happy' ? 'blue' : '#60a5fa',
              }}
              transition={{ duration: 0.8 }}
            />

            {/* Clipping Path for Water Animation */}
            <defs>
              <clipPath id="water-clip">
                <path d="M100 0 C40 100, 0 150, 0 220 a100 100 0 0 0 200 0 C200 150, 160 100, 100 0 Z" />
              </clipPath>
            </defs>

            {/* Water Wave (Animated Fill) */}
            <motion.g clipPath="url(#water-clip)">
              <motion.path
                d="M0 260 Q50 240, 100 260 T200 260 V300 H0 Z"
                fill={
                  emotion === 'sad'
                    ? '#60a5fa'
                    : emotion === 'neutral'
                    ? '#38bdf8'
                    : 'blue'
                }
                animate={{
                  translateY: 260 - fillPercent * 2.5,
                  d: [
                    'M0 260 Q50 240, 100 260 T200 260 V300 H0 Z',
                    'M0 250 Q50 230, 100 250 T200 250 V300 H0 Z',
                    'M0 260 Q50 240, 100 260 T200 260 V300 H0 Z',
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: 'easeInOut',
                }}
              />

              {/* Floating Bubbles — appear only when happy */}
              {emotion === 'happy' &&
                bubbles.map((b) => (
                  <motion.circle
                    key={b.id}
                    cx={b.x}
                    cy="280"
                    r={b.size}
                    fill="rgba(50,100,246,0.6)"
                    animate={{
                      cy: [280, 100 + Math.random() * 80],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3 + Math.random() * 2,
                      delay: b.delay,
                      ease: 'easeInOut',
                    }}
                  />
                ))}

              {/* Sparkles (tiny twinkles) when happy */}
              {emotion === 'happy' &&
                Array.from({ length: 4 }).map((_, i) => (
                  <motion.circle
                    key={`spark-${i}`}
                    cx={60 + Math.random() * 80}
                    cy={100 + Math.random() * 100}
                    r="2"
                    fill="white"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.8, 1.4, 0.8],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2 + Math.random() * 1.5,
                      delay: Math.random() * 1.5,
                    }}
                  />
                ))}
            </motion.g>
          </svg>

          {/* Face + Text inside drop */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-800 dark:text-blue-200 font-bold">
            <motion.span
              key={emotion}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl"
            >
              {faces[emotion]}
            </motion.span>

            <AnimatePresence mode="wait">
              <motion.span
                key={latestValue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`text-lg mt-1 ${feedbackColor}`}
              >
                {latestValue}L
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Animated Feedback Text */}
        <motion.p
          key={feedback}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-sm font-semibold ${feedbackColor}`}
        >
          {feedback}
        </motion.p>

        {/* Input Field */}
        <div className="flex flex-col items-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Litres 💧"
            className="p-2 text-center w-24 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-gray-700 text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddWater}
            className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-md hover:bg-blue-600 transition-all"
          >
            Add
          </motion.button>
        </div>
      </div>

      {/* Glow styling */}
      <style jsx>{`
        .drop-glow {
          filter: drop-shadow(0 0 10px rgba(59, 100, 300, 0.8))
                  drop-shadow(0 0 20px rgba(59, 100, 250, 0.6));
        }
      `}</style>
    </div>
  );
};

export default Water;
