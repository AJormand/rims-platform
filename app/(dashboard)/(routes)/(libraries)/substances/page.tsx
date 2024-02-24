"use client";

import { columns } from "./_components/columns";
import { DataTable } from "@/components/ui/data-table";

import { useFetchSubstances } from "@/app/services/hooks/hooks";

export default function Substances() {
  const {data, isError, isLoading} = useFetchSubstances();

  return (
    <div className="container mx-auto py-10">
      {isLoading && <div>Loading...</div>}
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
