"use client";
import { columns } from "./_components/columns";

import { useFetchRegistrations } from "@/app/services/hooks/hooks";

import { DataTable } from "@/components/ui/data-table";

export default function Registrations() {
  const { data, isError, isLoading } = useFetchRegistrations();

  return (
    <div className="container mx-auto py-10">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data && (
        <DataTable
          columns={columns}
          data={data}
          createRoute="/products/create"
        />
      )}
    </div>
  );
}
