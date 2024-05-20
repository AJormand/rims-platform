"use client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/columns";

import { useFetchCountries } from "@/app/services/hooks/hooks";

export default function Countries() {
  const { data, isError, isLoading } = useFetchCountries();

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
          createRoute="/countries/create"
        />
      )}
    </div>
  );
}
