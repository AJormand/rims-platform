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

import { Substance } from "@prisma/client";

import { useDeleteSubstance } from "@/app/services/hooks/hooks";

export const columns: ColumnDef<Substance>[] = [
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
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "EVcode",
    header: "EVcode",
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
        router.push(`/substances/${substanceId}`);
      };

      const { mutate: handleDelete } = useDeleteSubstance(substance.id);

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
            <DropdownMenuItem onClick={() => handleDelete()}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
