"use client";
import { useRouter } from "next/navigation";

import { useDeleteControlledVocabulary } from "@/app/services/hooks/hooks";

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

import { ControlledVocabulary } from "@prisma/client";

export const columns: ColumnDef<ControlledVocabulary>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const controlledVocabulary = row.original;
      return (
        <Link
          href={`/controlled-vocabularies/${controlledVocabulary.id}`}
          className="underline text-sky-700"
        >
          {controlledVocabulary.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const controlledVocabulary = row.original;
      const router = useRouter();

      const handleEdit = (controlledVocabularyId: string) => {
        router.push(`/controlled-vocabularies/${controlledVocabularyId}`);
      };

      const { mutate: handleDelete } = useDeleteControlledVocabulary(controlledVocabulary.id);

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
            <DropdownMenuItem onClick={() => handleEdit(controlledVocabulary.id)}>
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
