"use client";
import { useState, useEffect } from "react";
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
import { fetchColumnNames } from "@/app/services/api-client/api-client";

type ColumnMetadata = {
  key: string;
  header: string;
};

const useColumns = (customObjectName: string) => {
  const [columns, setColumns] = useState<ColumnDef<any>[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const columnNames = await fetchColumnNames(customObjectName);
        const schema: ColumnMetadata[] = columnNames;

        // Start with the "name" column as a link
        const generatedColumns: ColumnDef<any>[] = [
          {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
              const record = row.original;
              return (
                <Link
                  href={`/custom-objects/${customObjectName}/${record.id}`}
                  className="underline text-sky-700"
                >
                  {record.name}
                </Link>
              );
            },
          },
        ];

        // Add dynamically generated columns
        columnNames.forEach((columnName: string) => {
          if (columnName !== "name") {
            // Avoid adding "name" twice
            generatedColumns.push({
              accessorKey: columnName,
              header: columnName.charAt(0).toUpperCase() + columnName.slice(1), // Capitalize header
              cell: ({ row }) => {
                const value = row.original[columnName];
                return <span>{value}</span>;
              },
            });
          }
        });

        // Add actions column
        generatedColumns.push({
          id: "actions",
          cell: ({ row }) => {
            const record = row.original;

            const handleEdit = (customObjectId: string) => {
              router.push(`/custom-objects/${record.name}/${customObjectId}`);
            };

            const handleDelete = () => {
              // Handle delete logic
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
                  <DropdownMenuItem onClick={() => handleEdit(record.id)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Copy</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        });

        setColumns(generatedColumns);
      } catch (error) {
        console.error("Failed to fetch schema:", error);
      }
    };

    fetchSchema();
  }, [customObjectName, router]);

  return columns;
};

export default useColumns;

// export const columns: ColumnDef<Substance>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//     cell: ({ row }) => {
//       const record = row.original;
//       return (
//         <Link
//           href={`/custom-objects/${record.name}/${record.id}`}
//           className="underline text-sky-700"
//         >
//           {record.name}
//         </Link>
//       );
//     },
//   },
//   {
//     accessorKey: "type",
//     header: "Type",
//   },
//   {
//     accessorKey: "EVcode",
//     header: "EVcode",
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const record = row.original;
//       const router = useRouter();

//       const handleEdit = (customObjectId: string) => {
//         router.push(`/custom-objects/${record.name}/${customObjectId}`);
//       };

//       // const { mutate: handleDelete } = useDeleteSubstance(record.id);

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem onClick={() => handleEdit(record.id)}>
//               Edit
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Copy</DropdownMenuItem>
//             <DropdownMenuItem onClick={() => handleDelete()}>
//               Delete
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];
