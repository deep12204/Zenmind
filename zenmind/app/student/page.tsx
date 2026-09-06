"use client";

import Link from "next/link";
import QuestionnaireButton from "@/components/Questionnaire";
import ChatButton from "@/components/Chatbutton";
import BookingButton from "@/components/Bookingsession";
import { motion } from "framer-motion";
import TherapyCard from "@/components/Therapycard";
import QuickRelaxCard from "@/components/Quickrelaxation";
export default function BreathingExercisePage() {
  return (
    <div className="min-h-screen flex flex-col items-center mt-15 mb-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-5xl font-medium mb-10 text-center "
      >
        ZenMind Features
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
       
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center bg-gradient-to-b from-cyan-700 to-cyan-100  p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 text-black"
        >
          <img
            src="/assets/icons/questionnaire.webp"
            alt="Questionnaire"
            className="w-full h-40 mb-4 object-center"
          />
          <h2 className="text-xl font-semibold mb-2">Questionnaire</h2>
          <p className="text-gray-900 text-center mb-4">
            Understand your mental health better with a short quiz.
          </p>
          <QuestionnaireButton />
        </motion.div>

     
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center bg-gradient-to-b from-cyan-700 to-cyan-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 text-black"
        >
          <img
            src="/assets/icons/chat.avif"
            alt="Chat"
            className="w-full h-40 mb-4 object-center"
          />
          <h2 className="text-xl font-semibold mb-2">Chat</h2>
          <p className="text-gray-900 text-center mb-4">
            Talk to our AI-powered chatbot for stress relief tips.
          </p>
          <ChatButton />
        </motion.div>
        



        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center bg-gradient-to-b from-cyan-700 to-cyan-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 text-black"
        >
          <img
            src="/assets/icons/booking.avif"
            alt="Booking"
            className="w-full h-40 mb-4 object-center"
          />
          <h2 className="text-xl font-semibold mb-2">Book a Session</h2>
          <p className="text-gray-900 text-center mb-10">
            Schedule a session with a counsellor at your college.
          </p>
          <BookingButton />
        </motion.div>
        
      </div>
      <div className="flex justify-center m-2">
        <QuickRelaxCard />
        <TherapyCard />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-12"
      >
        <Link
          href="/"
          className="px-8 py-3 rounded-full bg-gradient-to-r from-green-600 via-cyan-600 to-blue-800 text-white shadow-lg hover:from-green-500 hover:to-black transition transform hover:scale-105"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
