"use client";
import { useState } from "react";

const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure",
  "Trouble concentrating on things",
  "Moving or speaking slowly, or being fidgety/restless",
  "Thoughts that you would be better off dead, or hurting yourself",
];

const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export default function StressTest() {
  const [answers, setAnswers] = useState<number[]>(Array(phq9Questions.length).fill(-1));
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
    if (score <= 4) return "Minimal Depression";
    if (score <= 9) return "Mild Depression";
    if (score <= 14) return "Moderate Depression";
    if (score <= 19) return "Moderately Severe Depression";
    return "Severe Depression";
  };

  const getRecommendations = (score: number) => {
    if (score <= 4) {
      return [
        "Maintain healthy lifestyle habits.",
        "Stay active and socially connected.",
        "Practice gratitude journaling.",
      ];
    } else if (score <= 9) {
      return [
        "Engage in daily exercise like jogging or yoga.",
        "Practice mindfulness meditation.",
        "Limit negative news or social media consumption.",
      ];
    } else if (score <= 14) {
      return [
        "Try structured relaxation practices.",
        "Seek support from a trusted person.",
        "Consider speaking with a therapist.",
      ];
    } else if (score <= 19) {
      return [
        "It’s strongly advised to consult a mental health professional.",
        "Maintain consistent sleep and meal routines.",
        "Engage in positive coping strategies like art or music.",
      ];
    } else {
      return [
        "Seek immediate professional help.",
        "Reach out to crisis helplines if you feel unsafe.",
        "Surround yourself with supportive people.",
      ];
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen mt-10">
      <h2 className="text-2xl font-bold mb-6">Stress Test (PHQ-9)</h2>

      {phq9Questions.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="font-medium mb-2">{i + 1}. {q}</p>
          <div className="flex space-x-4">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(i, opt.value)}
                className={`px-3 py-2 rounded-lg border ${
                  answers[i] === opt.value ? "bg-gradient-to-r from-green-600 to-green-900 text-white" : "bg-white text-gray-700"
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
        className="mt-6 px-6 py-3 bg-gradient-to-r from-green-600 to-green-900 text-white rounded-lg shadow hover:bg-green-700"
      >
        Submit
      </button>

      {score !== null && (
        <div className="mt-6 p-4 bg-secondary rounded-lg shadow space-y-3">
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
