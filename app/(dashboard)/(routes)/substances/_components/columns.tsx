"use client";
import { useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Substance = {
  id: string;
  name: string;
  type: string;
  EVcode: string;
  status: string;
};

export const columns: ColumnDef<Substance>[] = [
  // {
  //   accessorKey: "id",
  //   header: "id",
  // },

  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const substance = row.original;
      return (
        <Link
          href={`/substances/${substance.id}`}
          className="underline text-sky-700"
        >
          {substance.name}
        </Link>
      );
    },
  },
  // {
  //   accessorKey: "type",
  //   header: "Type",
  // },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const substance = row.original;
      const router = useRouter();

      const handleEdit = (substanceId: string) => {
        console.log("click");
        console.log(substanceId);
        router.push(`/substances/${substanceId}`);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEdit(substance.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Copy</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
