"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Substance = {
  id: string;
  name: string;
  status: string;
  substanceType: string;
  quantity: string;
  unit: string;
};

export const substanceColumns: ColumnDef<Substance>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const substance = row.original;

      return (
        <Link
          href={`/applications/${substance.id}`}
          className="underline text-sky-700"
        >
          {substance.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
];
