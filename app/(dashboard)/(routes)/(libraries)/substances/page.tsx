"use client";

import { columns } from "./_components/columns";
import { DataTable } from "@/components/ui/data-table";

import { useFetchSubstances } from "@/app/services/hooks/hooks";

export default function Substances() {
  const { data, isError, isLoading } = useFetchSubstances();

  if (isLoading)
    return (
      <div className="container mx-auto py-10">
        <DataTable.skeleton />
      </div>
    );

  return (
    <div className="container mx-auto py-10">
      {isError && <div>Error</div>}
      {data && (
        <DataTable
          columns={columns}
          data={data}
          createRoute="/substances/create"
        />
      )}
    </div>
  );
}
