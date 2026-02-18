import BreathingExercise from "@/components/BreathingExercise";
import { MoodSlider } from "@/components/Moodslider";
import QuestionnaireButton from "@/components/Questionnaire";
import TherapyCard from "@/components/Therapycard";
import IndividualCard from "@/components/Individual";
import StudentCard from "@/components/Students";
import QuickRelaxCard from "@/components/Quickrelaxation";
import ChatButton from "@/components/Chatbutton";
import BookingButton from "@/components/Bookingsession";
import BMI from "@/components/BMI";
import Dashboard from "@/components/dashboard"
export default function Home() {
  
  return (
    <main className="min-h-screen flex items-center justify-center mt-12 bg-gradient-to-b from-cyan-700 to-cyan-100 ">
      
      <Dashboard />
      
    </main>
  );
}
