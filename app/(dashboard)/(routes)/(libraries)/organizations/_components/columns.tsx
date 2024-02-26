"use client";
import { useRouter } from "next/navigation";

import { useDeleteOrganization } from "@/app/services/hooks/hooks";

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

import { Organization } from "@prisma/client";

export const columns: ColumnDef<Organization>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const organization = row.original;
      return (
        <Link
          href={`/organizations/${organization.id}`}
          className="underline text-sky-700"
        >
          {organization.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const organization = row.original;
      const router = useRouter();

      const handleEdit = (organizationId: string) => {
        router.push(`/organizations/${organizationId}`);
      };

      const { mutate: handleDelete } = useDeleteOrganization(organization.id);

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
            <DropdownMenuItem onClick={() => handleEdit(organization.id)}>
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
