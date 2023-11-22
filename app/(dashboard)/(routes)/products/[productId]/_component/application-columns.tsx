"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Applicaiton = {
  id: string;
  name: string;
  status: string;
};

export const applicationColumns: ColumnDef<Applicaiton>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const application = row.original;

      return (
        <Link
          href={`/applications/${application.id}`}
          className="underline text-sky-700"
        >
          {application.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
