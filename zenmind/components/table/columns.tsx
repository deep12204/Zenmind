"use client";

import { ColumnDef } from "@tanstack/react-table";

type Appointment = {
  id: number;
  studentName: string;
  counsellorName: string;
  date: string;
  time: string;
  status: string;
};

export const columns: ColumnDef<Appointment>[] = [
  { accessorKey: "studentName", header: "Student" },
  { accessorKey: "counsellorName", header: "Counsellor" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "time", header: "Time" },
  { accessorKey: "status", header: "Status" },
];
