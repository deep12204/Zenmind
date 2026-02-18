"use client";

import { useState } from "react";

type Targets = { calories: string; protein: string; carbs: string; fat: string };
type MealPlan = { breakfast: string; lunch: string; dinner: string; snacks: string };
type ParsedAI = {
  overview: string;
  missingNutrients: string[];
  targets: Targets;
  mealPlan: MealPlan;
  substitutes: string[];
  avoid: string[];
  motivation: string;
};

type FoodLog = {
  age: number;
  weight: number;
  height: number;
  diet_type: string;
  activity_level: string;
  goal: string;
  allergies: string[];
  logged_food: string[];
};

type HealthySub = {
  food: string;
  tier: string;
  reason: string;
  better_options?: string[];
};

type ApiResult = {
  nutrients?: Record<string, number | string>;
  healthy_substitutions?: HealthySub[];
  parsedAI: ParsedAI;
  raw_ai?: string;
};

type ApiResponse = Partial<ApiResult> & {
  ai_recommendation?: string;
  aiRecommendation?: string;
  recommendation?: string;
  message?: string;
  [key: string]: unknown;
};

export default function Food() {
  const [foodLog, setFoodLog] = useState<FoodLog>({
    age: 21,
    weight: 60, 
    height: 165,
    diet_type: "vegetarian", // vegetarian, non-veg, vegan
    activity_level: "moderate",
    goal: "weight loss",
    allergies: [],
    logged_food: []
  });

  const [foodInput, setFoodInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  const ensureMinimum = (items: string[] = [], min = 1): string[] => {
    const cleaned = (items || []).filter(Boolean);
    while (cleaned.length < min) cleaned.push("___");
    return cleaned;
  };

  // --- Parse AI recommendation into sections ---
  const parseAIRecommendation = (text: string): ParsedAI => {
    const parsed: ParsedAI = {
      overview: "",
      missingNutrients: [],
      targets: { calories: "", protein: "", carbs: "", fat: "" },
      mealPlan: { breakfast: "", lunch: "", dinner: "", snacks: "" },
      substitutes: [],
      avoid: [],
      motivation: "",
    };

    if (!text) return parsed;

    // Normalize common issues to make section detection easier
    const normalized = text
      .replace(/\r/g, "")
      .replace(/^\s*-\s*/gm, "\n- ")
      .replace(/•/g, "\n- ")
      .replace(/(Breakfast|Lunch|Dinner|Snacks)\s*[:\-]/gi, "\n$1:")
      .replace(/Substitutes\s*(?=[A-Za-z])/gi, "\nSubstitutes:")
      .replace(/Avoid\s*(?=[A-Za-z])/gi, "\nAvoid:")
      .replace(/Overview\s*:?/gi, "\nOverview:")
      .replace(/Suggested Targets\s*:?/gi, "\nSuggested Targets:")
      .replace(/Missing Nutrients\s*:?/gi, "\nMissing Nutrients:")
      .replace(/Meal Plan\s*:?/gi, "\nMeal Plan:")
      .replace(/Motivation\s*:?/gi, "\nMotivation:")
      .replace(/\n{3,}/g, "\n\n");

    const sectionRegex =
      /(Overview|🍽 Overview|⚠️ Missing Nutrients|Missing Nutrients|🎯 Suggested Targets|Suggested Targets|🥗 Meal Plan|Meal Plan|Substitutes|🚫 Avoid|Avoid|💡 Motivation|Motivation)[\s:]*([\s\S]*?)(?=Overview|🍽 Overview|⚠️ Missing Nutrients|Missing Nutrients|🎯 Suggested Targets|Suggested Targets|🥗 Meal Plan|Meal Plan|Substitutes|🚫 Avoid|Avoid|💡 Motivation|Motivation|$)/gim;

    let match;
    while ((match = sectionRegex.exec(normalized)) !== null) {
      const rawTitle = match[1].toLowerCase();
      const content = match[2].trim();

      if (rawTitle.includes("overview")) {
        parsed.overview = content;
      } else if (rawTitle.includes("missing")) {
        parsed.missingNutrients = content
          .split(/\n+|,/)
          .map((item) => item.replace(/^[-•\s]+/, "").trim())
          .filter(Boolean);
      } else if (rawTitle.includes("targets")) {
        const lines = content.split(/\n+/);
        lines.forEach((line: string) => {
          const lower = line.toLowerCase();
          const value = (line.split(":").pop() || "").split(".")[0]?.trim() || "";
          if (lower.includes("calorie") && !parsed.targets.calories) parsed.targets.calories = value;
          if (lower.includes("protein") && !parsed.targets.protein) parsed.targets.protein = value;
          if (lower.includes("carb") && !parsed.targets.carbs) parsed.targets.carbs = value;
          if (lower.includes("fat") && !parsed.targets.fat) parsed.targets.fat = value;
        });
      } else if (rawTitle.includes("meal")) {
        const lines = content.split(/\n+/);
        lines.forEach((line: string) => {
          const [meal, desc] = line.split(/[:\-]/);
          if (!desc) return;
          const key = meal.trim().toLowerCase();
          if (key.includes("breakfast")) parsed.mealPlan.breakfast = desc.trim();
          if (key.includes("lunch")) parsed.mealPlan.lunch = desc.trim();
          if (key.includes("dinner")) parsed.mealPlan.dinner = desc.trim();
          if (key.includes("snack")) parsed.mealPlan.snacks = desc.trim();
        });
      } else if (rawTitle.includes("substitutes")) {
        parsed.substitutes = content
          .split(/\n+|,/)
          .map((item: string) => item.replace(/^[-•\s]+/, "").trim())
          .filter(Boolean);
      } else if (rawTitle.includes("avoid")) {
        parsed.avoid = content
          .split(/\n+|,/)
          .map((item: string) => item.replace(/^[-•\s]+/, "").trim())
          .filter(Boolean);
      } else if (rawTitle.includes("motivation")) {
        parsed.motivation = content;
      }
    }

    // Heuristics: pick up meals/targets even if sections were not clean
    const mealKeys: (keyof MealPlan)[] = ["breakfast", "lunch", "dinner", "snacks"];
    mealKeys.forEach((meal) => {
      if (!parsed.mealPlan[meal]) {
        const m = normalized.match(new RegExp(`${meal}\\s*[:\\-]?\\s*([^\\n]+)`, "i"));
        if (m) parsed.mealPlan[meal] = m[1].trim();
      }
    });

    if (!parsed.targets.calories) {
      const calMatch = normalized.match(/calories\s*[:\-]?\s*([^\n]+)/i);
      if (calMatch) parsed.targets.calories = calMatch[1].split(".")[0].trim();
    }
    if (!parsed.targets.protein) {
      const m = normalized.match(/protein\s*[:\-]?\s*([^\n]+)/i);
      if (m) parsed.targets.protein = m[1].split(".")[0].trim();
    }
    if (!parsed.targets.carbs) {
      const m = normalized.match(/carbs?\s*[:\-]?\s*([^\n]+)/i);
      if (m) parsed.targets.carbs = m[1].split(".")[0].trim();
    }
    if (!parsed.targets.fat) {
      const m = normalized.match(/fat\s*[:\-]?\s*([^\n]+)/i);
      if (m) parsed.targets.fat = m[1].split(".")[0].trim();  
    }

    if (!parsed.missingNutrients.length) {
      const missMatch = normalized.match(/missing nutrients[\s:]*([^\n]+)/i);
      if (missMatch) {
        parsed.missingNutrients = missMatch[1]
          .split(/,|and|\n|-/i)
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    parsed.overview = parsed.overview || normalized.split("\n")[0]?.trim() || "";
    return parsed;
  };


  // --- Submit handler ---
  const handleSubmit = async () => {
    setLoading(true);

    const processedFoods: string[] = foodInput
      .split(/[,|\n]+/) // comma OR newline separation
      .map((f: string) => f.trim())
      .filter(f => f.length > 0);

    try {
      const res = await fetch("http://localhost:8000/diet/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...foodLog, logged_food: processedFoods }),
      });

      const data = await res.json();

      const safeData: ApiResponse =
        data && typeof data === "object"
          ? (data as ApiResponse)
          : ({ ai_recommendation: String(data ?? "") } as ApiResponse);

      const rawRecommendation =
        safeData.ai_recommendation ||
        safeData.aiRecommendation ||
        safeData.recommendation ||
        safeData.message ||
        "";

      const parsedSections = parseAIRecommendation(rawRecommendation || "");
      const nextResult: ApiResult = {
        parsedAI: parsedSections,
        raw_ai: rawRecommendation,
        nutrients: safeData.nutrients,
        healthy_substitutions: safeData.healthy_substitutions,
      };

      setResult(nextResult);

    } catch (error) {
      console.error(error);
      alert("Something went wrong during API call.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mt-10 mx-auto">
      <h1 className="text-4xl font-bold mb-6">Food & Diet Tracker</h1>

      {/* Food Input */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Foods Consumed:</label>
        <textarea
          className="w-full border p-3 rounded"
          rows={3}
          placeholder="Example: Pizza, Coke, Paneer butter masala, Rice"
          value={foodInput}
          onChange={(e) => setFoodInput(e.target.value)}
        />
      </div>

      {/* Diet Type */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Diet Type:</label>
        <select
          className="w-full border p-2 rounded"
          value={foodLog.diet_type}
          onChange={(e) => setFoodLog({ ...foodLog, diet_type: e.target.value })}
        >
          <option value="vegetarian">Vegetarian</option>
          <option value="non-veg">Non-Veg</option>
          <option value="vegan">Vegan</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-6 py-2 rounded font-semibold mb-6"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Get Recommendations"}
      </button>

      {/* Result */}
      {result && (
        <div className="space-y-10 mt-6">

          {/* Nutrient Summary */}
          {result.nutrients && (
            <div className="bg-[#0E0E0E] border border-[#2A2A2A] shadow-xl rounded-2xl p-6 text-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-[#C9A34A] tracking-wide">
                ★ Nutrient Breakdown
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(result.nutrients).map(([key, val]) => (
                  <div
                    key={key}
                    className="bg-[#1A1A1A] px-4 py-3 rounded-xl border border-[#2F2F2F] shadow-sm flex flex-col items-start"
                  >
                    <span className="text-sm text-gray-400 uppercase tracking-wide">{key}</span>
                    <span className="text-lg font-semibold text-gray-100">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Recommendation */}
          {result && result.parsedAI && (() => {
            const parsedAI = result.parsedAI;
            const missingList = ensureMinimum(parsedAI.missingNutrients, 2);
            const substitutes = ensureMinimum(parsedAI.substitutes, 3);
            const avoid = ensureMinimum(parsedAI.avoid, 2);

            return (
              <div className="mt-10 grid gap-6">
                {/* Overview */}
                <div className="bg-[#0E0E0E] rounded-2xl border border-[#2B2B2B] p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-[#9FBA6A] mb-3">Overview</h3>
                  <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">
                    {parsedAI.overview || "Overview will appear here."}
                  </p>
                </div>

                {/* Missing Nutrients */}
          <div className="bg-[#0E0E0E] rounded-2xl border border-[#2B2B2B] p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-[#9FBA6A] mb-3">⚠️ Missing Nutrients</h3>
            <ul className="text-sm text-gray-300 mt-2 space-y-1 list-disc list-inside">
              {ensureMinimum(missingList, 3).map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

                {/* Suggested Targets */}
                <div className="bg-[#0E0E0E] rounded-2xl border border-[#2B2B2B] p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-[#9FBA6A] mb-3">🎯 Suggested Targets</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-200">
                    <div>Calories: <span className="text-gray-300">{parsedAI.targets.calories || "___"}</span></div>
                    <div>Protein: <span className="text-gray-300">{parsedAI.targets.protein || "___"}</span></div>
                    <div>Carbs: <span className="text-gray-300">{parsedAI.targets.carbs || "___"}</span></div>
                    <div>Fat: <span className="text-gray-300">{parsedAI.targets.fat || "___"}</span></div>
                  </div>
                </div>

                {/* Meal Plan */}
                <div className="bg-[#0E0E0E] rounded-2xl border border-[#2B2B2B] p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-[#9FBA6A] mb-3">🥗 Meal Plan</h3>
                  <ul className="text-sm text-gray-300 mt-2 space-y-2">
                    {[
                      ["Breakfast", parsedAI.mealPlan.breakfast],
                      ["Lunch", parsedAI.mealPlan.lunch],
                      ["Dinner", parsedAI.mealPlan.dinner],
                      ["Snacks", parsedAI.mealPlan.snacks],
                    ].map(([meal, desc]) => (
                      <li key={meal} className="p-3 rounded-xl bg-[#141414] border border-[#2a2a2a]">
                        <span className="font-semibold text-[#C9A34A]">{meal}:</span>{" "}
                        {desc || "___"}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Substitutes */}
                <div className="bg-[#0E0E0E] rounded-2xl border border-[#2B2B2B] p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-[#9FBA6A] mb-3">Substitutes</h3>
                  <ul className="text-sm text-gray-300 mt-2 space-y-1 list-disc list-inside">
                    {ensureMinimum(substitutes, 3).map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Avoid */}
                <div className="bg-[#0E0E0E] rounded-2xl border border-[#2B2B2B] p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-[#9FBA6A] mb-3">🚫 Avoid</h3>
                  <ul className="text-sm text-gray-300 mt-2 space-y-1 list-disc list-inside">
                    {avoid.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Motivation */}
                <div className="bg-[#0E0E0E] rounded-2xl border border-[#2B2B2B] p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-[#9FBA6A] mb-3">💡 Motivation</h3>
                  <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">
                    {parsedAI.motivation || "One-sentence encouragement goes here."}
                  </p>
                </div>
              </div>
            );
          })()}

          {/* Healthy Substitutions */}
          {(() => {
            const healthySubs = result.healthy_substitutions ?? [];
            if (healthySubs.length === 0) return null;
            return (
            <div>
              <h2 className="text-xl font-semibold text-[#C9A34A] mb-4 tracking-wide">
                🔄 Smart Healthy Substitutes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {healthySubs.map((sub: HealthySub, idx: number) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#0D0D0D] border border-[#292929] p-6 shadow-xl hover:shadow-[0_0_20px_rgba(201,163,74,0.18)] transition duration-300"
                  >
                    <h3 className="text-lg font-semibold text-[#E25A5A] mb-2">
                      🚫 Replace: {sub.food}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">Tier: {sub.tier}</p>
                    <p className="text-gray-300 mb-4">{sub.reason}</p>
                    <h4 className="text-[#9FBA6A] font-semibold mb-2">✔ Better Choices</h4>
                    <ul className="space-y-2">
                      {sub.better_options?.map((item: string, i: number) => (
                        <li
                          key={i}
                          className="bg-[#141414] border border-[#2E2E2E] text-gray-200 px-4 py-2 rounded-xl text-sm"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            );
          })()}

        </div>
      )}
    </div>
  );
}
