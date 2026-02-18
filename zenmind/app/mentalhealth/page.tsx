"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FeatureCards from "@/components/Web-features";
import { div } from "framer-motion/client";

import BreathingExercise from "@/components/BreathingExercise";
import { MoodSlider } from "@/components/Moodslider";
import QuestionnaireButton from "@/components/Questionnaire";
import TherapyCard from "@/components/Therapycard";
import IndividualCard from "@/components/Individual";
import StudentCard from "@/components/Students";
import QuickRelaxCard from "@/components/Quickrelaxation";
import ChatButton from "@/components/Chatbutton";
import BookingButton from "@/components/Bookingsession";

export default function mentalhealthpage() {
  return (
    <div className="flex flex-col min-h-screen">
          <main className="flex-1 pt-16">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-4xl font-bold text-center mb-8 text-shadow-blue-300">Welcome to ZenMind</h1>
              <p className="text-center text-muted-foreground">
                Your AI-powered mental health companion who is here to listen, understand, and guide you through life's journey
              </p>
              <div className=" flex justify-center p-2">
                <MoodSlider />
              </div>
              <div className="flex justify-center"> 
                <div className="m-2 flex justify-center"><QuestionnaireButton /></div>
               <div className="m-2 flex justify-center"><ChatButton /></div>
               <div className="m-2 flex justify-center"><BookingButton/></div>
              </div>
                
    
              </div>
              <div className="flex justify-center ">
              <BreathingExercise />
              
            </div>
            <div>
                <h4 className="text-2xl font-semibold text-center mt-8 mb-1 text-shadow-blue-300 ">Who we Serve</h4>
                <div className="flex justify-center m-2">
                  <StudentCard />
                  <IndividualCard />
                
                </div>
            
              
            </div>
            
          </main>
          
              
        </div>
  );
}
