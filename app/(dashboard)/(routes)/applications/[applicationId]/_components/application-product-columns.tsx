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

import { Product2Application, Product } from "@prisma/client";

// data is passed in this columns in the following format:
// product2Application:
// {
//   id: string;
//   productId: string;
//   applicationId: string;
//   createdAt: Date;
//   product: {
//     id: string;
//     name: string;
//     .....
//   };
//   .....
// }

interface ExtendedProduct2Application extends Product2Application {
  product: Product;
}

export const applicationProductColumns: ColumnDef<ExtendedProduct2Application>[] =
  [
    {
      accessorKey: "product.name",
      header: "Name",
    },

    {
      accessorKey: "product.category",
      header: "Category",
    },

    {
      accessorKey: "product.origin",
      header: "Origin",
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;
        const queryClient = useQueryClient();
        const router = useRouter();
        const pathname = usePathname();
        const applicationId = pathname.split("/")[2];

        const handleEdit = (productId: string) => {
          console.log("click");
          console.log(productId);
          router.push(`/products/${productId}`);
        };

        const { mutate: handleDeleteMutation } = useMutation({
          mutationFn: async (productId: string) =>
            await axios.delete(`/api/applications/${applicationId}/products`, {
              data: { productId },
            }),
          onSuccess: () => {
            console.log("record deleted");
            queryClient.invalidateQueries({ queryKey: ["application"] });
            toast.success("Product deleted");
          },
          onError: (err: any) => {
            toast.error("Product not deleted");
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
              <DropdownMenuItem onClick={() => handleEdit(product.product.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Copy</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteMutation(product.product.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
