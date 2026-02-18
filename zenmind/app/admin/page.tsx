"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/StatCard";
import { bookings, Appointment } from "@/app/booking/data";

export default function AdminPage() {
  const [appointments, setAppointments] = useState<{
    documents: Appointment[];
    scheduledCount: number;
    pendingCount: number;
    cancelledCount: number;
  }>({
    documents: [],
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
  });

  
  const recomputeCounts = (docs: Appointment[]) => ({
    documents: docs,
    scheduledCount: docs.filter(d => d.status === "Scheduled").length,
    pendingCount: docs.filter(d => d.status === "Pending").length,
    cancelledCount: docs.filter(d => d.status === "Cancelled").length,
  });

 
  const updateStatus = (id: number, status: Appointment["status"]) => {
    bookings.forEach(b => {
      if (b.id === id) b.status = status; 
    });
    setAppointments(recomputeCounts([...bookings]));
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setAppointments(recomputeCounts([...bookings]));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-7xl flex flex-col space-y-10 p-4">
      {/* Header */}
      <header className="flex items-center justify-between">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-lg font-semibold">Admin Dashboard</p>
      </header>

      
      <section>
        <h1 className="text-2xl font-bold">Welcome 👋</h1>
        <p className="text-gray-600">Manage and update student appointments</p>
      </section>

      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          type="appointments"
          count={appointments.scheduledCount}
          label="Scheduled"
          icon="/assets/icons/download.svg"
        />
        <StatCard
          type="pending"
          count={appointments.pendingCount}
          label="Pending"
          icon="/assets/icons/download (1).svg"
        />
        <StatCard
          type="cancelled"
          count={appointments.cancelledCount}
          label="Cancelled"
          icon="/assets/icons/download (2).svg"
        />
      </section>

      
      <section className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 shadow-sm text-sm min-w-[700px]">
  <thead className="bg-gray-100 text-gray-700">
    <tr>
      <th className="p-3 text-left border-r border-gray-200">Student</th>
      <th className="p-3 text-left border-r border-gray-200">Phone</th>
      <th className="p-3 text-left border-r border-gray-200">Mode</th>
      <th className="p-3 text-left border-r border-gray-200">Counsellor</th>
      <th className="p-3 text-left border-r border-gray-200">Date</th>
      <th className="p-3 text-left border-r border-gray-200">Time</th>
      <th className="p-3 text-left border-r border-gray-200">Status</th>
      <th className="p-3 text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {appointments.documents.length === 0 && (
      <tr>
        <td colSpan={8} className="p-6 text-center text-gray-500 border-t border-gray-200">
          No appointments yet.
        </td>
      </tr>
    )}
    {appointments.documents.map(a => (
      <tr key={a.id} className="hover:bg-gray-50">
        <td className="p-3 border-r border-gray-200">{a.anonymous ? "Anonymous" : a.studentName}</td>
        <td className="p-3 border-r border-gray-200">{a.phoneNumber}</td>
        <td className="p-3 border-r border-gray-200">{a.mode}</td>
        <td className="p-3 border-r border-gray-200">{a.counsellorName}</td>
        <td className="p-3 border-r border-gray-200">{a.date}</td>
        <td className="p-3 border-r border-gray-200">{a.time}</td>
        <td className="p-3 border-r border-gray-200 font-medium">{a.status}</td>
        <td className="p-3 flex flex-wrap gap-2">
          <button
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
            onClick={() => updateStatus(a.id, "Scheduled")}
          >
            Schedule
          </button>
          <button
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs"
            onClick={() => updateStatus(a.id, "Rescheduled")}
          >
            Reschedule
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
            onClick={() => updateStatus(a.id, "Cancelled")}
          >
            Cancel
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </section>
    </div>
  );
}
