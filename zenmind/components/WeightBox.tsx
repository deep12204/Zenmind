"use client";
import React from "react";

interface WeightBoxProps {
  unit: string;
  data: number | string;
}

export default function WeightBox({ unit, data }: WeightBoxProps) {
  return (
    <div className="flex flex-col bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm items-center justify-center">
      <h3 className="text-xl font-bold text-gray-700">{data}</h3>
      <p className="text-sm text-gray-500">{unit}</p>
    </div>
  );
}
