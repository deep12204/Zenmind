"use client";
import { useState } from "react";

const gad7Questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export default function AnxietyTest() {
  const [answers, setAnswers] = useState<number[]>(Array(gad7Questions.length).fill(-1));
  const [score, setScore] = useState<number | null>(null);

  const handleAnswer = (qIndex: number, value: number) => {
    const updated = [...answers];
    updated[qIndex] = value;
    setAnswers(updated);
  };

  const calculateScore = () => {
    const total = answers.reduce((sum, val) => sum + (val >= 0 ? val : 0), 0);
    setScore(total);
  };

  const getSeverity = (score: number) => {
    if (score <= 4) return "Minimal Anxiety";
    if (score <= 9) return "Mild Anxiety";
    if (score <= 14) return "Moderate Anxiety";
    return "Severe Anxiety";
  };

  const getRecommendations = (score: number) => {
    if (score <= 4) {
      return [
        "Maintain your current routine with relaxation practices.",
        "Keep a gratitude journal.",
        "Stay socially connected.",
      ];
    } else if (score <= 9) {
      return [
        "Practice deep breathing or meditation for 10 minutes daily.",
        "Engage in light physical exercise like walking or yoga.",
        "Limit caffeine and screen time before bed.",
      ];
    } else if (score <= 14) {
      return [
        "Try guided meditation or mindfulness apps.",
        "Seek supportive conversations with trusted friends/family.",
        "Consider scheduling a session with a counselor.",
      ];
    } else {
      return [
        "It’s recommended to consult a mental health professional.",
        "Try relaxation practices like progressive muscle relaxation.",
        "Maintain a consistent sleep routine.",
      ];
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen mt-10">
      <h2 className="text-2xl font-bold mb-6">Anxiety Test (GAD-7)</h2>

      {gad7Questions.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="font-medium mb-2">{i + 1}. {q}</p>
          <div className="flex space-x-4">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(i, opt.value)}
                className={`px-3 py-2 rounded-lg border ${
                  answers[i] === opt.value ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white" : "bg-white text-gray-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={calculateScore}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Submit
      </button>

      {score !== null && (
        <div className="mt-6 p-4 bg-secondary rounded-lg shadow space-y-3 ">
          <p className="text-lg font-semibold">Your Score: {score}</p>
          <p className="text-gray-700">Severity: {getSeverity(score)}</p>
          <div>
            <p className="font-medium">Recommendations:</p>
            <ul className="list-disc list-inside text-gray-700">
              {getRecommendations(score).map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
