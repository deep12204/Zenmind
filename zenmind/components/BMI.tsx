"use client"; // important for Next.js 13+

import WeightBox from "./WeightBox";


import React, { useEffect, useState } from "react";

export default function BMI() {
  const [height, setHeight] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    if (height && weight) {
      const calculatedBmi = Math.trunc((Number(weight) * 10000) / (Number(height) ** 2));
      setBmi(calculatedBmi);
    } else {
      setBmi(null);
    }
  }, [height, weight]);

  return (
    <div className="p-4 max-w-md mx-auto flex flex-col gap-4 bg-[url('/loginBg.jpg')] bg-cover rounded-xl shadow-md relative overflow-hidden text-black">
      <div className="absolute z-0"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Body Mass Index (BMI)</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Height Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              placeholder="Enter height"
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 "
            />
          </div>

          {/* Weight Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium  mb-1">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              placeholder="Enter weight"
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {bmi && (
          <div className="text-center mt-4">
            <h2
              className={`text-3xl font-bold ${
                bmi < 19 || bmi > 29 ? "text-red-500" : "text-green-600"
              }`}
            >
              {bmi}
            </h2>
            <p
              className={`text-md font-semibold ${
                bmi < 19 || bmi > 29 ? "text-red-500" : "text-green-600"
              }`}
            >
              {bmi < 19
                ? "Underweight"
                : bmi > 29
                ? "Overweight"
                : "Normal Weight"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
