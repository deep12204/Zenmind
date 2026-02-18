export type Appointment = {
  id: number;
  studentName?: string;          
  counsellorName: string;
  date: string;
  time: string;
  status: "Pending" | "Scheduled" | "Rescheduled" | "Cancelled";
  mode: "Call" | "Chat";
  anonymous: boolean;
  phoneNumber: string;
};


export type College = {
  name: string;
  counsellors: { id: number; name: string }[];
};


export const colleges: College[] = [
  {
    name: "ABC College",
    counsellors: [
      { id: 1, name: "Dr. Meera Iyer" },
      { id: 2, name: "Dr. Rajesh Kumar" },
    ],
  },
];


export let bookings: Appointment[] = [];
