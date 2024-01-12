"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import toast from "react-hot-toast";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Product, Product2Substance, Substance } from "@prisma/client";
import { on } from "events";

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

  {
    id: "actions",
    cell: ({ row }) => {
      const substance = row.original;
      const queryClient = useQueryClient();
      const pathname = usePathname();
      const productId = pathname.split("/")[2];

      const { mutate: handleDeleteMutation } = useMutation({
        mutationFn: async (substanceId: string) => {
          try {
            await axios.delete(`/api/products/${productId}/substances`, {
              data: { substanceId },
            });
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
          }
        },
        onSuccess: () => {
          console.log("record deleted");
          queryClient.invalidateQueries({ queryKey: ["product"] });
          toast.success("Substance removed from Product");
        },
        onError: (err: any) => {
          toast.error("Substance not deleted");
        },
      });

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
            <DropdownMenuItem
              onClick={() => handleDeleteMutation(substance.substanceId)}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
