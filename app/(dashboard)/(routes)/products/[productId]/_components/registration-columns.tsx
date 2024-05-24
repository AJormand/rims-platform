"use client";

import  Link  from "next/link";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Registration = {
  id: string;
  name: string;
  status: string;
};

export const registrationColumns: ColumnDef<Registration>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const registration = row.original;

      return (
        <Link
          href={`/registrations/${registration.id}`}
          className="underline text-sky-700"
        >
          {registration.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
