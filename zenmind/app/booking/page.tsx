"use client";

import { useState } from "react";
import { colleges, bookings, Appointment } from "./data";

export default function BookingPage() {
  const [studentName, setStudentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCounsellor, setSelectedCounsellor] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState<"Call" | "Chat">("Call");
  const [anonymous, setAnonymous] = useState(false);

  const handleBook = () => {
    if (!phoneNumber) {
      alert("Please enter your phone number to book a session.");
      return;
    }

    const newBooking: Appointment = {
      id: bookings.length + 1,
      studentName: anonymous ? undefined : studentName || "Anonymous",
      phoneNumber,
      counsellorName:
        colleges[0].counsellors.find(c => c.id === selectedCounsellor)?.name ||
        "Unknown",
      date,
      time,
      status: "Pending",
      mode,
      anonymous,
    };

    bookings.push(newBooking);
    alert("Session booked successfully!");

    // Reset form
    setStudentName("");
    setPhoneNumber("");
    setDate("");
    setTime("");
    setAnonymous(false);
    setMode("Call");
  };

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mt-15">Book a Session</h1>

      {!anonymous && (
        <input
          type="text"
          placeholder="Your Name (optional if anonymous)"
          value={studentName}
          onChange={e => setStudentName(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      )}

      <input
        type="text"
        placeholder="Your Phone Number (required)"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        className="border px-3 py-2 rounded w-full"
        required
      />

      <select
        value={selectedCounsellor}
        onChange={e => setSelectedCounsellor(Number(e.target.value))}
        className="border px-3 py-2 rounded w-full"
      >
        {colleges[0].counsellors.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />
      <input
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === "Call"}
            onChange={() => setMode("Call")}
          />
          Call
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === "Chat"}
            onChange={() => setMode("Chat")}
          />
          Chat
        </label>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={() => setAnonymous(!anonymous)}
        />
        Stay Anonymous
      </label>

      <button
        onClick={handleBook}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Book Session
      </button>
    </div>
  );
}
