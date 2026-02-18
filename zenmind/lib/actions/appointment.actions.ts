export type Appointment = {
  id: number;
  studentName: string;
  counsellorName: string;
  date: string;
  time: string;
  status: string;
};


export async function getRecentAppointmentList() {
  
  const documents = [
    {
      id: 1,
      studentName: "Rahul Sharma",
      counsellorName: "Dr. Meera Iyer",
      date: "2025-09-23",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      studentName: "Anjali Verma",
      counsellorName: "Dr. Rajesh Kumar",
      date: "2025-09-24",
      time: "11:30 AM",
      status: "Scheduled",
    },
    {
      id: 3,
      studentName: "Vikram Singh",
      counsellorName: "Dr. Meera Iyer",
      date: "2025-09-25",
      time: "2:00 PM",
      status: "Cancelled",
    },
  ];

  return {
    documents,
    scheduledCount: documents.filter((d) => d.status === "Scheduled").length,
    pendingCount: documents.filter((d) => d.status === "Pending").length,
    cancelledCount: documents.filter((d) => d.status === "Cancelled").length,
  };
}
