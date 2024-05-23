"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: string;
  name: string;
};

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Link
          href={`/products/${product.id}`}
          className="underline text-sky-700"
        >
          {product.name}
        </Link>
      );
    },
  },
];
