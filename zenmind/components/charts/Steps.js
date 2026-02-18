"use client";
import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { motion, AnimatePresence } from "framer-motion";
import { Footprints, Activity, Plus } from "lucide-react";
import { useTheme } from "next-themes";

const Steps = ({ data }) => {
  const { theme } = useTheme();
  const [stepsData, setStepsData] = useState([
    {
      id: "Steps",
      data: [
        { x: "Day 1", y: 2000 },
        { x: "Day2", y: 4000 },
        
      ],
    },
  ]);
  const [newSteps, setNewSteps] = useState("");

  // Calculate today’s total steps (last day)
  const todaySteps =
    stepsData[0].data.length > 0
      ? stepsData[0].data[stepsData[0].data.length - 1].y
      : 0;

  // User adds new step entry
  const handleAddSteps = () => {
    if (!newSteps) return;

    const nextDayIndex = stepsData[0].data.length + 1;
    const nextDayLabel = `Day ${nextDayIndex}`;

    const updatedData = [
      {
        id: "Steps",
        data: [
          ...stepsData[0].data,
          { x: nextDayLabel, y: parseInt(newSteps) },
        ],
      },
    ];

    setStepsData(updatedData);
    setNewSteps("");
  };

  // Feedback message
  const feedback =
    todaySteps < 4000
      ? "🏃‍♀️ Keep moving — try hitting 5k+ steps!"
      : todaySteps < 8000
      ? "💪 Great effort! You’re staying active."
      : "🌟 Amazing! You’ve exceeded your goal!";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-5 rounded-2xl shadow-md flex flex-col items-center transition-all duration-500"
    >
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-3">
        <div className="flex items-center gap-2">
          <Footprints className="text-indigo-500" />
          <h2 className="text-lg font-semibold">Steps Tracker</h2>
        </div>
        <div className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400">
          <Activity size={16} />
          <span>{todaySteps} steps today</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-44 w-full">
        <ResponsiveLine
          data={stepsData}
          margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: 0, max: "auto" }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 8,
          }}
          axisLeft={null}
          enableGridX={false}
          enableGridY={false}
          colors={[theme === "dark" ? "#60A5FA" : "#4F46E5"]}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={3}
          pointBorderColor={{ from: "serieColor" }}
          enableArea={true}
          areaOpacity={0.25}
          useMesh={true}
          theme={{
            textColor: theme === "dark" ? "#E5E7EB" : "#374151",
            tooltip: {
              container: {
                background: theme === "dark" ? "#1F2937" : "#FFFFFF",
                color: theme === "dark" ? "#F9FAFB" : "#111827",
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
          className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <input
            type="number"
            value={newSteps}
            onChange={(e) => setNewSteps(e.target.value)}
            placeholder="Enter your steps..."
            className="w-full sm:w-2/3 p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddSteps}
            className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg shadow flex items-center justify-center gap-1 text-white transition w-full sm:w-auto"
          >
            <Plus size={16} /> Add
          </motion.button>
        </motion.div>
      </AnimatePresence>

      {/* Feedback */}
      <motion.div
        className="mt-3 text-sm italic text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {feedback}
      </motion.div>
    </motion.div>
  );
};

export default Steps;
