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

import { Registration } from "@prisma/client";

export const applicationRegistrationColumns: ColumnDef<Registration>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const registration = row.original;
      const queryClient = useQueryClient();
      const router = useRouter();
      const pathname = usePathname();
      const applicationId = pathname.split("/")[2];

      const handleEdit = (registrationId: string) => {
        console.log("click");
        console.log(registrationId);
        router.push(`/registrations/${registrationId}`);
      };

      const { mutate: handleDeleteMutation } = useMutation({
        mutationFn: async (registrationId: string) =>
          await axios.delete(
            `/api/applications/${applicationId}/registrations`,
            {
              data: { registrationId },
            }
          ),
        onSuccess: () => {
          console.log("record deleted");
          queryClient.invalidateQueries({ queryKey: ["application"] });
          toast.success("Registration deleted");
        },
        onError: (err: any) => {
          toast.error("Registration not deleted");
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
            <DropdownMenuItem onClick={() => handleEdit(registration.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Copy</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteMutation(registration.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
