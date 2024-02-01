"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export type Application = {
  id: string;
  name: string;
  country: string;
  procedureType: string;
  status: string;
};

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <div className="flex flex-col">
          <Link
            href={`/applications/${application.id}`}
            className="underline text-sky-700"
          >
            {application.name}
          </Link>
        </div>
      );
    },
  },

  {
    accessorKey: "country",
    header: "Country",
  },

  {
    accessorKey: "procedureType",
    header: "ProcedureType",
  },

  {
    accessorKey: "status",
    header: "Status",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;
      const router = useRouter();

      const handleEdit = (applicationId: string) => {
        console.log("click");
        console.log(applicationId);
        router.push(`/applications/${applicationId}`);
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
            <DropdownMenuItem onClick={() => handleEdit(application.id)}>
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
