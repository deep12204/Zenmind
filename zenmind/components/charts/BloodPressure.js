"use client";

import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { motion } from "framer-motion";

const classifyBP = (systolic, diastolic) => {
  if (systolic >= 140 || diastolic >= 90) return "Hypertension";
  if (systolic >= 120 && systolic <= 129 && diastolic < 80) return "Elevated";
  if (systolic < 120 && diastolic < 80) return "Normal";
  return "Uncategorized";
};

const getColor = (category) => {
  switch (category) {
    case "Normal":
      return "#10b981"; // green
    case "Elevated":
      return "#f59e0b"; // amber
    case "Hypertension":
      return "#ef4444"; // red
    default:
      return "#6b7280"; // gray
  }
};

const BloodPressureTracker = () => {
  const [entries, setEntries] = useState([
    { date: "2025-10-01", systolic: 118, diastolic: 76 },
    { date: "2025-10-05", systolic: 125, diastolic: 78 },
    { date: "2025-10-10", systolic: 142, diastolic: 92 },
  ]);

  const [form, setForm] = useState({
    date: "",
    systolic: "",
    diastolic: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.date || !form.systolic || !form.diastolic) return;
    setEntries([
      ...entries,
      {
        date: form.date,
        systolic: Number(form.systolic),
        diastolic: Number(form.diastolic),
      },
    ]);
    setForm({ date: "", systolic: "", diastolic: "" });
  };

  const chartData = entries.map((entry) => ({
    date: entry.date,
    BP: entry.systolic, // Only Systolic shown
    category: classifyBP(entry.systolic, entry.diastolic),
  }));

  return (
    <motion.div
      className="w-full max-w-md mx-auto p-4 bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
        🩺 BP Tracker
      </h2>

      {/* Form */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="p-1 rounded-md border text-xs dark:bg-gray-700 dark:text-white"
        />
        <input
          type="number"
          name="systolic"
          placeholder="Systolic"
          value={form.systolic}
          onChange={handleChange}
          className="p-1 rounded-md border text-xs dark:bg-gray-700 dark:text-white"
        />
        <input
          type="number"
          name="diastolic"
          placeholder="Diastolic"
          value={form.diastolic}
          onChange={handleChange}
          className="p-1 rounded-md border text-xs dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-2 py-1 rounded-md text-xs hover:bg-indigo-700"
        >
          Add
        </button>
      </div>

      {/* Chart */}
      <div className="h-48 bg-white/80 dark:bg-gray-900/70 rounded-md p-1 shadow-inner">
        <ResponsiveBar
          data={chartData}
          keys={["BP"]}
          indexBy="date"
          margin={{ top: 10, right: 10, bottom: 30, left: 30 }}
          padding={0.2}
          colors={({ data }) => getColor(data.category)}
          borderRadius={2}
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 4,
            tickRotation: -20,
            legend: "",
          }}
          enableGridX={false}
          enableGridY={false}
          labelSkipHeight={999}
          labelTextColor="#fff"
          tooltip={({ data }) => (
            <div className="p-2 text-xs text-gray-800">
              <strong>{data.date}</strong>
              <br />
              {data.category}
              <br />
              Systolic: {data.BP} mmHg
            </div>
          )}
          theme={{
            textColor: "#4B5563",
            fontSize: 10,
            tooltip: {
              container: {
                background: "#f9fafb",
                color: "#111827",
                borderRadius: "6px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                padding: "4px 6px",
              },
            },
          }}
        />
      </div>

      {/* Legend */}
      <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        <p>🟢 Normal: Systolic &lt; 120 and Diastolic &lt; 80</p>
        <p>🟠 Elevated: 120–129 and Diastolic &lt; 80</p>
        <p>🔴 Hypertension: Systolic ≥ 140 or Diastolic ≥ 90</p>
      </div>
    </motion.div>
  );
};

export default BloodPressureTracker;