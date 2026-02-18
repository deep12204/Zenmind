export async function getDietRecommendation(foodLog) {
  try {
    const res = await fetch("http://localhost:8000/diet/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(foodLog),
    });

    if (!res.ok) throw new Error("API request failed");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
