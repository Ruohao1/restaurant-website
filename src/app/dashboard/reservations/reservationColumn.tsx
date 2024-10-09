"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Reservation>[] = [
  // in French
  {
    accessorKey: "guest_name",
    header: "Nom",
  },
  {
    accessorKey: "guest_email",
    header: "Email",
  },
  {
    accessorKey: "guest_phone",
    header: "Téléphone",
  },
  {
    accessorKey: "guests",
    header: "Nombre de personnes",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Heure",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
];
