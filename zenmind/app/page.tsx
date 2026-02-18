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
    
      <div className="flex flex-col min-h-screen">
                <main className="flex-1 pt-16">
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-center mb-8 text-shadow-blue-300">Welcome to ZenMind</h1>
                    <p className="max-w-2xl mx-auto mt-6 text-center text-lg leading-relaxed text-muted-foreground px-4">
                    <span className="font-semibold text-primary">ZenMind</span> is a wellness platform designed to bring balance to your body and mind. 
                    With simple tracking tools and mindful guidance, it helps you move better, feel stronger, 
                    and live healthier — one peaceful step at a time.
                     </p>

                    <div className=" flex justify-center p-2">
                      <MoodSlider />
                    </div>
                    </div>
                  <Dashboard />
                </main>
                
                    
              </div>
   
      
    
  );
}
