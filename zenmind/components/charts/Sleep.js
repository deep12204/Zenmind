"use client";
import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Moon, BedDouble } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sleep = ({ data }) => {
  const [sleepData, setSleepData] = useState([
    { day: "Mon", sleep: 7 },
    { day: "Tue", sleep: 6 },
    { day: "Wed", sleep: 8 },
    { day: "Thu", sleep: 5 },
    { day: "Fri", sleep: 7 },
  ]);
  const [newSleep, setNewSleep] = useState("");

  // Handle adding new sleep entry
  const handleAddSleep = () => {
    if (!newSleep) return;
    const newDay = `Day ${sleepData.length + 1}`;
    setSleepData([...sleepData, { day: newDay, sleep: parseFloat(newSleep) }]);
    setNewSleep("");
  };

  const avgSleep =
    sleepData.reduce((acc, cur) => acc + cur.sleep, 0) / sleepData.length;

  return (
    <motion.div
      className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 rounded-2xl shadow-md transition-all duration-500"
      whileHover={{ scale: 1.02 }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <BedDouble className="text-blue-500" />
          <h2 className="font-semibold text-lg ">
            Sleep Tracker
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <Moon className="text-indigo-400" />
          <span className="text-sm ">
            Avg: {avgSleep.toFixed(1)} hrs
          </span>
        </div>
      </div>

      {/* Animated Bar Chart */}
      <div className="h-40 w-full">
        <ResponsiveBar
          data={sleepData}
          keys={["sleep"]}
          indexBy="day"
          margin={{ top: 10, right: 10, bottom: 30, left: 40 }}
          padding={0.4}
          colors={{ scheme: "nivo" }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 8,
          }}
          axisLeft={null}
          enableGridY={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="#333"
          motionConfig="gentle"
          theme={{
            tooltip: {
              container: {
                background: "#222",
                color: "#fff",
                fontSize: 12,
                borderRadius: "6px",
              },
            },
          }}
        />
      </div>

      {/* User Input */}
      <AnimatePresence>
        <motion.div
          className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <input
            type="number"
            value={newSleep}
            onChange={(e) => setNewSleep(e.target.value)}
            placeholder="Enter sleep hours..."
            className="w-full sm:w-2/3 p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddSleep}
            className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg shadow transition w-full sm:w-auto"
          >
            Add
          </motion.button>
        </motion.div>
      </AnimatePresence>

      {/* Feedback Section */}
      <motion.div
        className="mt-3 text-sm italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {avgSleep < 6
          ? "😴 Try to get more sleep for better health!"
          : avgSleep < 8
          ? "🌙 Great! You're maintaining healthy sleep habits."
          : "🛌 Perfect! You're well-rested and balanced."}
      </motion.div>
    </motion.div>
  );
};

export default Sleep;
