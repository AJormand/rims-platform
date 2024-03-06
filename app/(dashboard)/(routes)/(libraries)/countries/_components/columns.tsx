"use client";
import { useRouter } from "next/navigation";

import { useDeleteCountry } from "@/app/services/hooks/hooks";

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

import { Country } from "@prisma/client";

export const columns: ColumnDef<Country>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const country = row.original;
      return (
        <Link
          href={`/countries/${country.id}`}
          className="underline text-sky-700"
        >
          {country.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "region",
    header: "Region",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const country = row.original;
      const router = useRouter();

      const handleEdit = (organizationId: string) => {
        router.push(`/countries/${organizationId}`);
      };

      const { mutate: handleDelete } = useDeleteCountry(country.id);

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
            <DropdownMenuItem onClick={() => handleEdit(country.id)}>
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
