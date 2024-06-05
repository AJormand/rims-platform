"use client";

import * as React from "react";
import Link from "next/link";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "./skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  createRoute?: string | null;
  filter?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  createRoute,
  filter = true,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  console.log("table rerendered");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        {filter && (
          <Input
            placeholder="Filter..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}

        {createRoute && (
          <Link href={createRoute}>
            <Button size="sm" variant="outline">
              Create
            </Button>
          </Link>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

DataTable.skeleton = function skeletonDataTable() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-[1px] h-10 w-80 rounded-md text-sm text-gray-400 p-2">
        Filter...
      </div>
      <div className="border-[1px] rounded-md">
        <div className="border-b-[1px] flex justify-between py-4 pl-2 pr-24">
          <Skeleton className="h-6 w-48 rounded-xl" />
          <Skeleton className="h-6 w-28 rounded-xl" />
          <Skeleton className="h-6 w-24 rounded-xl" />
          <Skeleton className="h-6 w-20 rounded-xl" />
          <div className="font-bold">...</div>
        </div>
        <div className="border-b-[1px] flex justify-between py-5 pl-2 pr-24">
          <Skeleton className="h-6 w-48 rounded-xl" />
          <Skeleton className="h-6 w-28 rounded-xl" />
          <Skeleton className="h-6 w-24 rounded-xl" />
          <Skeleton className="h-6 w-20 rounded-xl" />
          <div className="font-bold">...</div>
        </div>
        <div className="border-b-[1px] flex justify-between py-5 pl-2 pr-24">
          <Skeleton className="h-6 w-48 rounded-xl" />
          <Skeleton className="h-6 w-28 rounded-xl" />
          <Skeleton className="h-6 w-24 rounded-xl" />
          <Skeleton className="h-6 w-20 rounded-xl" />
          <div className="font-bold">...</div>
        </div>
        <div className="border-b-[1px] flex justify-between py-5 pl-2 pr-24">
          <Skeleton className="h-6 w-48 rounded-xl" />
          <Skeleton className="h-6 w-28 rounded-xl" />
          <Skeleton className="h-6 w-24 rounded-xl" />
          <Skeleton className="h-6 w-20 rounded-xl" />
          <div className="font-bold">...</div>
        </div>
        <div className="border-b-[1px] flex justify-between py-5 pl-2 pr-24">
          <Skeleton className="h-6 w-48 rounded-xl" />
          <Skeleton className="h-6 w-28 rounded-xl" />
          <Skeleton className="h-6 w-24 rounded-xl" />
          <Skeleton className="h-6 w-20 rounded-xl" />
          <div className="font-bold">...</div>
        </div>
        <div className="border-b-[1px] flex justify-between py-5 pl-2 pr-24">
          <Skeleton className="h-6 w-48 rounded-xl" />
          <Skeleton className="h-6 w-28 rounded-xl" />
          <Skeleton className="h-6 w-24 rounded-xl" />
          <Skeleton className="h-6 w-20 rounded-xl" />
          <div className="font-bold">...</div>
        </div>
        <div className="border-b-[1px] flex justify-between py-5 pl-2 pr-24">
          <Skeleton className="h-6 w-48 rounded-xl" />
          <Skeleton className="h-6 w-28 rounded-xl" />
          <Skeleton className="h-6 w-24 rounded-xl" />
          <Skeleton className="h-6 w-20 rounded-xl" />
          <div className="font-bold">...</div>
        </div>
      </div>
    </div>
  );
};
