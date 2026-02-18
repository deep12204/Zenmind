"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export function MoodSlider() {
  const [moodScore, setMoodScore] = useState(50);

  const emotions = [
    { value: 0, label: "😔", description: "Very Low", color: "#f87171" },
    { value: 25, label: "😕", description: "Low", color: "#f77812" },
    { value: 50, label: "😊", description: "Neutral", color: "#facc15" },
    { value: 75, label: "😃", description: "Good", color: "#34d399" },
    { value: 100, label: "🤗", description: "Great", color: "#3b82f6" },
  ];

  const currentEmotion =
    emotions.find((em) => Math.abs(moodScore - em.value) < 15) || emotions[2];

  const getSliderBackground = () => {
    const percent = (moodScore / 100) * 100;
    return `linear-gradient(to right, ${currentEmotion.color} ${percent}%, #e5e7eb ${percent}%)`;
  };

  return (
    <div className="space-y-6 py-4">
      
      <div className="text-center space-y-2 ">
        <div>Whatever you're feeling, we're here to listen</div>
        <div className="text-4xl">{currentEmotion.label}</div>
        <div className="text-sm text-muted-foreground">
          {currentEmotion.description}
        </div>
      </div>

      
      <div className="space-y-4">
        <div className="flex justify-between px-2">
          {emotions.map((em) => (
            <div
              key={em.value}
              className={`cursor-pointer transition-opacity ${
                Math.abs(moodScore - em.value) < 15
                  ? "opacity-100"
                  : "opacity-80"
              }`}
              onClick={() => setMoodScore(em.value)}
            >
              <div className="text-2xl">{em.label}</div>
            </div>
          ))}
        </div>
        <div
  style={{
    boxShadow: `0 0 15px 6px ${currentEmotion.color}45`, 
    borderRadius: "9999px", 
    transition: "box-shadow 0.3s ease", 
  }}
>
  <Slider
    value={[moodScore]}
    onValueChange={(value) => setMoodScore(value[0])}
    min={0}
    max={100}
    step={1}
    style={{ background: getSliderBackground() }}
  />
</div>
        
        <div className="flex justify-center">
          Slide to express how you're feeling today
        </div>
        
      </div>
    </div>
  );
}
