"use client";
import { useRouter, usePathname } from "next/navigation";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

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
import axios from "axios";

import { Product2Application, Product, Country } from "@prisma/client";

export const applicationCountryColumns: ColumnDef<Country>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const country = row.original;
      const queryClient = useQueryClient();
      const router = useRouter();
      const pathname = usePathname();
      const applicationId = pathname.split("/")[2];

      const handleEdit = (countryId: string) => {
        console.log("click");
        console.log(countryId);
        router.push(`/countries/${countryId}`);
      };

      const { mutate: handleDeleteMutation } = useMutation({
        mutationFn: async (countryId: string) =>
          await axios.delete(`/api/applications/${applicationId}/countries`, {
            data: { countryId },
          }),
        onSuccess: () => {
          console.log("record deleted");
          queryClient.invalidateQueries({ queryKey: ["application"] });
          toast.success("Country deleted");
        },
        onError: (err: any) => {
          toast.error("Country not deleted");
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
            <DropdownMenuItem onClick={() => handleEdit(country.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Copy</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteMutation(country.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
