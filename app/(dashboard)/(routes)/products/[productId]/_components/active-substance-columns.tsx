"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Product, Product2Substance, Substance } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface ActiveSubstance extends Product2Substance {
  substance: Substance;
}

export const activeSubstanceColumns: ColumnDef<ActiveSubstance>[] = [
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
          {substance.substance.name}
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
