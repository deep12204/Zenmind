"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy-load Nivo charts
const BMI = dynamic(() => import("../components/BMI"), { ssr: false });
const Water = dynamic(() => import("../components/charts/Water"), { ssr: false });
const Steps = dynamic(() => import("../components/charts/Steps"), { ssr: false });
const Sleep = dynamic(() => import("../components/charts/Sleep"), { ssr: false });
const BloodPressure = dynamic(() => import("../components/charts/BloodPressure"), { ssr: false });
const News = dynamic(() => import("../components/news/News"), { ssr: false });

const Dashboard = () => {
  // 🧠 Mock session (you can replace with real user later)
  const session = {
    user: {
      name: "Prachi",
      email: "prachi@example.com",
    },
  };

  // 🧩 Mock health data (replace with API or DB later)
  const [userData, setUserData] = useState({
    water: [{ water: 1.2 }, { water: 1.8 }, { water: 2.0 }],
    steps: [{ steps: 4000 }, { steps: 5200 }, { steps: 6100 }],
    sleep: [{ hours: 6.5 }, { hours: 7 }, { hours: 8 }],
    bp: [
      { country: "AD", BP: 118 },
      { country: "AE", BP: 162 },
      { country: "AF", BP: 172 },
      { country: "AG", BP: 190 },
      { country: "AI", BP: 65 },
    ],
  });

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-screen mt-12">
      {/* Water Tracker */}
      <div className=" p-4 rounded-xl shadow-md">
        <h2 className="text-lg text-black  font-semibold mb-2">Water Intake</h2>
        <Water data={userData} showValue={true} />
      </div>

      {/* Steps Tracker */}
      <div className=" p-4 rounded-xl shadow-md">
        <h2 className="text-lg text-black  font-semibold mb-2">Steps</h2>
        <Steps data={userData} />
      </div>

      {/* Sleep Tracker */}
      <div className=" p-4 rounded-xl shadow-md">
        <h2 className="text-lg text-black  font-semibold mb-2">Sleep</h2>
        <Sleep data={userData} />
      </div>

      {/* Blood Pressure */}
      <div className=" p-4 rounded-xl shadow-md">
        <h2 className="text-lg text-black  font-semibold mb-2">Blood Pressure</h2>
        <BloodPressure />
      </div>
      <div className=" p-4 rounded-xl shadow-md">
        <h2 className="text-lg text-black font-semibold mb-2">Body Mass Index</h2>
        <BMI/>
      </div>

      {/* Health News */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3  p-4 rounded-xl shadow-md">
        <h2 className="text-xl text-black  font-semibold mb-2">Latest Health News</h2>
        <News search="health wellness fitness" />
      </div>
    </div>
  );
};

export default Dashboard;
