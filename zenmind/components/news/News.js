"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { AiOutlineRight, AiOutlineLeft, AiOutlineSearch } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

export default function News({
  initialQuery = "healthy diet food",
  autoAdvanceMs = 6000,
}) {
  const [query, setQuery] = useState(initialQuery);
  const [input, setInput] = useState(initialQuery);
  const [news, setNews] = useState([]);
  const [slide, setSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const timerRef = useRef(null);

  // ✅ Fetch News using GNews API
  const fetchNews = useCallback(async (q) => {
    setLoading(true);
    setError(null);
    setNews([]);
    setSlide(0);

    try {
      const token = process.env.NEXT_PUBLIC_GNEWS_API_KEY; // ✅ use GNews API key
      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        q
      )}&lang=en&country=in&max=5&apikey=${token}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);

      const data = await res.json();
      if (!data?.articles?.length) throw new Error("No news found");

      setNews(data.articles);
    } catch (err) {
      console.error("News fetch error:", err);
      setError("Could not fetch live news. Showing demo results.");
      setNews([
        {
          title: `${q} — Healthy Living`,
          description: "Simple habits for better energy and focus.",
          url: "#",
          image: "",
          publishedAt: new Date().toISOString(),
        },
        {
          title: `${q} — Mindful Practice`,
          description: "How 5 minutes of mindfulness can help reduce stress.",
          url: "#",
          image: "",
          publishedAt: new Date().toISOString(),
        },
        {
          title: `${q} — Stay Active`,
          description: "Movement tips to stay fit throughout the day.",
          url: "#",
          image: "",
          publishedAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Auto Slide Setup
  const startTimer = useCallback(() => {
    stopTimer();
    if (news.length <= 1) return;
    timerRef.current = setInterval(() => {
      setSlide((prev) => (prev + 1) % news.length);
    }, autoAdvanceMs);
  }, [news, autoAdvanceMs]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  // ✅ Fetch when query changes
  useEffect(() => {
    fetchNews(query);
  }, [query, fetchNews]);

  // ✅ Restart timer when news changes
  useEffect(() => {
    if (news.length) startTimer();
    return () => stopTimer();
  }, [news, startTimer, stopTimer]);

  // ✅ Manual Controls
  const handleNext = () => {
    setSlide((s) => (s + 1) % news.length);
    startTimer();
  };
  const handleBack = () => {
    setSlide((s) => (s === 0 ? news.length - 1 : s - 1));
    startTimer();
  };

  // ✅ Search
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) setQuery(input.trim());
  };

  // ✅ Hover pause
  const handleMouseEnter = stopTimer;
  const handleMouseLeave = startTimer;

  const current = news[slide];

  // ✅ Loading State
  if (loading) {
    return (
      <div className="h-52 flex items-center justify-center animate-pulse bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading news...
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 rounded-2xl shadow-md overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">📰</span>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Health & Wellness
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 shadow-sm">
            <AiOutlineSearch className="text-gray-400" />
            <input
              className="ml-2 w-44 md:w-64 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
              placeholder="Search topics (e.g. Yoga)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="ml-2 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm shadow"
          >
            Search
          </button>
        </form>
      </div>

      {/* Arrows */}
      <button
        onClick={handleBack}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow hover:scale-110 transition z-10"
      >
        <AiOutlineLeft />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow hover:scale-110 transition z-10"
      >
        <AiOutlineRight />
      </button>

      {/* Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current?.url || slide}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="p-2"
        >
          <a href={current.url || "#"} target="_blank" rel="noreferrer">
            <div className="grid md:grid-cols-3 gap-4 items-center">
              {current.image ? (
                <div className="col-span-1">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="rounded-lg object-cover w-full h-36 md:h-28"
                  />
                </div>
              ) : (
                <div className="h-36 md:h-28 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}

              <div className="md:col-span-2">
                <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {current.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">
                  {current.description || "Click to read more."}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  {current.publishedAt && (
                    <span>
                      {new Date(current.publishedAt).toLocaleDateString()}
                    </span>
                  )}
                  <span className="ml-auto text-indigo-600 dark:text-indigo-400 underline">
                    Read full article →
                  </span>
                </div>
              </div>
            </div>
          </a>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {news.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setSlide(i);
              startTimer();
            }}
            className={`h-2 w-2 rounded-full transition-all ${
              i === slide
                ? "bg-indigo-600 scale-125"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>

      {error && (
        <div className="mt-3 text-sm text-yellow-700 dark:text-yellow-300">
          {error}
        </div>
      )}
    </div>
  );
}
